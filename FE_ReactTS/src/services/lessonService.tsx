
import axios from '@/configs/axios';
import type { Lesson } from "@/types/lesson";

interface LessonService {
    getById: (id: number) => Promise<Lesson>;
    getPopularLessons: () => Promise<Lesson[]>;
    getLatestLessons: () => Promise<Lesson[]>;
    checkSavedLesson: (lessonId: number, userId: string) => Promise<any>;
    toggleSaveQuestion: (lessonId: number, userId: string) => Promise<any>;
    updateLastActive: (lessonId: number, userId: string) => Promise<any>;
    startLesson: (data: { lessonId: number; userId: string }) => Promise<any>;
    submitLesson: (data: { attemptId: number; answers: { questionId: number; selectedAnswerId: number }[] }) => Promise<any>;
    getLastAttempt: (lessonId: number, userId: string) => Promise<any>;
    getLessonWithQuestions: (id: number) => Promise<any>;
}

const lessonService: LessonService = {
    getById: async (id) => {
        const response = await axios.get(`/lesson/${id}`);
        return response.data;
    },

    getPopularLessons: async () => {
        const response = await axios.get("/lesson/popular");
        return response.data;
    },

    getLatestLessons: async () => {
        const response = await axios.get("/lesson/latest");
        return response.data;
    },

    checkSavedLesson: async (lessonId, userId) => {
        return await axios.get(`/lesson/${lessonId}/saved/${userId}`);
    },

    toggleSaveQuestion: async (lessonId, userId) => {
        return await axios.post(`/lesson/${lessonId}/save/${userId}`);
    },

    updateLastActive: async (lessonId, userId) => {
        return await axios.put(`/lesson/${lessonId}/last-active/${userId}`);
    },

    startLesson: async (data) => {
        const response = await axios.post("/lesson/start", data);
        return response.data;
    },

    submitLesson: async (data) => {
        const response = await axios.post("/lesson/submit", data);
        return response.data;
    },

    getLastAttempt: async (lessonId, userId) => {
        const response = await axios.get(`/lesson/last-attempt`, {
            params: {
                lessonId,
                userId
            }
        });
        return response.data;
    },

    getLessonWithQuestions: async (id) => {
        const response = await axios.get(`/lesson/questions/${id}`);
        return response.data;
    }
};

export default lessonService;