import { useQuery } from "react-query";
import api from "../services/api";

export const useUsers = () => {
  const QUERY_KEY = "users";

  const response = useQuery(QUERY_KEY, async () => {
    const response = await api.get("/users");
    return response.data;
  });

  return response;
};

export default useUsers;
