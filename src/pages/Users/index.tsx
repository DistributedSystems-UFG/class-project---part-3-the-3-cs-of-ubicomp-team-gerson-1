import React, { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import withAuth from "../../hoc/withAuth";
import Header from "../Dashboard/Header";
import useUsers from "../../query/useUsers";

import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";

import useAllDevices from "../../query/useAllDevices";
import api from "../../services/api";

import { toast } from "react-toastify";

const Users: React.FC = () => {
  const theme = useTheme();

  const { data, refetch } = useUsers();

  const { data: allDevicesResponse } = useAllDevices();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [checked, setChecked] = React.useState([0]);
  const [userId, setUserId] = React.useState("0");

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const reset = () => {
    setChecked([]);
    setUserId("");
    handleClose();
    refetch();
  };

  const handleSave = async () => {
    api
      .patch(`/users/${userId}/devices`, {
        devices: checked,
      })
      .then(() => {
        toast.success("Dispositivos do usuário atualizados com sucesso!");
      })
      .catch(() => {
        toast.error("Erro ao atualizar dispositivos do usuário!");
      })
      .finally(() => reset());
  };

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
      <Box ml={3} mt={3} display="flex" flexWrap="wrap">
        <Typography variant="h4" gutterBottom>
          Usuários
        </Typography>
      </Box>
      <Box maxWidth={400} display="flex" flexDirection="column">
        <List>
          {data?.users.map((user: any) => (
            <ListItem
              secondaryAction={
                <IconButton
                  onClick={() => {
                    setUserId(user._id);
                    setChecked(user.devices_allowed);
                    handleOpen();
                  }}
                  edge="end"
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          Habilite os dispositivos acessíveis para o usuário
        </DialogTitle>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {allDevicesResponse?.devices.map((value: any) => {
            const labelId = `checkbox-list-label-${value.id}`;
            return (
              <ListItem key={value.id} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(Number(value.id))}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={
                        checked.find((check) => check == value.id) !== undefined
                      }
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <DialogActions>
          <Button onClick={() => handleSave()}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default withAuth(Users);
