import { ExtractReqInfo, LogInfo } from "./Logger.mjs";

export const LogRouteInfo = (req, res) => {

    let startTime = Date.now();

    res.on("finish", () => {
        let responseTimeMS = Date.now() - startTime;

        const request = ExtractReqInfo(req);

        LogInfo("Request finished.", {
            request,
            responseTimeMS
        });
    });
}