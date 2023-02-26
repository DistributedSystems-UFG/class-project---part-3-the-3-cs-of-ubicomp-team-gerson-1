import { useQuery } from "react-query";
import api from "../services/api";

export const useMe = () => {
  const QUERY_KEY = "me";

  const response = useQuery(QUERY_KEY, async () => {
    const response = await api.get("/auth/me");
    return response.data;
  });

  return response;
};

export default useMe;
