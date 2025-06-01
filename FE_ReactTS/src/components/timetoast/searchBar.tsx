import MajorTimelineService from "@/services/majorTimelineService";
import type { MajorTimeline } from "../../types/majorTimeline"
import { useEffect, useState } from "react"

interface SearchBarProps {
    onSearchChange: (selectedId: number | string) => void;
    onClearFilters: () => void;
    selectedTimelineId?: number | undefined | string;
}

const SearchBar = ({ onSearchChange, onClearFilters, selectedTimelineId }: SearchBarProps) => {

    const [majorTimelines, setMajorTimelines] = useState<MajorTimeline[]>([]);

    const fetchMajorTimelines = async () => {
        try {
            const data = await MajorTimelineService.getAllAsync();
            setMajorTimelines(data);
        }

        catch (err) {

        }
    }

    useEffect(() => {
        fetchMajorTimelines();
    }, [])

    return (
        <aside className="bg-[#f3f3f3] ml-1 w-56 max-h-[65vh] pb-60 border">
            {/* Title */}
            <div className="bg-[#193cb8] p-2 font-medium text-start">
                <p className="text-white">Tìm kiếm</p>
            </div>

            {/* Content */}
            <div className="flex flex-col px-2">
                <div>
                    <p className="font-medium my-2 text-sm">Chủ đề</p>
                    {/* Goi ham update timeline khi change */}
                    <select
                        value={selectedTimelineId ?? ''}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="bg-white py-1 w-full border cursor-pointer">
                        <option value={''}>Tìm kiếm chủ đề</option>
                        {majorTimelines.map((m) => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <p className="font-medium my-2 text-sm">Thẻ tag</p>
                    <select className="bg-white py-1 w-full border cursor-pointer">
                        <option value={''}>Thẻ tag</option>
                    </select>
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClearFilters}
                        className="bg-[#d84545] hover:bg-[#c82333] rounded p-2 text-white font-medium cursor-pointer">
                        Xóa bộ lọc
                    </button>
                </div>

            </div>
        </aside>
    )
}

export default SearchBar
