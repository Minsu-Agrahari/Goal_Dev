import crypto from "crypto";
import jwt from "jsonwebtoken";

// Generate Reset Token
const generateResetToken = () => {
    
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
                        .createHash("sha256")
                        .update(rawToken)
                        .digest("hex")
        
    return {rawToken, hashedToken};
};

// Generate Access Token
const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    });
};
// Verify Access Token
const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

// Generate Refresh Token
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    });
};
// Verify Refresh Token
const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

export {
    generateResetToken,
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken
};
