import HistoryFigureSearch from "./historyFigureSearch"

const HistoryFigure = () => {
    return (
        <main>
            <h1 className='text-center text-3xl font-medium mb-8'>NHÂN VẬT LỊCH SỬ</h1>
            <div className='flex flex-col md:flex-row items-center gap-10'>
                <HistoryFigureSearch/>
            </div>
        </main>
    )
}

export default HistoryFigure
