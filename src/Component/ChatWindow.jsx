import React from 'react';

const ViewContacts =(contact)=>{
let currentDate=new Date();
let dateFormat = require('dateformat');
let filteredValue=[];
if(contact.selectedUserChatHistory!=undefined){
filteredValue=contact.selectedUserChatHistory.filter(element=>{
  return element.msgFrom==contact.loginUserName || element.msgTo==contact.loginUserName
})
}



    return(
        <div class="col-sm-4">
            {contact.selectedContacts!=""?
            <div class="chatting-window mesgs">
          <div ref={contact.referenceScroll} class="msg_history">
            <div class="conversiotn-username">
    <p>{contact.selectedContacts.FullName + " Chat History"}</p>
              </div>
            {filteredValue.map((element,index)=>{
              let msgTime=dateFormat(element.msgDateTime,"mmmm dS, yyyy")==dateFormat(currentDate,"mmmm dS, yyyy")?("Today "+ (dateFormat(element.msgDateTime,"h:MM TT"))):element.msgDateTime
              return(
                <div >
                {contact.loginUserName==element.msgTo?<div class="incoming_msg_img"> 
                <span class="fa fa-user-circle-o" style={{"font-size":"36px",color:"#15b2e2", float:"left"}}></span>
                 </div>:""}
                <div class={contact.loginUserName==element.msgTo?"received_msg col-sm-12":"outgoing_msg col-sm-12"}>
                  <div class={contact.loginUserName==element.msgTo?"received_withd_msg":"sent_msg"}>
              <p>{element.msgContent}</p>
              <span class="time_date"> {msgTime} </span></div>
                </div>
              </div>
              )
            })
            }

          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input type="text" class="write_msg" id="messagebox" placeholder="Type a message" value={contact.messageTyped} onChange={contact.handleChange} onKeyPress={contact.handleChange}/>
              <button class="msg_send_btn" type="button"><i id="sendicon" onClick={contact.handleChange} class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>:<div></div>}
            </div>           
    )

}

export default ViewContacts