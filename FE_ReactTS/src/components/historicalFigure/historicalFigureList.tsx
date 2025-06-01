import type { HistoricalFigure } from '@/types/historicalFigure'

interface HistoricalFigureListProps {
    figures: HistoricalFigure[];
    selectedFigure: HistoricalFigure | null;
    onSelectFigure: (figure: HistoricalFigure) => void;
}

const HistoricalFigureList = ({ figures, selectedFigure, onSelectFigure }: HistoricalFigureListProps) => {
    return (
        <div>
            <div className="bg-[#fdf6ea] overflow-y-auto h-96 border">
                {figures.map((c) => (
                    <div
                        key={c.id}
                        onClick={() => onSelectFigure(c)}
                        className={`flex items-center gap-3 md:gap-5 border-b-2 text-sm px-3 py-2 cursor-pointer 
                            ${selectedFigure?.id === c.id ? 'bg-[#f9eeda]' : ''}`}
                    >
                        <img
                            className="rounded-full object-cover h-15 w-fit"
                            src={c.avatar}
                            alt="Image"
                        />
                        <p className="font-[400]">{c.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoricalFigureList;
