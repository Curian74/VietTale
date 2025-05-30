import { Button } from './ui/button';
import { Tooltip } from '@mui/material';
import type { MajorTimeline } from '../types/majorTimeline';

const TITLE_MAX_LENGTH = 35;

interface TimelineProps {
    onLoadComplete: () => void;
    events: Record<number, MajorTimeline['events']>;
    years: number[];

    pageIndex: number;
    totalPages: number;
    handlePrev: () => void;
    handleNext: () => void;

    majorTimeline: MajorTimeline | null;
}

const Timeline = ({
    events,
    years,
    handlePrev,
    handleNext,
    pageIndex,
    totalPages,
    majorTimeline }: TimelineProps) => {

    const handleEventClick = (eventId: number) => {
        window.open(`/event/${eventId}`, '_blank');
    };

    return (
        <section className="max-w-7xl p-6 bg-[#f3f3f3] shadow border border-gray-200 max-h-[65vh] mb-3 overflow-y-auto">
            {/* Header */}
            <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold text-blue-800 mb-2">{majorTimeline?.name}</h2>
                <p className="text-gray-600 italic mb-2 font-medium">
                    {majorTimeline?.startYear} → {majorTimeline?.endYear}
                </p>
                <p className="text-gray-700 font-medium">{majorTimeline?.description}</p>
            </div>

            <div className="overflow-x-auto border-t border-gray-300 pt-4">
                <div className="flex min-w-[800px] space-x-4 mb-8">
                    {years.map((year) => (
                        <div key={year} className="relative flex flex-col items-center w-64 min-h-[200px]">

                            {/* Vertical Timeline */}
                            <div
                                className="absolute top-0 bottom-5 left-1/2 transform -translate-x-1/2 w-[1px] z-0"
                                style={{
                                    background: 'repeating-linear-gradient(to bottom, #7678e1 0 2px, transparent 2px 5px)',
                                    backgroundSize: '1px 3px'
                                }}
                            />
                            {events[year]?.map((event) => (
                                <div
                                    key={event.id}
                                    className="relative cursor-pointer flex flex-col items-center z-10 w-full mb-6"
                                >
                                    {/* Box event */}
                                    <Tooltip title={event.title}>
                                        <div
                                            className="bg-white flex text-left rounded py-1 min-w-42 max-w-42 h-[55px] text-xs shadow-md cursor-pointer"
                                            onClick={() => handleEventClick(event.id)}
                                        >
                                            <div className="flex items-center h-full">
                                                {event.thumbnail && (
                                                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                                                        <img
                                                            src={event.thumbnail}
                                                            alt={event.title}
                                                            className="w-10 h-10 object-cover rounded-sm"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="ml-2 mr-1 flex flex-col justify-center">
                                                <p className="font-semibold text-[#5a00ff]">
                                                    {new Date(event.eventTime).toLocaleDateString('vi-VN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                                <p className="mt-0 font-medium text-[11px]">
                                                    {event.title!.length > TITLE_MAX_LENGTH
                                                        ? event.title!.substring(0, TITLE_MAX_LENGTH) + '...'
                                                        : event.title}
                                                </p>
                                            </div>
                                        </div>
                                    </Tooltip>
                                </div>
                            ))}

                            {/* Chấm tròn và năm */}
                            <div className="relative z-10 mt-auto flex flex-col items-center">
                                {/* Chấm tròn trên năm */}
                                <div className="w-3 h-3 rounded-full bg-[#5a00ff] border-2 border-white shadow"></div>

                                {/* Năm */}
                                <p className="text-md font-semibold text-gray-500">{year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
                <Button
                    onClick={handlePrev}
                    disabled={pageIndex === 0}
                    className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    Previous
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={pageIndex >= totalPages - 1}
                    className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    Next
                </Button>
            </div>
        </section>
    );
};

export default Timeline;

