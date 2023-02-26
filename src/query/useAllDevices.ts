import { useQuery } from "react-query";
import api from "../services/api";

export const useAllDevices = () => {
  const QUERY_KEY = "all_devices";

  const response = useQuery(QUERY_KEY, async () => {
    const response = await api.get("/devices/all");
    return response.data;
  });

  return response;
};

export default useAllDevices;
