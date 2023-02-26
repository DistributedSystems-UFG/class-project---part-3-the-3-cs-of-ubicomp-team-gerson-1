import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useTemperature from "../../query/useTemperature";
import useTemperatures from "../../query/useTemperatures";

import CachedIcon from "@mui/icons-material/Cached";

function calculateInfo(arr: number[]) {
  const mean =
    arr.reduce((acc: number, curr: number) => {
      return acc + curr;
    }, 0) / arr.length;

  arr = arr.map((k: number) => {
    return (k - mean) ** 2;
  });

  const sum = arr.reduce((acc, curr) => acc + curr, 0);

  const variance = sum / arr.length;

  return {
    mean,
    variance,
    dev: Math.sqrt(variance),
  };
}

const Temperature: React.FC = () => {
  const { data: temperatures, refetch: refetchAllTemperatures } =
    useTemperatures();
  const { data: temperature, refetch: refetchLastTemperature } =
    useTemperature();

  const refetchAll = () => {
    refetchAllTemperatures();
    refetchLastTemperature();
  };

  const getData = () => {
    if (temperatures && temperatures?.temperatures.length > 0) {
      return calculateInfo(
        temperatures.temperatures.map((tmp: any) => tmp.temperature)
      );
    }
    return {
      mean: 0,
      variance: 0,
      dev: 0,
    };
  };
  return (
    <>
      <Box ml={6} mt={5} display="flex" flexWrap="wrap">
        <Typography variant="h4" gutterBottom>
          Monitoramento de temperatura
        </Typography>
        <Box ml={3}>
          <Button
            onClick={() => refetchAll()}
            variant="outlined"
            startIcon={<CachedIcon />}
          >
            Atualizar dados
          </Button>
        </Box>
      </Box>
      <Box mt={2} display="flex" flexWrap="wrap">
        <ResponsiveContainer width={600} height={300}>
          <LineChart
            width={500}
            height={300}
            data={
              temperatures
                ? temperatures.temperatures.map((temp: any) => {
                    return {
                      Temperatura: Math.round(temp.temperature * 100) / 100,
                      Data: format(
                        new Date(temp.created_at),
                        "yyyy-MM-dd HH:mm:ss"
                      ),
                    };
                  })
                : []
            }
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={false} dataKey="Data" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Temperatura"
              stroke="#5636D3"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        <Box mt={1} ml={2} flexDirection={"column"} display="flex">
          <Box display="flex">
            <Box width={150}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Desvio Padrão
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {Math.round(getData().dev * 100) / 100}°C
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box ml={3} width={150}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Média
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {Math.round(getData().mean * 100) / 100}°C
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box mt={3} display="flex">
            <Box width={150}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Variância
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {Math.round(getData().variance * 100) / 100}°C
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box width={180} ml={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Última temperatura
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {Math.round(
                      (temperature ? temperature.temperature : 0) * 100
                    ) / 100}
                    °C
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Temperature;
