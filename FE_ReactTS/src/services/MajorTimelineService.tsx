
import axios from "../configs/axios"

const getPagedAsync = async (pageIndex: number, pageSize: number, majorTimeLineId?: number | string) => {
    const params = new URLSearchParams();
    params.append('PageSize', pageSize.toString());
    params.append('PageIndex', pageIndex.toString());

    if (majorTimeLineId !== undefined && majorTimeLineId !== '') {
        params.append('MajorTimelineId', majorTimeLineId.toString());
    }

    const response = await axios.get(`MajorTimeline/Paged?${params.toString()}`);
    return response.data;
};

const getAllAsync = async () => {
    const response = await axios.get(`MajorTimeline/GetAll`);
    return response.data;
}

const MajorTimelineService = {
    getPagedAsync,
    getAllAsync
}

export default MajorTimelineService;