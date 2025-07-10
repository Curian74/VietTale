export interface Answer {
    id: number;
    content: string;
    isCorrect: boolean;
}

export interface Question {
    id: number;
    content: string;
    answers: Answer[];
    lessonId?: number;
}