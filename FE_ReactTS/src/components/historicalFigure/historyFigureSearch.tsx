import historicalFigureService from "@/services/historicalFigureService";
import type { HistoricalFigure } from "@/types/historicalFigure";
import { useEffect, useState } from "react";
import CustomCircularLoading from "../layouts/CustomCircularLoading";

interface HistoryFigureSearchProps {
    onResults: (data: HistoricalFigure[]) => void;
}

const HistoryFigureSearch = ({ onResults }: HistoryFigureSearchProps) => {

    const [nameInput, setNameInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const handleSearch = async () => {
        try {
            const data = await historicalFigureService.getAllHistoricalFiguresAsync(nameInput);
            onResults(data);
            setIsLoading(false);
        }

        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [nameInput])

    if (isLoading) {
        return <CustomCircularLoading/>
    }

    return (
        <section className="border">
            <div className="bg-white p-0">
                {/* Search Bar */}
                <div className="relative w-full">
                    <input
                        placeholder="Search..."
                        type="text"
                        onChange={(e) => setNameInput(e.target.value)}
                        className="w-full py-2 pr-10 pl-3 rounded"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </div>
            </div>
        </section>
    )
}

export default HistoryFigureSearch
