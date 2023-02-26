import { useQuery } from "react-query";
import api from "../services/api";

export const useDevices = () => {
  const QUERY_KEY = "devices";

  const response = useQuery(
    QUERY_KEY,
    async () => {
      const response = await api.get("/devices");
      return response.data;
    },
    {
      refetchInterval: 2000,
    }
  );

  return response;
};

export default useDevices;
