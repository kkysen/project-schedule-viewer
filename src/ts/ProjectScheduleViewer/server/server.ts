import {Request, Response} from "express";
import {addExtensions} from "../../util/extensions/allExtensions";
import {getRenderedApp} from "./ssr/ssr";
import e = require("express");

addExtensions();

const app = e();

app.get("/", async (request: Request, response: Response) => {
    const html = await getRenderedApp();
    response.send(html);
});