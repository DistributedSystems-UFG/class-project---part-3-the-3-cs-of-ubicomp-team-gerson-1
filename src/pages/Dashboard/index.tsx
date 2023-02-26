import React, { useEffect } from "react";

import { Box, Button, Typography, useTheme } from "@mui/material";

import Header from "./Header";
import MenuButton from "./MenuButton";

import { useMutation } from "react-query";

import api from "../../services/api";
import useDevices from "../../query/useDevices";

import withAuth from "../../hoc/withAuth";
import Temperature from "./Temperature";

import CachedIcon from "@mui/icons-material/Cached";
import { toast } from "react-toastify";

export function Dashboard() {
  const theme = useTheme();
  const [checkPairs, setCheckPairs] = React.useState<any>({});

  const { data, refetch } = useDevices();

  const blink = useMutation(
    async (params: any) =>
      await api.patch(`/blink/${params.id}/${params.state}`),
    {
      onSuccess: (data, variables, context) => {
        setCheckPairs({
          ...checkPairs,
          [variables.id]: checkPairs[variables.id] === "ON" ? "OFF" : "ON",
        });
      },
      onError: () => {
        toast.error("Não foi possível acessar o dispositivo informado!");
      },
    }
  );

  useEffect(() => {
    if (data) {
      let pair: any = {};
      data.devices.forEach((device: any) => {
        pair[device.id] = device.state;
      });
      setCheckPairs(pair);
    }
  }, [data]);

  const handleToggle = (value: string) => {
    blink.mutate({
      id: value,
      state: checkPairs[value] === "ON" ? "OFF" : "ON",
    });
  };

  function hasTemperatureSensorAndIsTurnedOn() {
    if (data) {
      for (const device of data.devices) {
        if (device.type === "SENSOR" && device.state === "ON") {
          return true;
        }
      }
    }
    return false;
  }

  function getIcon(device: any) {
    if (device.type === "LED") {
      return checkPairs[device.id] === "ON" ? "led-on" : "led-off";
    }
    return "temperature";
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",

        backgroundColor: theme.palette.background.default,
      }}
    >
      <Header />
      <Box ml={6} mt={5} display="flex" flexWrap="wrap">
        <Typography variant="h4" gutterBottom>
          Dispositivos acessíveis
        </Typography>
        <Box ml={3}>
          <Button
            onClick={() => refetch()}
            variant="outlined"
            startIcon={<CachedIcon />}
          >
            Atualizar dados
          </Button>
        </Box>
      </Box>
      <Box ml={5} display="flex" flexWrap="wrap">
        {data?.devices.map((device: any) => (
          <MenuButton
            key={device.id}
            icon={getIcon(device)}
            id={device.id}
            label={device.name}
            onToggle={() => handleToggle(device.id)}
            state={checkPairs[device.id] === "ON"}
          />
        ))}
      </Box>
      {hasTemperatureSensorAndIsTurnedOn() && <Temperature />}
    </Box>
  );
}

export default withAuth(Dashboard);
