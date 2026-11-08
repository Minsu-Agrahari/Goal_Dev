import JWT from 'jsonwebtoken';
import 'dotenv/config';
export function createUserToken(payload) {
    const token = JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
}
export function verifyUserToken(token) {
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        return payload;
    }
    catch (error) {
        return null;
    }
}
