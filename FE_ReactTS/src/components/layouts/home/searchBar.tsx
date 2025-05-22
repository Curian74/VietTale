
const SearchBar = () => {

    return (
        <section className="bg-[#f3f3f3] w-50 h-fit pb-8 border">
            {/* Title */}
            <div className="bg-[#193cb8] p-2 font-medium text-start">
                <p className="text-white">Tìm kiếm</p>
            </div>

            {/* Content */}
            <div className="flex flex-col px-4">
                <div>
                    <p className="font-medium my-2 text-sm">Chủ đề</p>
                    <select className="bg-white py-1 w-full border cursor-pointer">
                        <option value={''}>Tìm kiếm chủ đề</option>
                    </select>
                </div>

                <div>
                    <p className="font-medium my-2 text-sm">Thẻ tag</p>
                    <select className="bg-white py-1 w-full border cursor-pointer">
                        <option value={''}>Thẻ tag</option>
                    </select>
                </div>

                <div className="flex justify-center mt-4">
                    <button className="bg-[#417185] rounded p-2 text-white font-medium cursor-pointer">
                        Tìm kiếm
                    </button>
                </div>

            </div>
        </section>
    )
}

export default SearchBar
