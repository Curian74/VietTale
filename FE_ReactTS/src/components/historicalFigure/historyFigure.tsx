import { useState } from "react";
import HistoryFigureSearch from "./historyFigureSearch";
import type { HistoricalFigure } from "@/types/historicalFigure";
import HistoricalFigureList from "./historicalFigureList";
import HistoricalFigureDetail from "./historicalFigureDetail";
import DashedLine from "../ui/dashedLine";

const HistoryFigure = () => {
    const [figures, setFigures] = useState<HistoricalFigure[]>([]);
    const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);

    const handleSearchResults = (results: HistoricalFigure[]) => {
        setFigures(results);

        if (!selectedFigure && results.length > 0) {
            setSelectedFigure(results[0]);
        }
    };

    return (
        <main>
            <div className="text-center mb-4">
                <h1 className="text-3xl font-medium uppercase mb-2">NHÂN VẬT LỊCH SỬ</h1>
                <DashedLine />
            </div>

            <div className='flex flex-col md:flex-row gap-6 md:gap-10 ml-3 md:ml-8'>
                {/* Left Side Content */}
                <div className="flex flex-col w-70">
                    <HistoryFigureSearch onResults={handleSearchResults} />
                    <HistoricalFigureList
                            selectedFigure={selectedFigure}
                            figures={figures}
                            onSelectFigure={setSelectedFigure} />

                </div>

                {/* Right Side Content */}
                <div className="w-3/4 h-[58vh]">
                    {selectedFigure && (
                        <HistoricalFigureDetail selectedFigure={selectedFigure} />
                    )}
                </div>
            </div>
        </main>
    );
};

export default HistoryFigure;
