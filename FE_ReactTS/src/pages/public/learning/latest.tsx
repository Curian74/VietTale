import LearningSidebar from "@/components/learning/learningSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LatestPageSearchBar from "@/components/learning/latestPageSearchBar";
import PopularFlashcard from "@/components/learning/popularFlashcard";

const Latest = () => {
    return (
        <>
            <Header />

            {/* Wrapper */}
            <div className="flex flex-col md:flex-row bg-white min-h-screen">
                <LearningSidebar />

                <main className="flex-1 md:ml-70 p-6">
                    {/* Gói riêng để căn giữa thanh search */}
                    <div className="flex justify-center mb-4">
                        <LatestPageSearchBar />
                    </div>

                    <div className="max-w-[80vw]">
                        <PopularFlashcard />
                    </div>
                </main>

            </div>

            <Footer />
        </>

    );
};

export default Latest;
