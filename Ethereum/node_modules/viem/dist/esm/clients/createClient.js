import { parseAccount } from '../utils/accounts.js';
import { uid } from '../utils/uid.js';
/**
 * @description Creates a base client with the given transport.
 */
export function createClient({ account, batch, chain, key = 'base', name = 'Base Client', pollingInterval = 4000, transport, type = 'base', }) {
    const { config, request, value } = transport({ chain, pollingInterval });
    const client = {
        account: (account
            ? parseAccount(account)
            : undefined),
        batch,
        chain: chain,
        key,
        name,
        pollingInterval,
        request,
        transport: { ...config, ...value },
        type,
        uid: uid(),
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
//# sourceMappingURL=createClient.js.map