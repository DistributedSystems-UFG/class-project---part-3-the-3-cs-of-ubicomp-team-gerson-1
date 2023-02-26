import { Avatar, Box, Typography } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import useMe from "../../query/useMe";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import authAtom from "../../store/auth";

function Header() {
  const { data } = useMe();
  const [token, setToken] = useAtom(authAtom);

  const navigate = useNavigate();

  return (
    <Box
      style={{
        backgroundColor: "#5636d3",
        height: 96,
        width: "100%",
        padding: 24,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Box
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        <Box
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: "#ff872c",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <Avatar src="https://mui.com/static/images/avatar/1.jpg" />
        </Box>
        <Typography variant="button" style={{ color: "#fff" }}>
          Olá, {data?.name}
        </Typography>
      </Box>
      <Box ml={10} display="flex">
        {data?.type === "ADMIN" && (
          <Box onClick={() => navigate("/users")}>
            <PersonIcon style={{ cursor: "pointer", color: "white" }} />
          </Box>
        )}
        <Box
          onClick={() => {
            setToken(undefined);
            navigate("/users");
          }}
          ml={3}
        >
          <LogoutIcon style={{ cursor: "pointer", color: "white" }} />
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
