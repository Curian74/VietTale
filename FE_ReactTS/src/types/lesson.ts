import type { AppUser } from "./appUser";

export interface Lesson {
    id: number;
    name: string;
    numberOfQuestions: number;
    createdAt: Date;
    numberOfLearners: number;
    createdBy?: string;
    user?: AppUser;
    questions?: string[];
}