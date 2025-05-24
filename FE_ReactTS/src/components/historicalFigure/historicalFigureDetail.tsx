import type { HistoricalFigure } from "@/types/historicalFigure"

interface HistoricalFigureDetailProps {
  selectedFigure: HistoricalFigure;
}

const HistoricalFigureDetail = ({ selectedFigure }: HistoricalFigureDetailProps) => {
  return (
    <div className="relative w-full h-full overflow-y-scroll">
      <div
        className="relative min-h-full p-6 border shadow-lg 
               bg-[url('https://sontungauto.vn/wp-content/uploads/2023/07/67ae818b53306f97b8f89c7a728a8053.jpg')] 
               bg-cover bg-center text-black"
      >
        {/* Overlay trắng mờ */}
        <div className="absolute inset-0 bg-[#efefef]/85 z-0"></div>

        {/* Content */}
        <div className="relative z-10 space-y-4">
          <h2 className="text-2xl font-semibold">{selectedFigure.name}</h2>
          <p className="text-sm">{selectedFigure.description}</p>
        </div>
      </div>
    </div>

  )
}

export default HistoricalFigureDetail
