import crypto from 'crypto';
export function signPayload(payload, secret) {
    const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const h = crypto.createHmac('sha256', secret).update(data).digest('base64url');
    return `${data}.${h}`;
}
export function verifySignedPayload(token, secret) {
    const [data, sig] = token.split('.');
    if (!data || !sig)
        return null;
    const expected = crypto.createHmac('sha256', secret).update(data).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)))
        return null;
    try {
        return JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    }
    catch {
        return null;
    }
}
