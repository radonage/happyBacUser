import { register } from "../../../../api/auth.api";

export const registerUser = async (payload) => {
    return await register(payload);
};