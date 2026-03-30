import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config/config";
import toast from "react-hot-toast";
export const useLogout = () => {
    
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const postLogout = async () => {
        const response = await axios.post(`${BASE_URL}/logout`, {}, {
            withCredentials: true
        });

        return response.data;
    }
    const LogoutMutation = useMutation({
        mutationFn: postLogout,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.removeQueries(['me']);
            navigate('/')
        }
    });

    return LogoutMutation.mutate;

}