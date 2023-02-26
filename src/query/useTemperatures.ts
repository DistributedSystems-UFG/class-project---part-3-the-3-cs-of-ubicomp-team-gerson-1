import { useQuery } from "react-query";
import api from "../services/api";

export const useTemperatures = () => {
  const QUERY_KEY = "temperatures";

  const response = useQuery(QUERY_KEY, async () => {
    const response = await api.get("/temperatures");
    return response.data;
  });

  return response;
};

export default useTemperatures;
