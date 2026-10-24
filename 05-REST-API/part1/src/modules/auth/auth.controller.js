import * as authService from "./auth.service.js";
import ApiResonse from "../../common/utils/api-response.js"

const register = async (req, res) => {

    const user = await authService.register (req.body);
    ApiResonse.create(res, "Registration sucess", user);

}

export {register};
