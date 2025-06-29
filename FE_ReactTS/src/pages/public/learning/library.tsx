import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import LearningSidebar from "@/components/learning/learningSidebar"
import lessonService from "@/services/lessonService"
import { useAuth } from "@/contexts/AuthProvider"
import type { Lesson } from "@/types/lesson"
import { useNavigate } from "react-router"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import userAvatar from "@/assets/images/user/defaultAvatar.jpg";

const sortBy = "LastActive";

const PAGE_SIZE = 1;

export default function Library() {
  const [activeTab, setActiveTab] = useState("Học phần")
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDescending, setIsDescending] = useState(true);

  const tabs = ["Học phần"];

  const getSavedLessons = async () => {
    try {
      const query = {
        pageIndex: pageIndex,
        pageSize: PAGE_SIZE,
        name: searchTerm,
        sortBy: sortBy,
        isDescending: isDescending,
      }
      const data = await lessonService.getSavedLesson(user?.id!, query);
      setLessons(data.items);
      setTotalPages(data.totalPages);
    }

    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageIndex]);

  useEffect(() => {
    getSavedLessons();
  }, [user?.id, searchTerm, isDescending, pageIndex])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white p-6 md:ml-70">
        <LearningSidebar />
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Thư viện của bạn</h1>

          {/* Navigation Tabs */}
          <div className="flex space-x-8 mb-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium transition-colors ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filter and Search Row */}
          <p className="text-gray-900 text-md mb-2">Lọc theo</p>
          <div className="flex items-center justify-between gap-5 md:gap-0 mb-8">
            <Select
              value={isDescending ? "recent" : "oldest"}
              onValueChange={(value) => setIsDescending(value === "recent")}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Gần đây</SelectItem>
                <SelectItem value="oldest">Cũ nhất</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Tìm kiếm thẻ ghi nhớ"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
          </div>

          {/* Today Section */}
          <div className="mb-6">
            <div className="mb-3">
              <div className="text-md font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Học phần đã lưu
              </div>
              <div>
                <hr></hr>
              </div>
            </div>

            {/* Study Set Card */}
            {lessons.length > 0
              ? lessons.map((x) => (
                <Card
                  key={x.id}
                  onClick={() => navigate(`/learning/lesson/${x.id}`)}
                  className="bg-white border-b-4 shadow-sm border-t-4
                 border-transparent hover:border-blue-300 transition-all cursor-pointer my-5 py-0">
                  <CardContent className="px-6 py-3 border-t-gray-200 rounded-md border-t-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-gray-600">{x.numberOfQuestions} thuật ngữ</span>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 flex items-center justify-center">
                              <img
                                src={x.user?.avatar || userAvatar}
                                className="w-5 h-5 text-white rounded-full" />
                            </div>
                            <span className="text-sm font-semibold text-gray-600">{x.user?.userName}</span>
                            {/* <Badge variant="secondary" className="text-xs">
                            Giáo viên
                          </Badge> */}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{x.name}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
              :
              <p className="text-xl font-semibold text-gray-800">Không tìm thấy học phần nào.</p>
            }
          </div>
        </div>
        <div className="text-center">
          <Pagination>
            <PaginationContent>

              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
                  className={pageIndex === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {/* Danh sách các trang */}
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={pageIndex === i + 1}
                    onClick={() => setPageIndex(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* Next */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPageIndex((prev) => Math.min(prev + 1, totalPages))}
                  className={pageIndex === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>


        </div>
      </div>
      <Footer />
    </>
  )
}
