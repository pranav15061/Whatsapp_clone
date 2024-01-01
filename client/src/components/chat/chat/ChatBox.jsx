import React, { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader';
import { Box } from '@mui/material';
import Messages from './Messages';
import {getConversation} from "../../../service/api";

import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";

const ChatBox = () => {

    const {person,account}=useContext(AccountContext);
    const [conversation, setConversation] = useState({});

    useEffect(() => {
      const getConversationDetails = async () => {
          let data = await getConversation({ senderId: account.sub, receiverId: person.sub });
          setConversation(data);
      }
      getConversationDetails();
  }, [person.sub]);


  return (
    <Box>
        <ChatHeader person={person}/>
        <Messages person={person} conversation={conversation}/>
    </Box>
  )
}

export default ChatBox;
