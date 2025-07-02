import { Search } from 'lucide-react'

const LatestPageSearchBar = () => {
    return (
        <div className="flex items-center bg-[#f6f7fb] border-none rounded-md px-3 py-2 md:w-3/4 w-full mb-4">
            <Search size={25} className="text-gray-400 mr-2" />
            <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full focus:outline-none text-md font-medium border-none text-gray-700 placeholder:text-gray-400"
            />
        </div>

    )
}

export default LatestPageSearchBar
