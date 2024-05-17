import Winston from "winston";
import uniqid from 'uniqid';

const logger = new (Winston.Logger)({
    level: "info",
    transports: [
        new (Winston.transports.Console)({
            format: Winston.format.combine(
                Winston.format.colorize(),
                Winston.format.simple()
            )
        }),
    ],
});

export const LogInfo = (message, meta) => {
    logger.log("info", `${message} at ${(new Date()).toUTCString()}`, meta);
}

export const LogError = (message, meta) => {
    logger.log("error", `${message} at ${(new Date()).toUTCString()}`, meta);
}

export const LoggingMiddleware = (req, res, next) => {

    let startTime = Date.now();

    res.on("finish", () => {
        let responseTimeMS = Date.now() - startTime;

        if (req.body.password) {
            req.body.password = "REMOVED_FOR_SECURITY_REASONS";
        }

        // TODO make error logging middleware 

        const request = {
            authenticated: req.user ? {
                user: req.user,
                token: req.get("Authorization").split(".")[0] + "." + req.get("Authorization").split(".")[1] + "._REMOVED_FOR_SECURITY_REASONS"
            } : false,
            URL: req.originalUrl,
            body: req.body,
            params: req.params,
            query: req.query
        };

        LogInfo(`${uniqid()}: Request finished`, {
            request,
            responseTimeMS
        });
    });

    next();
}