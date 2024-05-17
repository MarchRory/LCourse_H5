import { Router } from "vue-router";
import createBaseRouterGuide from "./base";
import createPageLogRouterGuide from "./log";

function mountRouterGuide(router: Router) {
    createBaseRouterGuide(router)
    createPageLogRouterGuide(router)
}

export default mountRouterGuide