import type { LoginRequest } from "@/types/requests/loginRequest";
import axios from '@/configs/axios';
import type { RegisterRequest } from "@/types/requests/registerRequest";

const loginAsync = async (requestData: LoginRequest) => {
    const response = await axios.post('Auth/Login', requestData);
    return response.data;
}

const getCurrentUserAsync = async (email: string | null) => {
    const response = await axios.get(`Auth/Me?email=${email}`);
    return response.data;
}

const registerAsync = async (requestData: RegisterRequest) => {
    const response = await axios.post('Auth/Register', requestData);
    return response.data;
}

const authService = {
    loginAsync,
    getCurrentUserAsync,
    registerAsync,
}

export default authService;