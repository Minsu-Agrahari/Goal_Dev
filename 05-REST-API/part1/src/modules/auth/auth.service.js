import ApiError from "../../common/utils/api-error.js";
import {
    hashToken,
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    generateResetToken
} from "../../common/utils/jwt.utils.js"
import User from "./auth.model.js";

const register = async ({name, email, password, role}) => {

    const existing = await User.findOne({email});
    if (existing){
        throw ApiError.conflict("Email already exisits");
    }

    const {rawToken, hashedToken} = generateResetToken();

    const user = await User.create ({
        name, 
        email,
        password,
        role,
        verificationToken: hashedToken
    });

    // TODO: Send an email to user with token: rawToken

    const userObj = user.toObject();
    delete userObj.password
    delete userObj.verificationToken

    return userObj;
}

const login = async ({email, password}) => {
    // take email and find user in DB
    // then check, if password is correct
    // check, if verified or not

    const user = await User.findOne({email}).select("+password");

    if (!user) throw ApiError.unauthorized("Invalid Email or password");

    // Somehow I will check password

    if (!user.isVerified) {
        throw ApiError.forbidden("Please verify your email before log in... ");
    }

    const accessToken = generateAccessToken ({
        id: user._id,
        role: user.role
    });
    const refreshToken = generateAccessToken ({
        id: user._id,
    })

    user.refreshtoken = hashToken(refreshToken);
    await user.save({validateBeforeSave: false});

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return {
        user: userObj,
        accessToken,
        refreshToken
    };
}

const logout = async (userId) => {
    const user = await User.findById (userId);

    if (!user) throw ApiError.unauthorized("User not found");

    user.refreshtoken = undefined;
    await user.save ({validationBeforeSave: false});
}

const refresh = async (token) => {

    if (!token) throw ApiError.unauthorized("Refresh token missing");
    const decode = verifyRefreshToken(token);

    const user = await User.findById(decode.id).select("+refreshToken");
    if (!user) throw ApiError.unauthorized("User not found");

    if (user.refreshtoken !== hashToken(token)) {
        throw ApiError.unauthorized("Invalid refresh token");
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });

    return { accessToken };
}

const forgotPassword = async (email) => {
    const user = await User.findOne({email});

    if (!user) throw ApiError.notfound("No account with that email");

    const { rawToken, hashedToken } = generateResetToken();
    user.resetPasswordtoken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    // TODO: mail bhejna hai (abhi nahi aata hai)
}

export {
    register,
    login,
    logout,
    refresh,
    forgotPassword
}
