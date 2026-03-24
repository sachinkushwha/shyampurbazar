import axios from "axios"
import { BASE_URL } from "../config/config"
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
    const getUserData = async () => {
        const response = await axios.get(`${BASE_URL}/me`, {
            withCredentials: true
        });
        return response.data;
    }
    return useQuery({
        queryKey: ['me'],
        queryFn: getUserData
    });
}