import {app} from "./appRenderer";
import {login} from "./loginRenderer";
import {SsrRenderer} from "./SsrRenderer";

export const renderers = SsrRenderer.group();

renderers.add(app, login);