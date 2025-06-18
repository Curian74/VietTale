import { useEffect, useState, useCallback } from 'react';
import eventService from '@/services/eventService';
import CustomCircularLoading from '@/components/layouts/CustomCircularLoading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/swiper-bundle.css';
import type { Event } from '@/types/event';
import figure_detail from '../../assets/images/figure/figure_detail.jpg';

interface EventContentProps {
    id: string;
    onLoadComplete?: () => void;
}

type TabType = 'tags' | 'images';

const EventContent = ({ id, onLoadComplete }: EventContentProps) => {
    const [event, setEvent] = useState<Event | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('tags');
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

    // Cleanup function for Swiper instances
    const cleanupSwipers = useCallback(() => {
        if (thumbsSwiper) {
            thumbsSwiper.destroy(true, true);
            setThumbsSwiper(null);
        }
        if (mainSwiper) {
            mainSwiper.destroy(true, true);
            setMainSwiper(null);
        }
    }, [thumbsSwiper, mainSwiper]);

    // Handle tab change
    const handleTabChange = (tab: TabType) => {
        if (tab !== activeTab) {
            cleanupSwipers();
            setActiveTab(tab);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            cleanupSwipers();
        };
    }, [cleanupSwipers]);

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const data = await eventService.getById(id);
                setEvent(data);
            } catch (error: any) {
                setError(error.message || 'Unknown error');
            } finally {
                setIsLoading(false);
                onLoadComplete?.();
            }
        };
        fetchEventDetail();
    }, [id, onLoadComplete]);

    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
    if (isLoading) return <CustomCircularLoading />;
    if (!event) return null;

    // Parse YYYY-MM-DD safely
    let displayDate = '';
    if (event.eventTime) {
        const [year, month, day] = event.eventTime.split('-');
        const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
        displayDate = `Ngày ${dateObj.getDate()} tháng ${dateObj.getMonth() + 1} năm ${dateObj.getFullYear()}`;
    }

    return (
        <section
            className="relative max-w-6xl mx-auto p-0 mb-4 border border-gray-200 shadow bg-cover bg-center"
            style={{ backgroundImage: `url(${figure_detail})` }}
        >
            <div className="absolute inset-0 bg-[#efefef]/85 z-0 pointer-events-none"></div>

            <div className="relative z-10 p-6">
                <div className="mb-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-600 my-2">{event.title}</h2>
                    <p className="text-gray-600 italic mb-2 font-medium">{displayDate}</p>
                </div>

                {event.thumbnail && (
                    <div className="flex justify-center mb-4">
                        <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="w-1/2 h-auto object-cover rounded"
                        />
                    </div>
                )}

                <div className="mb-4 text-center">
                    <p className="text-gray-700 font-medium">{event.description}</p>
                </div>

                <div className="border-b border-gray-200 mb-4">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => handleTabChange('tags')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'tags'
                                    ? 'border-yellow-500 text-black'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Từ khoá
                        </button>
                        {event.eventsImages && event.eventsImages.length > 0 &&  (
                            <button
                                onClick={() => handleTabChange('images')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'images'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Hình ảnh
                            </button>
                        )}
                    </nav>
                </div>

                <div className="tab-content">
                    {activeTab === 'tags' && event.eventTags && event.eventTags.length > 0 && (
                        <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                                {event.eventTags.map((tag) => (
                                    <span key={tag.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {tag.tagName}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'images' && event.eventsImages && event.eventsImages.length > 0 && (
                        <div className="mb-8">
                            <Swiper
                                onSwiper={setMainSwiper}
                                spaceBetween={0}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[Navigation, Thumbs]}
                                className="h-[400px] mb-4 bg-gray-100 rounded-lg"
                                loop={event.eventsImages.length > 1}
                                slidesPerView={1}
                                slidesPerGroup={1}
                            >
                                {event.eventsImages.map((image) => (
                                    <SwiperSlide key={image.id}>
                                        <div className="w-full h-full flex items-center justify-center">
                                            <img
                                                src={image.url}
                                                alt={`Image for ${event.title}`}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {event.eventsImages.length > 1 && (
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={8}
                                    slidesPerView={Math.min(4, event.eventsImages.length)}
                                    watchSlidesProgress={true}
                                    modules={[Thumbs]}
                                    className="h-40"
                                    loop={event.eventsImages.length > 4}
                                    slideToClickedSlide={true}
                                    slidesPerGroup={1}
                                >
                                    {event.eventsImages.map((image) => (
                                        <SwiperSlide key={image.id} className="w-40">
                                            <div className="relative h-full rounded-lg overflow-hidden border-2 border-transparent swiper-slide-thumb-active:border-blue-500 group">
                                                <img
                                                    src={image.url}
                                                    alt={`Thumbnail for ${event.title}`}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/0 swiper-slide-thumb-active:bg-black/20 transition-colors" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 swiper-slide-thumb-active:opacity-100 transition-opacity">
                                                    <div className="w-8 h-8 rounded-full bg-blue-500/80 flex items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>

    );
};

export default EventContent; 