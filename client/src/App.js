
import './App.css';
import Messenger from './components/Messenger';
import AccountProvider from './context/AccountProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const clientId = '246648691460-bsj1rub53iami1btvii0577h1on2je01.apps.googleusercontent.com';
//  const  clientid='842337309141-8i6ir8v7p72bes6sup38n70qeg1fq3iu.apps.googleusercontent.com';
//  842337309141-8i6ir8v7p72bes6sup38n70qeg1fq3iu.apps.googleusercontent.com

  return (
    <GoogleOAuthProvider clientId={clientId}> 

    <AccountProvider>
    <Messenger/>
    </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
