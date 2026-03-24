import axios from 'axios';
import { BASE_URL } from '../config/ServerUrlConfig';
import { useQuery } from '@tanstack/react-query';
export const userAuth = () => {
    const getUser = async () => {
        const response = await axios.get(`${BASE_URL}/deliverypartner/me`, {
            withCredentials: true
        });
        return response.data;
    };

    return useQuery({
        queryKey: ['deliveryuser'],
        queryFn: getUser
    })
}