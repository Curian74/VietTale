import axios from '@/configs/axios';

const eventService = {
  async getById(id: number | string) {
    const response = await axios.get(`Event/GetEvent/${id}`);
    return response.data;
  },
};

export default eventService;