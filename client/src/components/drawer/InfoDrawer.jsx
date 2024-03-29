import { ArrowBack } from "@mui/icons-material";
import { Box, Drawer, Typography,styled } from "@mui/material";
import React from "react";
import Profile from "./Profile";

const Header = styled(Box)`
  background: #008069;
  height: 107px;
  color: #FFFFFF;
  display: flex;
  & > svg, & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
`;

const Component = styled(Box)`
  background: #ededed;
  height: 85%;
`;

const Text = styled(Typography)`
    font-size: 18px;
`


 const drawerStyle = {
    left: 20,
    top: 17,
    height: "95%",
    width: "30%",
    boxShadow: "none",
  };

const InfoDrawer = ({ open, setOpen }) => {
  
  
    const handleclose = () => {
    setOpen(false);
  };

 

  return (
    <div>
      <Drawer
        open={open}
        onClose={handleclose}
        PaperProps={{ sx: drawerStyle }}
        style={{ zIndex: 1500 }}
      >
        <Header>
            <ArrowBack onClick={handleclose} />
            <Text>Profile</Text>
        </Header>
        <Component>
            <Profile/>
        </Component>
      </Drawer>
    </div>
  );
};

export default InfoDrawer;
