import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import { auth } from "../../firebase"; // Assuming you have already initialized Firebase authentication in your project

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    position: "relative",
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

function FileUpload() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // const [ipAddress, setIpAddress] = useState("");
  const [formData, setFormData] = useState({
    uid: "",
    files: [],
  });
  useEffect(() => {
    // fetchIpAddress();
    fetchFiles();
  }, []);

  // const fetchIpAddress = async () => {
  //   try {
  //     const response = await axios.get("http://18.234.103.27:5050/api/ip");
  //     setIpAddress(response.data.ip);
  //   } catch (error) {
  //     console.error("Error fetching IP address:", error);
  //   }
  // };

  const userId = sessionStorage.getItem("userId");
  const fetchFiles = async () => {
    try {
      const response = await axios.post(
        `https://jsuwmldyp3.execute-api.us-east-1.amazonaws.com/prod/`,
        {
          userId: userId,
        }
      );
      const filesData = JSON.parse(response.data);
      console.log(filesData);
      setUploadedFiles(filesData);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleDelete = async (file) => {
    try {
      const fileName = file.Key.split("/").pop();
      const response = await axios.post(
        `https://ml6zywa9i1.execute-api.us-east-1.amazonaws.com/prod/`,
        {
          userId: userId,
          fileName: fileName,
        }
      );
      console.log(response.data);
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((uploadedFile) => uploadedFile.Key !== file.Key)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUploadClick = async () => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "*";
      fileInput.multiple = true; // Allow multiple file selection
      fileInput.onchange = async (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles.length > 0) {
          // const formData = {};

          // Convert selectedFiles to an array of objects with filename and file as keys
          const filesArray = Array.from(selectedFiles).map((file) => ({
            filename: file.name,
          }));
          formData.uid = sessionStorage.getItem("userId");
          formData.files = filesArray;
          console.log(formData);
          // formData.append("uid", sessionStorage.getItem("userId")); // Include userId in FormData
          // formData.append("files", JSON.stringify(filesArray)); // Convert filesArray to JSON string and append to FormData

          // Make a POST request to your Lambda function endpoint
          const response = await axios.post(
            "https://cbqkfc1xi3.execute-api.us-east-1.amazonaws.com/prod/", // Update this endpoint with your Lambda function endpoint
            formData
          );

          console.log("Files uploaded:", response.data);
          fetchFiles(); // Refresh the list of uploaded files after successful upload
        }
      };
      fileInput.click();
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleSignOutClick = () => {
    sessionStorage.clear();
    auth
      .signOut()
      .then(() => {
        console.log("User signed out successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            File Management System
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Filename</TableCell>
                <TableCell>Last Modified</TableCell>
                <TableCell>Size in Bytes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedFiles.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {file.Key ? file.Key.split("/").pop() : ""}
                  </TableCell>
                  <TableCell>{file.LastModified}</TableCell>
                  <TableCell>{file.Size}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(file)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleUploadClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Upload" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleSignOutClick}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default FileUpload;
