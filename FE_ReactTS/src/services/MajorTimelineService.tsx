
import axios from "../configs/axios"

const getPagedAsync = async (pageIndex: number, pageSize: number) => {
    const response = await axios.get(`MajorTimeline/Paged?PageSize=${pageSize}&PageIndex=${pageIndex}`);
    return response.data;
}

const MajorTimelineService = {
    getPagedAsync,
}

export default MajorTimelineService;