import React, { useState } from "react";

const CreateHistoricalFigure: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Tạo Nhân Vật Mới</h2>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Tên nhân vật</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Nhập tên nhân vật"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Mô tả</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Nhập mô tả chi tiết"
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Ảnh đại diện</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
                />
            </div>

            <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                onClick={() => {
                    console.log("Name:", name);
                    console.log("Description:", description);
                    console.log("Image file:", image);
                }}
            >
                Tạo nhân vật
            </button>
        </div>
    );
};

export default CreateHistoricalFigure;
