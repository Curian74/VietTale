import lessonService from '@/services/lessonService';
import type { Lesson } from '@/types/lesson';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import userAvatar from '@/assets/images/user/defaultAvatar.jpg';
import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';

const PopularFlashcard = () => {
    const [flashcards, setFlashcards] = useState<Lesson[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const fetchPopularFlashcards = async () => {
        setIsLoading(true);
        try {
            const data = await lessonService.getPopularLessons();
            console.log("Popular lessons response:", data);
            setFlashcards(data);
        }
        catch (err) {
            console.error("Error fetching popular flashcards:", err);
            toast.error("Không thể tải các bộ thẻ phổ biến. Vui lòng thử lại sau.");
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchPopularFlashcards();
    }, []);

    return (
        <div>
            <p className="font-semibold text-gray-600 text-md mb-4">Bộ thẻ ghi nhớ phổ biến</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {!isLoading ?
                    flashcards.length > 0 ? (
                        flashcards.map((card) => (
                            <div
                                key={card.id}
                                onClick={() => navigate(`/learning/lesson/${card.id}`)}
                                className="cursor-pointer py-3 h-60 px-4 rounded-xl border-2 border-gray-200
                            bg-white hover:shadow-md hover:border-blue-300 hover:border-b-6 transition-shadow"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                    {card.name}
                                </h3>

                                <span className="text-xs rounded-sm bg-gray-200 px-2 text-black font-medium">
                                    {card.numberOfQuestions} thuật ngữ
                                </span>

                                <div className="flex items-center gap-2 mt-30">
                                    <img
                                        src={card.user?.avatar || userAvatar}
                                        className="rounded-full w-6"
                                        alt="avatar"
                                    />
                                    <p className="text-sm font-medium text-black">
                                        {card.user?.userName}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="font-semibold text-gray-600 text-md mb-4">Không có flashcard nào.</p>
                    )
                    : <CircularProgress />
                }
            </div>
        </div>

    );
};

export default PopularFlashcard;
