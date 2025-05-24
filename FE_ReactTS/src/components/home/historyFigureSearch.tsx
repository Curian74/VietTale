
const HistoryFigureSearch = () => {

    const fakeData = [
        {
            id: 1,
            imgUrl: 'https://i.pinimg.com/736x/7e/72/69/7e7269646f0080e9180be248faf0a3b0.jpg',
            name: 'An toàng hoàng hậu'
        },

        {
            id: 2,
            imgUrl: 'https://i.pinimg.com/736x/84/fc/10/84fc1029a889dd5f48bad8a49bd5bd95.jpg',
            name: 'An tư công chúa'
        },

        {
            id: 3,
            imgUrl: 'https://i.pinimg.com/736x/85/c1/0f/85c10f17fbf37ccaf3e9098005fd49ea.jpg',
            name: 'Âu cơ'
        },
    ]

    return (
        <section className="border">
            <div className="bg-white p-0">
                {/* Search Bar */}
                <div className="relative w-full">
                    <input
                        placeholder="Search..."
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

                {/* Figure List */}
                <div className="bg-[#fdf6ea]">
                    {fakeData.map((c) => (
                        <div className="flex items-center gap-3 md:gap-5 border-b-2 text-sm px-3 py-2">
                            <img
                                className="rounded-full object-cover h-15 w-fit"
                                src={c.imgUrl}
                                alt="Image" />
                            <p className="font-[400]">{c.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}

export default HistoryFigureSearch
