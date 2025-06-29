import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import answerService from "@/services/answerService"
import lessonService from "@/services/lessonService"
import questionService from "@/services/questionService"
import userFlashcardAttemptService from "@/services/userFlashcardAttemptService"
import type { Answer } from "@/types/answer"
import type { Lesson } from "@/types/lesson"
import type { Question } from "@/types/question"
import type { UserFlashcardAttempt } from "@/types/userFlashcardAttempt"
import {
    // Settings,
    X,
    ArrowLeft,
    ArrowRight,
    Keyboard,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

export default function Flashcard() {

    const { attemptId, lessonId } = useParams();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [flashcardAttempt, setFlashcardAttempt] = useState<UserFlashcardAttempt>();
    const [questionAnswers, setQuestionAnswers] = useState<Answer[]>([]);
    const [lesson, setLesson] = useState<Lesson>();
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

    const navigate = useNavigate();

    const getAttemptById = async (attemptId: string) => {
        try {
            const data = await userFlashcardAttemptService.getById(parseInt(attemptId));
            setFlashcardAttempt(data);
        }

        catch (err) {
            console.log(err);
        }
    }

    const getLessonById = async () => {
        try {
            const data = await lessonService.getById(parseInt(lessonId!));
            setLesson(data);
        }

        catch (err) {
            console.log(err);
        }
    }

    const updateFlashcardAttempt = async () => {
        try {
            const data = await userFlashcardAttemptService.updateAsync(attemptId!, {
                currentQuestionNumber: currentIndex
            })
            setFlashcardAttempt(data);
        }

        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAttemptById(attemptId!);
        getLessonById();
    }, [attemptId])

    const getAllQuestions = async () => {
        try {
            const data = await questionService.getByLessonId(lessonId!);

            setQuestions(data);
        }
        catch (err) {
            console.error("Error fetching questions:", err);
        }
    }

    useEffect(() => {
        getAllQuestions();
    }, []);

    useEffect(() => {
        if (!questions.length || !flashcardAttempt) return;

        setCurrentIndex(flashcardAttempt.currentQuestionNumber);
    }, [questions, flashcardAttempt]);

    useEffect(() => {
        if (!questions.length || currentIndex === 0) return;

        const current = questions[currentIndex - 1];
        setCurrentQuestion(current);

        const fetchAnswers = async () => {
            try {
                setIsTransitioning(true);
                const answers = await answerService.getByQuestionId(current.id);
                setQuestionAnswers(answers);
                setIsFlipped(false);
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() => setIsTransitioning(false), 100);
            }
        };

        fetchAnswers();
        updateFlashcardAttempt();
    }, [currentIndex, questions]);


    useEffect(() => {
        if (!attemptId || currentIndex === 0) return;
        updateFlashcardAttempt();
    }, [currentIndex]);

    return (
        <div
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Spacebar") {
                    e.preventDefault();
                    setIsFlipped(!isFlipped);
                }

                else if (e.key === "ArrowLeft" && currentIndex >= 2) {
                    setSlideDirection("left");
                    setCurrentIndex(currentIndex - 1);
                }

                else if (e.key === "ArrowRight" && currentIndex <= lesson?.numberOfQuestions! - 1) {
                    setSlideDirection("right");
                    setCurrentIndex(currentIndex + 1);
                }

            }}
            className="w-full mx-auto bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 text-white rounded-md text-sm">
                        <span className="font-semibold text-gray-600 text-xl">Thẻ ghi nhớ</span>
                    </div>
                </div>

                <div className="text-center text-lg font-semibold">
                    <div className="text-sm text-gray-800">
                        <span>{flashcardAttempt?.currentQuestionNumber || 0} / {lesson?.numberOfQuestions}</span>
                    </div>
                    <div className="font-semibold text-gray-800">{lesson?.name}</div>
                </div>

                <div className="flex items-center gap-2">
                    {/* <Button variant="ghost" size="icon">
                        <Settings className="w-4 h-4" />
                    </Button> */}
                    <Button
                        onClick={() => navigate(`/learning/lesson/${lessonId}`)}
                        variant="ghost" size="icon">
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-8 pb-10 mt-4 h-full">
                <div
                    className={`flip-container w-full max-w-3xl h-full mx-auto relative 
                    ${isFlipped ? "flipped" : ""}
                    ${isTransitioning ? `slide-animating slide-${slideDirection}` : "slide-reset"}`}
                    onClick={() => {
                        if (!isTransitioning) setIsFlipped(!isFlipped);
                    }}
                >

                    <div className={`flipper w-full h-full ${isTransitioning ? "transition-none" : ""}`}>
                        {/* Front */}
                        <div className="front min-h-[70vh]">
                            <Card className="pb-0 h-full flex flex-col justify-between">
                                <CardContent className="p-8">
                                    <div className="mb-8 text-center">
                                        <h2 className="text-2xl font-medium text-gray-800 mb-6">{currentQuestion?.content}</h2>

                                        {/* Options */}
                                        <div className="space-y-2">
                                            {questionAnswers.map((option, index) => (
                                                <div
                                                    key={index}
                                                    className="p-4 text-lg cursor-pointer transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-medium text-2xl text-gray-700">{String.fromCharCode(65 + index)}.</span>
                                                        <span className="text-gray-800 text-xl">{option.content}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>

                                <div className="bg-[#dbdfff] p-1 rounded-b-xl">
                                    <div className="flex justify-center items-center gap-5">
                                        <div className="bg-amber-400 w-fit rounded-full p-1">
                                            <Keyboard size={20} className="text-amber-900 text-center ml-[1px]" />
                                        </div>

                                        <div>
                                            <span className="text-sm">Phím tắt</span>
                                        </div>

                                        <div className="flex gap-2">
                                            <span className="text-sm">Nhấn</span>
                                            <span className="text-sm text-[#ce8c0a] font-semibold">Space</span>
                                            <span className="text-sm">hoặc nhấp vào thẻ để lật</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Back */}
                        <div className="back">
                            <Card className="flex justify-center min-h-[70vh] shadow-lg">
                                <CardContent className="p-8 h-full flex items-center justify-center">
                                    <div className="text-center">
                                        <h2 className="text-3xl font-semibold">
                                            {
                                                (() => {
                                                    const correctIndex = questionAnswers.findIndex(opt => opt.isCorrect);
                                                    const correctAnswer = questionAnswers[correctIndex];
                                                    if (correctIndex === -1 || !correctAnswer) return "Chưa có";
                                                    return `${String.fromCharCode(65 + correctIndex)}. ${correctAnswer.content}`;
                                                })()
                                            }
                                        </h2>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
                <div className="flex items-center justify-center max-w-4xl mx-auto">
                    {/* Progress Toggle */}
                    {/* <div className="flex items-center gap-2">
                        <Switch checked={trackProgress} onCheckedChange={setTrackProgress} />
                        <span className="text-sm text-blue-600">Theo dõi tiến độ</span>
                    </div> */}

                    {/* Navigation */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-20 h-10 rounded-full bg-transparent cursor-pointer"
                            onClick={() => {
                                if (currentIndex >= 2) {
                                    setSlideDirection("left");
                                    setCurrentIndex(currentIndex - 1);
                                }
                            }}
                        >
                            <ArrowLeft className="w-7 h-7 text-gray-700" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="w-20 h-10 rounded-full bg-transparent cursor-pointer"
                            onClick={() => {
                                if (currentIndex <= lesson?.numberOfQuestions! - 1) {
                                    setSlideDirection("right");
                                    setCurrentIndex(currentIndex + 1);
                                }
                            }}
                        >
                            <ArrowRight className="w-7 h-7 text-gray-700" />
                        </Button>

                    </div>


                    {/* Media Controls */}
                    {/* <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={onPlay}>
                            <Play className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={onShuffle}>
                            <Shuffle className="w-4 h-4" />
                        </Button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
