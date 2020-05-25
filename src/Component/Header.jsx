import React,{useState} from 'react';



function Header (props){
console.log(props)

  return (
    <div class="main">
      <div class="header">
        <a href="#default" class="logo">CompanyLogo</a>
        <div class="header-right">
          <div class="dropdown">
            <select name="fullName" class="user-dropdown-menu form-control" onChange={props.loginUser}>
              <option value="">Select Contact</option>
              {props.userlist.length!=0?props.userlist.map(element=>{             
              return(
              <option value={element.FullName} hidden={element.FullName==props.loginUserName?true:false}>{element.FullName}</option>
              )  
            }):""
            }
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Header;