import { useEffect, useState } from 'react'
import type { MajorTimeline } from '../types/MajorTimeline';
import MajorTimelineService from '../services/MajorTimelineService';
import CustomCircularLoading from './layouts/CustomCircularLoading';

const PAGE_SIZE = 1;

const Timetoast = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [majorTimeLine, setMajorTimeLine] = useState<MajorTimeline | null>(null);
    const [years, setYears] = useState<number[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMajorTimeline = async (page: number) => {
        try {
            const data = await MajorTimelineService.getPagedAsync(page + 1, PAGE_SIZE);
            const item = data.items[0];
            setMajorTimeLine(item);

            const yearsTemp = [];
            for (let year = item.startYear; year <= item.endYear; year++) {
                yearsTemp.push(year);
            }
            setYears(yearsTemp);

            setTotalPages(Math.ceil(data.totalPages / PAGE_SIZE));

            setIsLoading(false);

        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        fetchMajorTimeline(pageIndex);
    }, [pageIndex]);

    const eventsByYear: Record<number, MajorTimeline['events']> = {};
    if (majorTimeLine) {
        for (const year of years) {
            eventsByYear[year] = majorTimeLine.events.filter(
                (e) => new Date(e.eventTime).getFullYear() === year
            );
        }
        console.log(eventsByYear)
    }

    const handlePrev = () => {
        if (pageIndex > 0) setPageIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        if (pageIndex < totalPages - 1) setPageIndex((prev) => prev + 1);
    };

    if (isLoading) {
        return <CustomCircularLoading />
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-[#f3f3f3] shadow border border-gray-200">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-blue-800">{majorTimeLine?.name}</h2>
                <p className="text-gray-600 italic mb-2">
                    {majorTimeLine?.startYear}  → {majorTimeLine?.endYear}
                </p>
                <p className="text-gray-700">{majorTimeLine?.description}</p>
            </div>

            <div className="overflow-x-auto border-t border-gray-300 pt-4">
                <div className="flex min-w-[800px] space-x-4">
                    {years.map((year) => (
                        <div key={year} className="flex flex-col items-center w-64">
                            <div className="text-md font-semibold text-gray-500 mb-2">{year}</div>
                            {eventsByYear[year].map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-white text-left rounded px-2 py-1 mb-2 w-full text-xs shadow-md"
                                >
                                    <div className='flex justify-center mb-2'>
                                        {event.thumbnail && (
                                            <img
                                                src={event.thumbnail}
                                                alt={event.title}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        )}
                                    </div>

                                    <p className="font-semibold text-[#5a00ff]">
                                        {new Date(event.eventTime).toLocaleDateString('vi-VN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </p>
                                    <p className="mt-1 font-medium">{event.title}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={handlePrev}
                    disabled={pageIndex === 0}
                    className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={pageIndex >= totalPages - 1}
                    className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Timetoast;

