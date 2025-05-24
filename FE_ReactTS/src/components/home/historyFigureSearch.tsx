
const HistoryFigureSearch = () => {
    return (
        <section>
            <div className="bg-white p-4">
                <div className="relative w-full">
                    <input
                        placeholder="Search..."
                        className="w-full border py-2 pr-10 pl-3 rounded"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
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
