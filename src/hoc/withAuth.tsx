import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import authAtom from "../store/auth";

const withAuth = (Component: any) => {
  return () => {
    const [token, _] = useAtom(authAtom);
    const navigate = useNavigate();
    if (!token) {
      navigate("/auth/login");
      return <div></div>;
    }
    api.defaults.headers["Authorization"] = token;
    return <Component />;
  };
};

export default withAuth;
