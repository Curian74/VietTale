"use client"

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import LearningSidebar from "@/components/learning/learningSidebar";
import Header from "@/components/Header";
import lessonService from "@/services/lessonService";
import { useAuth } from "@/contexts/AuthProvider";
import toast from "react-hot-toast";

interface Question {
    id: number;
    content: string;
    answers: Answer[];
}

interface Answer {
    id: number;
    content: string;
    isCorrect: boolean;
}

interface ExamResult {
    id: number;
    userId: string;
    lessonId: number;
    startTime: string;
    completionTime: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    isCompleted: boolean;
}

interface QuizState {
    questions: Question[];
    currentQuestionIndex: number;
    selectedAnswers: Record<number, number>;
    submitted: boolean;
    results: Record<number, boolean>;
    examMode: boolean;
    timeLeft: number;
    attemptId: number | null;
    examResult: ExamResult | null;
}

const Quiz = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const { user } = useAuth();
    const [quizState, setQuizState] = useState<QuizState>({
        questions: [],
        currentQuestionIndex: 0,
        selectedAnswers: {},
        submitted: false,
        results: {},
        examMode: window.location.pathname.includes('/exam'),
        timeLeft: 0,
        attemptId: parseInt(searchParams.get('attemptId') || '0') || null,
        examResult: null
    });
    const [showSubmitDialog, setShowSubmitDialog] = useState(false);
    const [unansweredQuestions, setUnansweredQuestions] = useState<number[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                if (!id) return;
                const data = await lessonService.getLessonWithQuestions(Number(id));
                setQuizState(prev => ({
                    ...prev,
                    questions: data.questions,
                    timeLeft: data.timeLimit || 0
                }));
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, [id]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (quizState.examMode && quizState.timeLeft > 0 && !quizState.submitted) {
            timer = setInterval(() => {
                setQuizState(prev => {
                    if (prev.timeLeft <= 1) {
                        clearInterval(timer);
                        return {
                            ...prev,
                            timeLeft: 0,
                            submitted: true
                        };
                    }
                    return { ...prev, timeLeft: prev.timeLeft - 1 };
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [quizState.examMode, quizState.timeLeft, quizState.submitted]);

    const handleAnswerSelect = (questionId: number, answerId: number) => {
        if (quizState.submitted) return;
        setQuizState(prev => ({
            ...prev,
            selectedAnswers: {
                ...prev.selectedAnswers,
                [questionId]: answerId
            }
        }));
    };

    const handleSubmitClick = () => {
        const unanswered = quizState.questions
            .filter(q => !quizState.selectedAnswers[q.id])
            .map(q => quizState.questions.indexOf(q) + 1);

        setUnansweredQuestions(unanswered);
        setShowSubmitDialog(true);
    };

    const handleConfirmSubmit = async () => {
        const results: Record<number, boolean> = {};
        quizState.questions.forEach(question => {
            const selectedAnswerId = quizState.selectedAnswers[question.id];
            const correctAnswer = question.answers.find(a => a.isCorrect);
            results[question.id] = selectedAnswerId === correctAnswer?.id;
        });

        if (quizState.examMode && quizState.attemptId) {
            try {
                const answers = quizState.questions.map(question => ({
                    questionId: question.id,
                    selectedAnswerId: quizState.selectedAnswers[question.id] || 0
                }));

                const examResult = await lessonService.submitLesson({
                    attemptId: quizState.attemptId,
                    answers: answers
                });

                setQuizState(prev => ({
                    ...prev,
                    submitted: true,
                    results,
                    examResult
                }));
            } catch (err) {
                console.error("Error submitting exam:", err);
                toast.error("Có lỗi xảy ra khi nộp bài kiểm tra");
                return;
            }
        } else {
            setQuizState(prev => ({
                ...prev,
                submitted: true,
                results
            }));
        }
        setShowSubmitDialog(false);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const navigateToQuestion = (index: number) => {
        setQuizState(prev => ({
            ...prev,
            currentQuestionIndex: index
        }));
    };

    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const progress = ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;

    return (
        <>
            <Header />
            <div className="min-h-screen container mx-auto bg-white">
                {/* Header */}
                <LearningSidebar />

                <div className="max-w-6xl px-4 py-6 md:ml-70 p-6">
                    {/* Timer and Results Section */}
                    <div className="mb-6">
                        {quizState.examMode && (
                            <div className="mb-4 text-right">
                                <div className="text-2xl font-bold text-[#8B4513]">
                                    {!quizState.submitted ? (
                                        `Thời gian còn lại: ${formatTime(quizState.timeLeft)}`
                                    ) : quizState.examResult && (
                                        <div className="text-center">
                                            <div className="text-3xl mb-4">
                                                Điểm số: {quizState.examResult.score}/100
                                            </div>
                                            <div className="text-xl">
                                                Trả lời đúng: {quizState.examResult.correctAnswers}/{quizState.examResult.totalQuestions} câu
                                            </div>
                                            <div className="text-sm text-gray-600 mt-2">
                                                Thời gian hoàn thành: {new Date(quizState.examResult.completionTime).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {quizState.submitted && !quizState.examMode && (
                            <Card className="p-4 bg-[#f5d5a1] mb-4">
                                <h3 className="text-lg font-semibold text-[#8B4513] mb-2">Kết quả</h3>
                                <p className="text-[#8B4513] mb-4">
                                    Bạn đã trả lời đúng {Object.values(quizState.results).filter(Boolean).length} trên{" "}
                                    {quizState.questions.length} câu hỏi
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {quizState.questions.map((question, index) => {
                                        const isCorrect = quizState.results[question.id];
                                        return (
                                            <div
                                                key={question.id}
                                                className={`p-3 rounded-lg ${
                                                    isCorrect ? "bg-green-200" : "bg-red-200"
                                                }`}
                                                onClick={() => navigateToQuestion(index)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="font-medium text-[#8B4513]">
                                                    Câu {index + 1}
                                                </div>
                                                <div className="text-sm text-[#8B4513]">
                                                    {isCorrect ? "Đúng" : "Sai"}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4 bg-[#f5d5a1] h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-[#8B4513] h-2 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Question Navigation */}
                    <div className="mb-4 flex flex-wrap gap-2">
                        {quizState.questions.map((_, index) => (
                            <Button
                                key={index}
                                onClick={() => navigateToQuestion(index)}
                                className={`w-10 h-10 p-0 ${
                                    index === quizState.currentQuestionIndex
                                        ? "ring-2 ring-[#8B4513]"
                                        : ""
                                } ${
                                    quizState.selectedAnswers[quizState.questions[index].id]
                                        ? "bg-[#f5d5a1]"
                                        : "bg-white"
                                } text-[#8B4513] hover:bg-[#edc07c]`}
                                variant="outline"
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>

                    {/* Current Question Card */}
                    <Card className="p-6 bg-white shadow-lg">
                        {currentQuestion && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-[#8B4513]">
                                    Câu hỏi {quizState.currentQuestionIndex + 1}
                                </h2>
                                <p className="mb-6 text-[#8B4513]">{currentQuestion.content}</p>
                                <div className="space-y-4">
                                    {currentQuestion.answers.map(answer => (
                                        <Button
                                            key={answer.id}
                                            className={`w-full justify-start p-4 text-left ${
                                                quizState.selectedAnswers[currentQuestion.id] === answer.id
                                                    ? "bg-[#f5d5a1]"
                                                    : "bg-white"
                                            } ${
                                                quizState.submitted
                                                    ? answer.isCorrect
                                                        ? "!bg-green-200"
                                                        : quizState.selectedAnswers[currentQuestion.id] === answer.id
                                                        ? "!bg-red-200"
                                                        : ""
                                                    : "hover:bg-[#edc07c]"
                                            }`}
                                            onClick={() => handleAnswerSelect(currentQuestion.id, answer.id)}
                                            variant="outline"
                                            disabled={quizState.submitted}
                                        >
                                            {answer.content}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-8 flex justify-between items-center">
                            <Button
                                onClick={() => navigateToQuestion(quizState.currentQuestionIndex - 1)}
                                disabled={quizState.currentQuestionIndex === 0}
                                className="bg-[#f5d5a1] text-[#8B4513] hover:bg-[#edc07c]"
                            >
                                Câu trước
                            </Button>
                            <Button
                                onClick={() => navigateToQuestion(quizState.currentQuestionIndex + 1)}
                                disabled={quizState.currentQuestionIndex === quizState.questions.length - 1}
                                className="bg-[#f5d5a1] text-[#8B4513] hover:bg-[#edc07c]"
                            >
                                Câu tiếp
                            </Button>
                        </div>

                        {!quizState.submitted && (
                            <div className="mt-8 text-center">
                                <Button
                                    onClick={handleSubmitClick}
                                    className="bg-[#8B4513] text-white hover:bg-[#6b3410]"
                                >
                                    Nộp bài
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            {/* Submit Confirmation Dialog */}
            <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {unansweredQuestions.length > 0 
                                ? "Bạn chưa trả lời tất cả câu hỏi"
                                : "Xác nhận nộp bài?"
                            }
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {unansweredQuestions.length > 0 ? (
                                <div className="space-y-2">
                                    <div>Bạn chưa trả lời các câu hỏi sau:</div>
                                    <div className="font-medium text-[#8B4513]">
                                        Câu {unansweredQuestions.join(", ")}
                                    </div>
                                    <div>Bạn có chắc chắn muốn nộp bài?</div>
                                </div>
                            ) : (
                                "Bạn có chắc chắn muốn nộp bài? Kết quả sẽ được lưu lại sau khi hoàn thành."
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmSubmit}>
                            Nộp bài
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Quiz; 