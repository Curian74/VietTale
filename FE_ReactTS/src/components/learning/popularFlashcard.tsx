import lessonService from '@/services/lessonService';
import type { Lesson } from '@/types/lesson';
import { useEffect, useState } from 'react';

const PopularFlashcard = () => {
    const [flashcards, setFlashcards] = useState<Lesson[]>([]);

    const fetchPopularFlashcards = async () => {
        try {
            const data = await lessonService.getPopularLessons();

            setFlashcards(data);
        }

        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPopularFlashcards();
    }, []);

    return (
        <div>
            <p className="font-semibold text-gray-600 text-md mb-4">Bộ thẻ ghi nhớ phổ biến</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {flashcards.length > 0
                    ? flashcards.map((card, index) => (
                        <div
                            key={index}
                            className="py-3 h-60 px-4 rounded-xl border-2 border-gray-200
                         bg-white hover:shadow-md hover:border-blue-300 hover:border-b-6 transition-shadow"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                {card.name}
                            </h3>

                            <span className="text-xs rounded-sm bg-gray-200 px-2 text-black font-medium">
                                {card.numberOfQuestions} thuật ngữ
                            </span>

                            <div className='mt-30 flex items-center gap-2'>
                                <img
                                    src='https://i.pinimg.com/736x/55/3b/7d/553b7d4c5657258292812991ef4edef8.jpg'
                                    className='rounded-full w-6'
                                >
                                </img>
                                <p className='text-sm font-medium text-black'>{card.user?.userName}</p>
                                {/* <span className="text-xs rounded-sm bg-gray-200 px-2 text-black font-medium">
                                    Giáo viên
                                </span> */}
                            </div>

                        </div>
                    ))
                    : <p className="font-semibold text-gray-600 text-md mb-4">Không có flashcard nào.</p>
                }
            </div>
        </div>
    );
};

export default PopularFlashcard;
