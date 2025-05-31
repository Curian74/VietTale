import type { HistoricalFigure } from "@/types/historicalFigure"
import figure_detail from '../../assets/images/figure/figure_detail.jpg'

interface HistoricalFigureDetailProps {
  selectedFigure: HistoricalFigure;
}

const HistoricalFigureDetail = ({ selectedFigure }: HistoricalFigureDetailProps) => {
  return (
    <div className="relative w-full h-full overflow-y-scroll">
      <div
        className="relative min-h-full p-6 border shadow-lg bg-cover bg-center text-black"
        style={{ backgroundImage: `url(${figure_detail})` }}
      >

        {/* Overlay trắng mờ */}
        <div className="absolute inset-0 bg-[#efefef]/88 z-0"></div>

        {/* Content */}
        <div className="relative z-10 space-y-3">
          <h2 className="text-2xl font-semibold">{selectedFigure.name}</h2>
          <p className="text-sm">{selectedFigure.description}</p>
        </div>
      </div>
    </div>

  )
}

export default HistoricalFigureDetail
