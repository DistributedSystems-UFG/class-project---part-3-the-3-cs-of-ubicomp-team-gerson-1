import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAtom } from "jotai";
import authAtom from "../../store/auth";

function Login() {
  const navigate = useNavigate();

  const [token, setToken] = useAtom(authAtom);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      api.defaults.headers["Authorization"] = token;
      navigate("/");
    }
  }, [token]);

  const handleSubmit = async () => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    setToken(response.data.token);
  };

  return (
    <Container maxWidth="sm">
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Stack spacing={2}>
          <Box textAlign="center">
            <Typography variant="h5" color="primary">
              Login
            </Typography>
          </Box>
          <Box>
            <Stack spacing={3}>
              <TextField
                label="E-mail"
                variant="outlined"
                type="text"
                name="email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                InputProps={{
                  startAdornment: <AccountCircle color="primary" />,
                }}
              />
              <TextField
                label="Senha"
                variant="outlined"
                fullWidth
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                InputProps={{
                  startAdornment: <Lock color="primary" />,
                }}
              />
            </Stack>
          </Box>
          <Box textAlign="center">
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleSubmit}
            >
              Entrar
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}

export default Login;
