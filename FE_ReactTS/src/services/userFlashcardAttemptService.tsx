import type { CreateFlashcardAttemptRequest } from "@/types/requests/createFlashcardAttemptRequest";
import axios from '@/configs/axios';
import type { UpdateFlashcardAttemptRequest } from "@/types/requests/updateFlashcardAttemptRequest";

const createAsync = async (data: CreateFlashcardAttemptRequest) => {
    const response = await axios.post('UserFlashcardAttempt', data);
    return response.data;
}

const getById = async (id: number) => {
    const response = await axios.get(`UserFlashcardAttempt/${id}`);
    return response.data;
}

const updateAsync = async (attemptId: number | string, data: UpdateFlashcardAttemptRequest) => {
    const response = await axios.put(`UserFlashcardAttempt/${attemptId}`, data);
    return response.data;
}

const userFlashcardAttemptService = {
    createAsync,
    getById,
    updateAsync,
};

export default userFlashcardAttemptService;