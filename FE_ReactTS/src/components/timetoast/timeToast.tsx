import MajorTimelineService from "@/services/majorTimelineService";
import type { MajorTimeline } from "@/types/majorTimeline";
import { useEffect, useState } from "react";
import SearchBar from "../home/searchBar";
import CustomCircularLoading from "../layouts/CustomCircularLoading";
import Timeline from "../timeline";

const PAGE_SIZE = 1;

const TimeToast = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [majorTimeLine, setMajorTimeLine] = useState<MajorTimeline | null>(null);
    const [years, setYears] = useState<number[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [selectedTimelineId, setSelectedTimelineId] = useState<number | string>();

    const fetchMajorTimeline = async () => {
        try {
            const data = await MajorTimelineService.getPagedAsync(pageIndex + 1, PAGE_SIZE, selectedTimelineId);

            const item: MajorTimeline = data.items[0];
            setMajorTimeLine(item);

            const yearsTemp = item?.events.map((x) => new Date(x.eventTime).getFullYear()) || [];
            const uniqueYears = Array.from(new Set(yearsTemp)).sort((a, b) => a - b);
            setYears(uniqueYears);

            setTotalPages(Math.ceil(data.totalPages / PAGE_SIZE));
            setIsLoading(false);

        } catch (err) {
            console.error(err);
        }
    };

    const clearFilters = () => {
        setSelectedTimelineId(undefined);
        setPageIndex(0);
    }

    const handleSearchChange = (id: number | string) => {
        setSelectedTimelineId(id);
        console.log(id);
    };

    const eventsByYear: Record<number, MajorTimeline['events']> = {};
    if (majorTimeLine) {
        for (const year of years) {
            eventsByYear[year] = majorTimeLine.events
                .filter((e) => new Date(e.eventTime).getFullYear() === year)
                .sort((a, b) => new Date(a.eventTime).getTime() - new Date(b.eventTime).getTime());
        }
    }

    const handlePrev = () => {
        if (pageIndex > 0) setPageIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        if (pageIndex < totalPages - 1) setPageIndex((prev) => prev + 1);
    };

    useEffect(() => {
        fetchMajorTimeline();
    }, [pageIndex, selectedTimelineId]);

    if (isLoading) {
        return <CustomCircularLoading />
    }

    return (
        <>
            <section className='flex flex-col md:flex-row gap-2 md:gap-10 ml-2'>
                <SearchBar
                    selectedTimelineId={selectedTimelineId}
                    onClearFilters={clearFilters}
                    onSearchChange={handleSearchChange}
                />

                <Timeline
                    events={eventsByYear}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    majorTimeline={majorTimeLine}
                    pageIndex={pageIndex}
                    totalPages={totalPages}
                    years={years}
                    onLoadComplete={() => setIsLoading(false)}
                />
            </section>
        </>

    )
}

export default TimeToast
