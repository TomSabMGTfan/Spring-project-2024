import { ExtractReqInfo, LogError } from "./Logger.mjs";

export const LogRouteError = (req, res, error) => {

    console.log(error);

    let startTime = Date.now();

    res.on("finish", () => {
        let responseTimeMS = Date.now() - startTime;

        const request = ExtractReqInfo(req);

        LogError("Request finished with an error.", {
            request,
            responseTimeMS,
            error: error.stack
        });
    });
}