import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { useEffect, useState ,useRef} from "react";
import Footer from "./Footer";
import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { getMessages, newMessages } from "../../../service/api";
import Message from "./Message";

const Wrapper = styled(Box)`
  background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
  background-size: 50%;
`;

const StyledFooter = styled(Box)`
  height: 55px;
  background: #ededed;
  // position: absolute;
  width: 100%;
  // bottom: 0
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 80px;
`;

const Messages = ({ person, conversation }) => {

  const [messages, setMessages] = useState([]);
  
  const [value, SetValue] = useState("");
  const [file, setfile] = useState();
  const [image,setImage]= useState('');
  const [incomingMessage, setincomingMessage] = useState(null);
  const ScrollRef=useRef();
  
  const { account,socket,newmsgFlag,setnewmsgFlag } = useContext(AccountContext);

  useEffect(()=>{
    socket.current.on('getMessage',data=>{
      setincomingMessage({
        ...data,
        createdAt:Date.now()
      });
    });
  });

  useEffect(() => {
    const getmessageDetails = async () => {
      let data = await getMessages(conversation?._id);
      setMessages(data);
    };
    getmessageDetails();
  }, [conversation?._id, person._id, newmsgFlag]);


  useEffect(() => {
    ScrollRef.current?.scrollIntoView({ transition: "smooth" })
}, [messages]);

useEffect(() => {
  incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && 
      setMessages((prev) => [...prev, incomingMessage]);
  
}, [incomingMessage, conversation]);

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    let message={};
    if (code === 13) {
      if (!file) {
         message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "text",
          text: value
        };
      } else {
         message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "file",
          text: image
        };
      }

      socket.current.emit('sendMessage', message);

      await newMessages(message);
      SetValue("");
      setfile('');
      setImage('');
      setnewmsgFlag((prev) => !prev);
    }
  };

  return (
    <Wrapper>
      <Component>
        {messages &&
          messages.map((message) => (
            <Container ref={ScrollRef}>
              <Message message={message} />
            </Container>
          ))}
      </Component>
      <Footer
        sendText={sendText}
        SetValue={SetValue}
        value={value}
        file={file}
        setfile={setfile}
        setImage={setImage}
      />
    </Wrapper>
  );
};

export default Messages;
