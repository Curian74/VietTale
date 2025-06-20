import DashedLine from '@/components/ui/dashedLine'
import { useState } from 'react'

type QuizTabs = 'Lịch sử lớp 12' | 'Lịch sử lớp 11' | 'Lịch sử lớp 10' | 'Lịch sử lớp 9' | 'Lịch sử lớp 8'

const tabs: QuizTabs[] = ['Lịch sử lớp 12', 'Lịch sử lớp 11', 'Lịch sử lớp 10', 'Lịch sử lớp 9', 'Lịch sử lớp 8']

const quizData: Record<QuizTabs, { question: string, options: string[] }> = {
    'Lịch sử lớp 12': {
        question: 'Nguyên thủ những nước nào sau đây tham dự Hội nghị Ianta (2/1945)?',
        options: [
            'Anh, Pháp, Mỹ',
            'Anh, Mỹ, Liên Xô',
            'Anh, Pháp, Đức',
            'Mỹ, Liên Xô, Trung Quốc'
        ]
    },
    'Lịch sử lớp 11': {
        question: 'Từ đầu thế kỉ XIX đến trước năm 1868, đặc điểm bao trùm của nền kinh tế Nhật Bản là gì?',
        options: [
            'Nông nghiệp lạc hậu',
            'Công nghiệp phát triển',
            'Thương mại hàng hóa',
            'Sản xuất quy mô lớn'
        ]
    },
    'Lịch sử lớp 10': {
        question: 'Lịch sử được hiểu là',
        options: [
            'Những gì đã diễn ra trong quá khứ.',
            'những gì đang diễn ra ở hiện tại.',
            'Ngành khoa học dự đoán về tương lai.',
            'Những gì sẽ diễn ra trong tương lai.'
        ]
    },
    'Lịch sử lớp 9': {
        question: 'Mục tiêu chủ yếu của Liên Xô khi thực hiện kế hoạch 5 năm (1946-1950) là gì?',
        options: [
            'Mục tiêu chủ yếu của Liên Xô khi thực hiện kế hoạch 5 năm (1946-1950) là gì?',
            'Củng cố quốc phòng an ninh',
            'Xây dựng cơ sở vật chất kĩ thuật cho chủ nghĩa xã hội',
            'Công nghiệp hóa xã hội chủ nghĩa'
        ]
    },
    'Lịch sử lớp 8': {
        question: 'Điểm hạn chế của Hiến pháp 1787 của Mĩ là',
        options: [
            'Thiết lập chế độ cộng hòa liên bang',
            'Chưa giải phóng được toàn bộ đất nước',
            'Quyền lợi kinh tế- chính trị không bao gồm phụ nữ, nô lệ',
            'Có sự thỏa hiệp với các thế lực phong kiến'
        ]
    },
}

const Quiz = () => {
    const [activeTab, setActiveTab] = useState<QuizTabs>('Lịch sử lớp 12');
    const [selectedOption, setSelectedOption] = useState<string | null>(null)

    const { question, options } = quizData[activeTab]

    return (
        <section className="max-w-3xl mx-auto">
            {/* Title */}
            <div className="text-center mb-4">
                <h1 className="text-3xl font-medium uppercase mb-2">Trắc nghiệm</h1>
                <DashedLine />
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab)
                            setSelectedOption(null)
                        }}
                        className={`px-4 py-2 cursor-pointer rounded-full border transition 
                            ${activeTab === tab
                                ? 'bg-[#f8b560] text-[#f8f2f2] border-gray-200'
                                : 'bg-[#fdf6ea] text-[#808080] border-gray-600 hover:bg-[#f8b560]'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Quiz Content */}
            <div className="bg-[#fefaf3] border-2 rounded-lg p-6 mb-10">
                <h2 className="font-semibold mb-4 text-center">{question}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedOption(option)}
                            className={`border px-4 py-2 cursor-pointer rounded-full text-left transition
                                ${selectedOption === option
                                    ? 'bg-orange-400 text-white border-orange-400'
                                    : 'bg-[#fefaf3] hover:bg-[#f8b560] text-gray-700 border-gray-300'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <p className="text-sm text-gray-500 mb-3">Vui lòng đăng nhập để gửi khảo sát</p>

                <div className='text-center'>
                    <button
                        className="bg-[#f8b560] cursor-pointer hover:bg-[#947650] transition-colors duration-200 text-white px-6 py-2 rounded-md disabled:opacity-70"
                    >
                        Gửi
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Quiz
