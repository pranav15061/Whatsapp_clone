import React from 'react'
import { useEffect,useState,useContext} from 'react';
import { getUsers } from '../../../service/api';
import { Box,Divider,styled } from '@mui/material';
import Conversation from "./Conversation";

import { AccountContext } from '../../../context/AccountProvider';

const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`;

const Conversations = ({text}) => {
  const [users, setUsers] = useState([]);

  const {account,socket,setActiveUser}=useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
        let data = await getUsers();
        // let fiteredData = data.filter(user=>user.name.includes(text));
        setUsers(data);
    }
    fetchData();
}, [text]);

useEffect(()=>{
  socket.current.emit('addUser',account);
  socket.current.on('getUser',users=>{
    setActiveUser(users);
  });
},[account]);

  return (
    <Component>
         {
          users.map(user=>(
            user.sub!==account.sub &&
            <>
            <Conversation user={user}/>
            <StyledDivider/>
            </>
          ))
         }
    </Component>
  )
}

export default Conversations;
