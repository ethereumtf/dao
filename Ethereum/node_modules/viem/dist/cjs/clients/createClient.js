"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const accounts_js_1 = require("../utils/accounts.js");
const uid_js_1 = require("../utils/uid.js");
function createClient({ account, batch, chain, key = 'base', name = 'Base Client', pollingInterval = 4000, transport, type = 'base', }) {
    const { config, request, value } = transport({ chain, pollingInterval });
    const client = {
        account: (account
            ? (0, accounts_js_1.parseAccount)(account)
            : undefined),
        batch,
        chain: chain,
        key,
        name,
        pollingInterval,
        request,
        transport: { ...config, ...value },
        type,
        uid: (0, uid_js_1.uid)(),
    };
    function extend(client_) {
        return (fn) => {
            const extended = fn(client_);
            for (const key in client)
                delete extended[key];
            const nextClient = { ...client_, ...extended };
            return Object.assign(nextClient, { extend: extend(nextClient) });
        };
    }
    return Object.assign(client, { extend: extend(client) });
}
exports.createClient = createClient;
//# sourceMappingURL=createClient.js.map