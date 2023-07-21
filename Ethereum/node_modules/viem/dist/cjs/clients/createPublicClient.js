"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublicClient = void 0;
const createClient_js_1 = require("./createClient.js");
const public_js_1 = require("./decorators/public.js");
function createPublicClient({ batch, chain, key = 'public', name = 'Public Client', transport, pollingInterval, }) {
    return (0, createClient_js_1.createClient)({
        batch,
        chain,
        key,
        name,
        pollingInterval,
        transport,
        type: 'publicClient',
    }).extend(public_js_1.publicActions);
}
exports.createPublicClient = createPublicClient;
//# sourceMappingURL=createPublicClient.js.map