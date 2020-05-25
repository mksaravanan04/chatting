import React from 'react';
import ContactList from './ContactList';
import ViewContactList from './ChatWindow';

const Home = (props) => {
  return (
    <div>
      {props.loginUserName!=""?
      <ContactList userlist={props.userlist} loginUserName={props.loginUserName}/>:
      <div class="welcome-banner">
       <h1>Welcome to Doodle Chatting</h1>
          <p>Please Login</p>
        </div>
}
    </div>
  );
};



export default Home;