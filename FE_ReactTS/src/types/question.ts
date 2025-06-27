
export interface Question {
    id: number;
    content: string;
    isStared?: boolean;
    answer?: string;
    lessonId?: number;
}