
// public int Id { get; set; }
// public string? Content { get; set; }

// [ForeignKey(nameof(Question))]
// public int QuestionId { get; set; }
// public Question? Question { get; set; }

export interface Answer {
    id: number;
    content: string;
    questionId: number;
    isCorrect: boolean;
}