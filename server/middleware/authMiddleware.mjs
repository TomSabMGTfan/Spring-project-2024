import jwt from 'jsonwebtoken';
import 'dotenv/config';

import userModel from '../models/userModel.mjs';

// AuthMiddleware itself is not a middleware, it RETURNS a middleware function so in order to use it you need to call it
export default function AuthMiddleware(role='user'){
    // Middlware that check if user is authenticated and checks his role based on the AuthMiddleware role argument
    return async function(req, res, next){
        try{
            // Checking if token is provided in the Authorization header
            const token = req.get("Authorization").split(' ')[1];
            if(!token){
                return res.status(401).json("Unauthorized access");
            } 

            // Checking if the token is valid
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            if(!payload){
                return res.status(401).json("Unauthorized access");
            }
            
            // Checking if user is valid
            const user = await userModel.getUserById(payload.user.id);
            if(!user){
                throw Error("User no longer exists");
            }

            // Checking if user is Authorized
            // If role is user than there is no need to check for that because all users have role atleast 'user'
            // Check for admin role is necessary because not all users may have it
            if(role === "admin" && user.role !== "admin"){
                return res.status(401).json("Unauthorized access");
            }

            // Providing user id for the next in the pipeline
            req.user = user;
            next();
        }
        catch(err){
            return res.status(401).json("Unauthorized access");
        }
    }
}