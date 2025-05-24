import { useEffect, useState } from "react";
import HistoryFigureSearch from "./historyFigureSearch";
import type { HistoricalFigure } from "@/types/historicalFigure";
import HistoricalFigureList from "./historicalFigureList";
import HistoricalFigureDetail from "./historicalFigureDetail";

const HistoryFigure = () => {
    const [figures, setFigures] = useState<HistoricalFigure[]>([]);
    const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);

    useEffect(() => {
        if (figures.length > 0) {
            setSelectedFigure(figures[0]);
        } else {
            setSelectedFigure(null);
        }
    }, [figures]);

    return (
        <main>
            <h1 className='text-center text-3xl font-medium mb-8'>NHÂN VẬT LỊCH SỬ</h1>
            <div className='flex flex-col md:flex-row gap-6 md:gap-10 ml-3 md:ml-5'>
                {/* Left Side Content */}
                <div className="flex flex-col">
                    <HistoryFigureSearch onResults={setFigures} />
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
