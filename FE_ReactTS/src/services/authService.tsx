import type { LoginRequest } from "@/types/requests/loginRequest";
import axios from '@/configs/axios';

const loginAsync = async (requestData: LoginRequest) => {
    const response = await axios.post('Auth/Login', requestData);
    return response.data;
}

const authService = {
    loginAsync,
}

export default authService;