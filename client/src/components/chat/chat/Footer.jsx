import React,{useEffect} from "react";
import { Box, InputBase } from "@mui/material";
import { AttachFile, EmojiEmotionsOutlined, Mic } from "@mui/icons-material";
import styled from "@emotion/styled";
import {uploadFile} from "../../../service/api";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const Search = styled(Box)`
  border-radius: 18px;
  background-color: #ffffff;
  width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  padding-left: 25px;
  font-size: 14px;
  height: 20px;
  width: 100%;
`;

const ClipIcon = styled(AttachFile)`
  transform: rotate(40deg);
`;

const Footer = ({ sendText, SetValue, value,file,setfile,setImage }) => {

  useEffect(() => {
    const getImage = async () => {
        if (file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);

            const response = await uploadFile(data);
            setImage(response.data);
        }
    }
    getImage();
}, [file])



  const onFilechange=(e)=>{
    console.log(e);
    setfile(e.target.files[0]);
    SetValue(e.target.files[0].name);

  }
  return (
    <Container>
      <EmojiEmotionsOutlined />
      <label htmlFor="fileInput">
        <ClipIcon />
      </label>

      <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e)=>onFilechange(e)} />
      <Search>
        <InputField
          placeholder="Type a message"
          onChange={(e) => SetValue(e.target.value)}
          onKeyPress={(e) => sendText(e)}
          value={value}
        />
      </Search>
      <Mic />
    </Container>
  );
};

export default Footer;
