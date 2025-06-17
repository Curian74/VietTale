import { Button } from '../ui/button';
import { Tooltip } from '@mui/material';
import type { MajorTimeline } from '../../types/majorTimeline';
import { useEffect, useRef } from 'react';
import figure_detail from '../../assets/images/figure/figure_detail.jpg'

const TITLE_MAX_LENGTH = 35;
const SCROLL_SPEED = 1.5;

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

    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    // Scroll effect for events
    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;

        const handleMouseDown = (e: MouseEvent) => {
            isDragging.current = true;
            startX.current = e.pageX - slider.offsetLeft;
            scrollLeft.current = slider.scrollLeft;
            slider.classList.add('cursor-grabbing');
        };

        const handleMouseLeave = () => {
            isDragging.current = false;
            slider.classList.remove('cursor-grabbing');
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            slider.classList.remove('cursor-grabbing');
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX.current) * SCROLL_SPEED;
            slider.scrollLeft = scrollLeft.current - walk;
        };

        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mouseleave', handleMouseLeave);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mousemove', handleMouseMove);

        return () => {
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mouseleave', handleMouseLeave);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section
            className="relative max-w-7xl p-0 mb-3 border border-gray-200 shadow bg-cover bg-center"
            style={{ backgroundImage: `url(${figure_detail})` }}
        >
            <div className="absolute inset-0 bg-[#efefef]/85 z-0 pointer-events-none"></div>

            <div className="relative z-10 max-h-[65vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-[#f8b560] p-0 font-semibold">
                    <div className="flex flex-col justify-center items-center text-black">
                        <h2 className="text-[14px] py-3">{majorTimeline?.name}</h2>
                        {/* <p className="italic text-[14px]">
                            {majorTimeline?.startYear} → {majorTimeline?.endYear}
                        </p> */}
                        <p className="text-gray-700 font-medium">{majorTimeline?.description}</p>
                    </div>
                </div>

                <div ref={scrollRef} className="overflow-x-auto border-t border-gray-300 pt-4 select-none px-6">
                     <div className="flex min-w-[800px] space-x-4 mb-8">
                        {years.map((year) => (
                            <div key={year} className="relative flex flex-col items-center w-64 min-h-[200px]">
                                <div
                                    className="absolute top-0 bottom-5 left-1/2 transform -translate-x-1/2 w-[1px] z-0"
                                    style={{
                                        background: 'repeating-linear-gradient(to bottom, #c38f4c 0 2px, transparent 2px 5px)',
                                        backgroundSize: '1px 3px',
                                    }}
                                />
                                {events[year]?.map((event) => (
                                    <div key={event.id} className="relative cursor-pointer flex flex-col items-center z-10 w-full mb-6">
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
                                                    <p className="font-semibold text-[#bd843a]">
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
                                <div className="relative z-10 mt-auto flex flex-col items-center">
                                    <div className="w-3 h-3 rounded-full bg-[#c38f4c] border-2 border-white shadow"></div>
                                    <p className="text-md font-semibold text-gray-500">{year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between mt-3 px-6 pb-6">
                    <Button
                        onClick={handlePrev}
                        className="px-4 py-2 bg-[#817b7b] text-white rounded hover:bg-[#585353] disabled:opacity-50"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={pageIndex >= totalPages - 1}
                        className="px-4 py-2 bg-[#817b7b] text-white rounded hover:bg-[#585353] disabled:opacity-50"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </section>

    );
};

export default Timeline;

