"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestClient = void 0;
const createClient_js_1 = require("./createClient.js");
const test_js_1 = require("./decorators/test.js");
function createTestClient({ account, chain, key = 'test', name = 'Test Client', mode, pollingInterval, transport, }) {
    return (0, createClient_js_1.createClient)({
        account,
        chain,
        key,
        name,
        pollingInterval,
        transport,
        type: 'testClient',
    })
        .extend(() => ({ mode }))
        .extend((0, test_js_1.testActions)({ mode }));
}
exports.createTestClient = createTestClient;
//# sourceMappingURL=createTestClient.js.map