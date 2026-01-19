import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import jwkToPem from "jwk-to-pem";

let keys: any[] | null = null;

async function getKeys() {
    if (keys) return keys;
    const region = process.env.AWS_REGION;
    const userPoolId = process.env.COGNITO_USER_POOL_ID;

    if (!region || !userPoolId) {
        console.warn("Cognito env vars missing");
        return [];
    }

    try {
        const res = await fetch(
            `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`
        );
        const data = await res.json() as { keys: any[] };
        keys = data.keys;
        return keys;
    } catch (error) {
        console.error("Failed to fetch JWKS:", error);
        return [];
    }
}

export async function verifyToken(token: string) {
    const decoded: any = jwt.decode(token, { complete: true });
    if (!decoded || !decoded.header || !decoded.header.kid) {
        throw new Error("Invalid token");
    }

    const jwks = await getKeys();
    const jwk = jwks.find(k => k.kid === decoded.header.kid);

    if (!jwk) {
        throw new Error("Invalid token signing key");
    }

    const pem = jwkToPem(jwk);

    return jwt.verify(token, pem, { algorithms: ["RS256"] });
}
