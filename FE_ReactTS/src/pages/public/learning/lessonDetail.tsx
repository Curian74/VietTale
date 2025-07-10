"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import userAvatar from '@/assets/images/user/defaultAvatar.jpg';
import {
    Bookmark,
    Share,
    CreditCard,
    RotateCcw,
    FileText,
} from "lucide-react"
import Header from "@/components/Header"
import LearningSidebar from "@/components/learning/learningSidebar"
import { useNavigate, useParams } from "react-router"
import lessonService from "@/services/lessonService"
import type { Lesson } from "@/types/lesson"
import userFlashcardAttemptService from "@/services/userFlashcardAttemptService"
import { useAuth } from "@/contexts/AuthProvider"
import { Facebook, Link2, Twitter } from "lucide-react";
import toast from 'react-hot-toast';
import { CircularProgress } from "@mui/material"

interface LessonAttemptResult {
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

export default function LessonDetail() {
    const [lesson, setLesson] = useState<Lesson>();
    const [isLessonSaved, setIsLessonSaved] = useState<boolean>();
    const [isSaving, setIsSaving] = useState(false);
    const [isCheckingSave, setIsCheckingSave] = useState(true);
    const [showExamDialog, setShowExamDialog] = useState(false);
    const [lastAttempt, setLastAttempt] = useState<LessonAttemptResult | null>(null);
    const [isLoadingAttempt, setIsLoadingAttempt] = useState(false);
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const studyModes = [
        { id: 1, icon: CreditCard, label: "Thẻ ghi nhớ", color: "bg-purple-100 text-purple-600" },
        { id: 2, icon: RotateCcw, label: "Học", color: "bg-blue-100 text-blue-600" },
        { id: 3, icon: FileText, label: "Kiểm tra", color: "bg-blue-100 text-blue-600" },
    ]

    const getById = async () => {
        try {
            const data = await lessonService.getById(parseInt(id!));
            setLesson(data);
        }

        catch (err) {
            console.log(err);
        }
    }

    const checkSavedLesson = async () => {
        setIsCheckingSave(true);
        try {
            const response = await lessonService.checkSavedLesson(lesson?.id!, user?.id!);
            setIsLessonSaved(response.data.isSaved);
        } catch (err) {
            console.log(err);
        }

        finally {
            setIsCheckingSave(false);
        }
    }

    const createFlashcardAttemptAsync = async () => {
        try {
            const data = await userFlashcardAttemptService.createAsync({
                lessonId: parseInt(id!),
                userId: user?.id || 0,
            })

            navigate(`/learning/flashcard/${data.id}/${data.lessonId}`)
        }

        catch (err) {
            console.log(err);
        }
    }

    const updateLastActive = async () => {
        try {
            await lessonService.updateLastActive(lesson?.id!, user?.id!);
        }

        catch (err) {
            console.log(err);
        }
    }

    const getLastAttempt = async () => {
        if (!user?.id || !lesson?.id) return;
        
        setIsLoadingAttempt(true);
        try {
            const response = await lessonService.getLastAttempt(lesson.id, user.id);
            if (response) {
                setLastAttempt(response);
            }
        } catch (err) {
            console.error("Error fetching last attempt:", err);
        } finally {
            setIsLoadingAttempt(false);
        }
    };

    useEffect(() => {
        if (user?.id && lesson?.id) {
            getLastAttempt();
        }
    }, [user, lesson]);

    useEffect(() => {
        if (lesson && user?.id) {
            updateLastActive();
        }
    }, [lesson, user]);

    useEffect(() => {
        getById();
    }, [id])

    const handleSaveLesson = async () => {
        setIsSaving(true);
        try {
            await lessonService.toggleSaveQuestion(lesson?.id!, user?.id!);
            checkSavedLesson();
        } catch (err) {
            console.log(err);
        }

        finally {
            setIsSaving(false);
        }
    }

    useEffect(() => {
        if (lesson && user?.id) {
            checkSavedLesson();
        }
    }, [lesson, user]);

    const handleStartExam = () => {
        setShowExamDialog(true);
    };

    const handleConfirmExam = async () => {
        try {
            const data = await lessonService.startLesson({
                lessonId: parseInt(id!),
                userId: user?.id || "",
            });
            setShowExamDialog(false);
            navigate(`/learning/quiz/${id}/exam?attemptId=${data.attemptId}`);
        } catch (err) {
            console.log(err);
            toast.error("Có lỗi xảy ra khi bắt đầu bài kiểm tra");
        }
    };

    const handleStudyMode = (modeId: number) => {
        switch (modeId) {
            case 1: // Flashcard
                createFlashcardAttemptAsync();
                break;
            case 2: // Study
                navigate(`/learning/quiz/${id}/study`);
                break;
            case 3: // Exam
                handleStartExam();
                break;
        }
    };

    const shareUrl = `${window.location.origin}/learning/lesson/${lesson?.id}`;

    const handleShareToFacebook = () => {
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(fbUrl, '_blank');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Đã sao chép liên kết!")
    };

    const handleShareToTwitter = () => {
        const text = encodeURIComponent(`Khám phá học phần này!`);
        const url = encodeURIComponent(shareUrl);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        window.open(twitterUrl, "_blank");
    };

    return (
        <>
            <Header />
            <div className="min-h-screen container mx-auto bg-white">
                {/* Header */}

                <LearningSidebar />

                <div className="max-w-6xl px-4 py-6 md:ml-70 p-6">
                    {/* Breadcrumb and Actions */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Nghệ thuật và nhân văn</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div>
                                {!isSaving ?
                                    !isCheckingSave ? <Button
                                        onClick={handleSaveLesson}
                                        className={`flex items-center cursor-pointer gap-2 px-3 py-2 rounded-md border transition-colors duration-200
                                            ${isLessonSaved ? 'bg-blue-100 text-blue-600 border-blue-300 hover:bg-[#dbdfff]'
                                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
                                        variant="ghost"
                                    >
                                        <Bookmark className={`w-4 h-4 ${isLessonSaved ? 'fill-blue-500' : 'stroke-gray-500'}`} />
                                        <span className="text-sm font-medium">
                                            {isLessonSaved ? 'Đã lưu' : 'Lưu'}
                                        </span>
                                    </Button>
                                        : <CircularProgress size={25} />
                                    : <CircularProgress size={25} />
                                }
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Share className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={handleShareToFacebook}>
                                        <Facebook className="w-4 h-4 mr-2 text-blue-500" /> Facebook
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={handleShareToTwitter}>
                                        <Twitter className="w-4 h-4 mr-2 text-blue-500" /> Twitter
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={handleCopyLink}>
                                        <Link2 className="w-4 h-4 mr-2" /> Sao chép liên kết
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {/* <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button> */}
                        </div>
                    </div>

                    {/* Title and Stats */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">{lesson?.name}</h1>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <span className="text-pink-500 text-2xl">📈</span>
                                <span className="text-md">{lesson?.numberOfLearners} người học</span>
                            </div>
                            {/* <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>3.8 (13 đánh giá)</span>
                        </div> */}
                        </div>
                    </div>

                    {/* Study Mode Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                        {studyModes.map((mode) => {
                            const IconComponent = mode.icon;
                            return (
                                <Card
                                    key={mode.id}
                                    className="cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => handleStudyMode(mode.id)}
                                >
                                    <CardContent className="p-6 flex items-center space-x-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${mode.color}`}>
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium text-gray-900">{mode.label}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Last Attempt Results */}
                    {isLoadingAttempt ? (
                        <div className="flex justify-center my-4">
                            <CircularProgress size={30} />
                        </div>
                    ) : lastAttempt && lastAttempt.isCompleted && (
                        <Card className="mb-8">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Kết quả lần kiểm tra gần nhất
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Điểm số:</span>
                                            <span className="font-semibold text-lg text-blue-600">
                                                {lastAttempt.score}/100
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Câu trả lời đúng:</span>
                                            <span className="font-medium">
                                                {lastAttempt.correctAnswers}/{lastAttempt.totalQuestions}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Thời gian bắt đầu:</span>
                                            <span className="font-medium">
                                                {new Date(lastAttempt.startTime).toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Thời gian hoàn thành:</span>
                                            <span className="font-medium">
                                                {new Date(lastAttempt.completionTime).toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Hint Toggle */}
                    {/* <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700">Hiển thị gợi ý</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-gray-400" />
                    </div>
                </div> */}

                    {/* Flashcard */}
                    {/* <div className="flex justify-center mb-8">
                    <Card className="w-full max-w-2xl h-64 flex items-center justify-center bg-white shadow-lg">
                        <CardContent className="text-center">
                            <h2 className="text-4xl font-semibold text-gray-800">Toaster</h2>
                        </CardContent>
                    </Card>
                </div> */}

                    {/* Bottom Controls */}
                    {/* <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Theo dõi tiến độ</span>
                        <Switch />
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon">
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="text-sm text-gray-600">
                            {currentCard} / {totalCards}
                        </span>
                        <Button variant="ghost" size="icon">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                            <Play className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <SkipForward className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Maximize className="w-4 h-4" />
                        </Button>
                    </div>
                </div> */}

                    {/* User Info */}
                    <div className="flex items-center space-x-3 pt-4 border-t">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={lesson?.user?.avatar || userAvatar} />
                            <AvatarFallback>{userAvatar}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center space-x-2">
                                <small>Tạo bởi</small>
                                <span className="font-medium text-gray-900">{lesson?.user?.userName}</span>
                                {/* <Badge variant="secondary" className="text-xs">
                                Giáo viên
                            </Badge> */}
                            </div>
                            {lesson?.createdAt && (
                                <p className="text-sm text-gray-500">
                                    {new Date(lesson.createdAt).toLocaleDateString("vi-VN", {
                                        weekday: "short",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Exam Confirmation Dialog */}
            <AlertDialog open={showExamDialog} onOpenChange={setShowExamDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bắt đầu kiểm tra?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn sẽ bắt đầu bài kiểm tra. Kết quả sẽ được lưu lại sau khi hoàn thành.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmExam}>
                            Bắt đầu
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
