import React from 'react'
import { useContext,useState } from 'react';

import { AccountContext } from '../../../context/AccountProvider';
import { Box, styled } from '@mui/material';
import { Chat as MessageIcon} from '@mui/icons-material';
import UpdateIcon from '@mui/icons-material/Update';
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../../drawer/InfoDrawer';



const Component = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;

const Wrapper = styled(Box) `
    margin-left: auto;
    & > * {
        margin-left: 2px;
        padding: 8px;
        color: #000;
    };
    & :second-child {
        font-size: 22px;
        margin-right: 8px;
        margin-top: 3px;
    }
`;
    
const Image = styled('img') ({
    height: 40,
    width: 40,
    borderRadius: '50%'
})

const Header = () => {

    const {account}=useContext(AccountContext);

    const [openDrawer,setOpenDrawer]=useState(false);

    const toggledrawer=()=>{
        setOpenDrawer(true);
    }
  return (
    <>
            
        <Component>
            <Image src={account.picture} alt="dp"  onClick={toggledrawer}/>
            <Wrapper>
                <UpdateIcon/>
                <MessageIcon/>
                <HeaderMenu setOpenDrawer={setOpenDrawer}/>
            </Wrapper>
        </Component>
        <InfoDrawer  open={openDrawer} setOpen={setOpenDrawer} />
    </>
  )
}

export default Header;
