import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

export const getAll = async () => {
    const request = await axios.get(baseUrl);
    return request.data;
};

