import styled from "@emotion/styled";
import { MoreVert, Search } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React,{useContext, useEffect} from "react";

import { AccountContext } from "../../../context/AccountProvider";

const Header = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;
    
const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})

const Name = styled(Typography)`
    margin-left: 12px !important;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        padding: 8px;
        font-size: 22px;
        color: #000;
    }
`;

const Status = styled(Typography)`
    font-size: 12px !important;
    color: rgb(0, 0, 0, 0.6);
    margin-left: 12px !important;
`;


const ChatHeader = ({person}) => {
  const {Activeuser}=useContext(AccountContext);

  return (
    <div>
      <Header>
        <Image src={person.picture} alt="display picture" />
        <Box>
            <Name>{person.name}</Name>
            <Status>{Activeuser?.find(user => user.sub === person.sub) ? 'Online' : 'Offline'}</Status> 


        </Box>
        <RightContainer>
           <Search/>
           <MoreVert/> 
        </RightContainer>
      </Header>
    </div>
  );
};

export default ChatHeader;
