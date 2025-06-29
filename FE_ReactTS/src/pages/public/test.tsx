"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
// import { Switch } from "@/components/ui/switch"
import {
    Bookmark,
    Share,
    MoreHorizontal,
    X,
    CreditCard,
    RotateCcw,
    FileText,
    Star,
    // ChevronLeft,
    // ChevronRight,
    // Play,
    // SkipForward,
    // Settings,
    // Maximize,
} from "lucide-react"
import Header from "@/components/Header"
import LearningSidebar from "@/components/learning/learningSidebar"
import { useParams } from "react-router"
import lessonService from "@/services/lessonService"
import type { Lesson } from "@/types/lesson"

export default function FlashcardApp() {
    const [lesson, setLesson] = useState<Lesson>();

    const { id } = useParams();

    const studyModes = [
        { icon: CreditCard, label: "Thẻ ghi nhớ", color: "bg-purple-100 text-purple-600" },
        { icon: RotateCcw, label: "Học", color: "bg-blue-100 text-blue-600" },
        { icon: FileText, label: "Kiểm tra", color: "bg-blue-100 text-blue-600" },
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

    useEffect(() => {
        getById();
    }, [id])

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <Header />

            <LearningSidebar />

            <div className="max-w-6xl mx-auto px-4 py-6 ml-60 md:ml-70 p-6">
                {/* Breadcrumb and Actions */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>Nghệ thuật và nhân văn</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                            <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Title and Stats */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{lesson?.name}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                            <span className="text-pink-500">📈</span>
                            <span>34 đang học</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>3.8 (13 đánh giá)</span>
                        </div>
                    </div>
                </div>

                {/* Study Mode Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {studyModes.map((mode, index) => {
                        const IconComponent = mode.icon
                        return (
                            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${mode.color}`}>
                                        <IconComponent className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-gray-900">{mode.label}</span>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

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
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>H</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">Huyen0996</span>
                            <Badge variant="secondary" className="text-xs">
                                Giáo viên
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-500">Đã tạo 1 năm trước</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
