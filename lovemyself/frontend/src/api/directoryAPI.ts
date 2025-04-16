// 📁 src/api/directoryAPI.ts
import axios from 'axios';
import { DirectorySavePayload } from '../types/directoryTypes';

export const saveDirectories = async (payload: DirectorySavePayload) => {
    const response = await axios.post('/find/directories/update', payload);
    return response.data;
};
