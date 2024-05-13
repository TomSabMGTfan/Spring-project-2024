import { apiClient } from "./apis";

export const UserModel = {
    searchUsername: async (search) => {
        try {
            const response = await apiClient.get("/users", {
                params: {
                    search
                }
            });

            return response;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    }
}