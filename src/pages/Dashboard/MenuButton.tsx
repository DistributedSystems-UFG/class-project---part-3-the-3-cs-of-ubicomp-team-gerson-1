import { Button, Typography, useTheme } from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import FlashlightOffIcon from "@mui/icons-material/FlashlightOff";
import FlashlightOnIcon from "@mui/icons-material/FlashlightOn";

const IconMap = {
  temperature: <DeviceThermostatIcon fontSize="large" color="primary" />,
  "led-off": <FlashlightOffIcon fontSize="large" color="primary" />,
  "led-on": <FlashlightOnIcon fontSize="large" color="primary" />,
  logout: <DeviceThermostatIcon fontSize="large" color="primary" />,
};

type MenuButtonProps = {
  id: string;
  icon: "temperature" | "led-off" | "led-on" | "logout";
  label: string;
  onToggle: () => void;
  state?: boolean;
};

export default function MenuButton({
  id,
  icon,
  label,
  onToggle,
  state,
}: MenuButtonProps) {
  const theme = useTheme();

  return (
    <Button
      style={{
        width: 150,
        height: 100,
        margin: 10,
        backgroundColor: state ? "#39C9C9" : theme.palette.background.default,
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      variant="contained"
      disableElevation
      onClick={() => onToggle()}
    >
      {IconMap[icon]}
      <Typography variant="button" color="primary">
        {label}
      </Typography>
    </Button>
  );
}
