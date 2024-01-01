import React from "react";
import { Box, Dialog, List, ListItem, Typography, styled } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { qrCodeImage } from "../../constants/data";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";

import {addUser} from "../../service/api"

//842337309141-8i6ir8v7p72bes6sup38n70qeg1fq3iu.apps.googleusercontent.com

const Component = styled(Box)`
  display: flex;
`;

const Container = styled(Box)`
  padding: 56px 0 56px 56px;
`;

const QRCOde = styled("img")({
  margin: "50px 0 0 50px",
  height: 264,
  width: 264,
});

const Title = styled(Typography)`
  font-size: 26px;
  margin-bottom: 25px;
  color: #525252;
  font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu,
    Cantarell, Fira Sans, sans-serif;
  font-weight: 300;
`;

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;

const dialogStyle = {
  marginTop: "12%",
  height: "95%",
  width: "60%",
  maxWidth: "100",
  maxHeight: "100%",
  borderRadius: 0,
  boxShadow: "none",
  overflow: "hidden",
};

const LoginDiaglog = () => {
  const { setAccount } = useContext(AccountContext);

  const onLoginSuccess = async(res) => {
    let decoded = jwtDecode(res.credential);
    // console.log(decoded);
    setAccount(decoded);
    await addUser(decoded);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed ", res);
  };

  return (
    <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
      <Component>
        <Container>
          <Title> To use WhatsApp on your computer: </Title>

          <StyledList>
            <ListItem>1. Open WhatsApp on your phone</ListItem>
            <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
            <ListItem>
              3. Point your phone to this screen to capture the code
            </ListItem>
          </StyledList>
        </Container>
        <Box style={{ position: "relative" }}>
          <QRCOde src={qrCodeImage} alt="qrcode" />
          <Box
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateX(25%) translateY(-25%)",
            }}
          >
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginFailure} />
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDiaglog;
