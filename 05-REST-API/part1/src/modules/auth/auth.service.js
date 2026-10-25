import ApiError from "../../common/utils/api-error.js";
import {
    hashToken
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken
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

const refresh = async (token) => {

    // if (!token) throw ApiError.unauthorized("Refresh token missing");
    
    // const decoded = verifyRefreshToken(token);

    // const user = await User.findById(decoded.id).select("+refreshToken");
    // if (!user) throw ApiError.unauthorized("User not found");

    // if (user.refreshtoken)
}

export {register}
