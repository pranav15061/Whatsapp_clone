
import { createContext,useEffect,useRef,useState } from 'react';

// import {io} from "socket.io-client";
import { io } from "socket.io-client";

export const AccountContext = createContext(null);

const AccountProvider = ({children}) => {

    const [ account, setAccount ] = useState();
    const [ person, setPerson ] = useState({});
    const [Activeuser, setActiveUser ] = useState([]);
    const [newmsgFlag, setnewmsgFlag] = useState(false);

    const socket = useRef();

    useEffect(() => {
        socket.current = io('ws://localhost:9000');
    }, [])




    return(
        <>
         <AccountContext.Provider value={{
                account,setAccount,person,setPerson,socket,Activeuser,setActiveUser,
                newmsgFlag,setnewmsgFlag
         }}>

            {children}
         </AccountContext.Provider>
         
        </>
    )
}

export default AccountProvider;


