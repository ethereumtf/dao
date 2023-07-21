"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWalletClient = void 0;
const createClient_js_1 = require("./createClient.js");
const wallet_js_1 = require("./decorators/wallet.js");
function createWalletClient({ account, chain, transport, key = 'wallet', name = 'Wallet Client', pollingInterval, }) {
    return (0, createClient_js_1.createClient)({
        account,
        chain,
        key,
        name,
        pollingInterval,
        transport: (opts) => transport({ ...opts, retryCount: 0 }),
        type: 'walletClient',
    }).extend(wallet_js_1.walletActions);
}
exports.createWalletClient = createWalletClient;
//# sourceMappingURL=createWalletClient.js.map