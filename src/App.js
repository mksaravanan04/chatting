import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SideNavigation from './Component/SideNavigation';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './Component/Home';


function App() {
  let localstrgData = JSON.parse(localStorage.getItem('ContactInfo'))

  const [fullName, setFullName] = useState('');
 
  //set the login user value while selecting in the dropdown
  let loginUser = (e) => {
   setFullName(e.target.value);
 }

  return (
    <div className="App">
      <SideNavigation />
      <Header userlist={localstrgData} loginUser= {loginUser} loginUserName={fullName}/>
      <div class="body-content">
        <Home userlist={localstrgData} loginUserName={fullName}/>
        </div>
        <Footer />
    </div>
  );
}

export default App;
