import React, { Component } from 'react';
import ViewContacts from './ChatWindow';

let localstrgData = [];
let dateFormat = require('dateformat');
let currentDate = new Date();

class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrContactsInfo: [],
      isModalOpen: false,
      txtAddress: "",
      txtFullName: "",
      txtEmail: "",
      txtPhone: "",
      txtCompany: "",
      txtmsgValue: "",
      EditID: "",
      fullnameValid: "",
      emailValid: "",
      phoneValid: "",
      companyValid: "",
      addressValid: "",
      selectedItems: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.chatRef = React.createRef()
  }


  //to get the source data from the local storage
  componentDidMount() {
    localstrgData = JSON.parse(localStorage.getItem('ContactInfo'))
    if (localstrgData) {
      this.setState({ arrContactsInfo: localstrgData })
    }
  }


  //it will gets triggered when user changed the loginuser name (properties)
  componentWillReceiveProps(){
    this.setState({selectedItems:""})
  }


  componentDidUpdate(){
this.scrollToBottom();
  }

  scrollToBottom = () => {
    if(this.chatRef.current!=null){
    this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight
    }
  }

  //bindContacts used to bind the contact information in the table
  bindContacts() {
    return this.state.arrContactsInfo.map(element => {
      if (this.props.loginUserName != element.FullName) {
        return (
          <tr>
            <td class="cursor-pointer" onClick={this.handleViewContacts.bind(this, element)} id="viewcontact">{element.FullName}
            </td>
            <td>{element.Company}</td>
            <td>
              <span class="fa fa-comment cursor-pointer" onClick={this.handleViewContacts.bind(this, element)} id="viewcontact" > </span>
            </td>
          </tr>
        )
      }
    })
  }

  //used to call set the selected contact chat history
  handleViewContacts(selectedItems) {
    if (selectedItems.NewMessage != 0) {
      let modifiedValue = { ID: selectedItems.ID, FullName: selectedItems.FullName, Email: selectedItems.Email, Phone: selectedItems.Phone, Company: selectedItems.Company, Address: selectedItems.Address, NewMessage: 0, ChatHistory: selectedItems.ChatHistory };
      let existingData = JSON.parse(localStorage.getItem('ContactInfo') || "[]")

      let itemIndex = 0
      existingData.filter((element, index) => {
        if (element.ID == selectedItems.ID)
        itemIndex=index
      })
      existingData.splice(itemIndex, 1, modifiedValue)
      localStorage.setItem('ContactInfo', JSON.stringify(existingData))
      localstrgData = JSON.parse(localStorage.getItem('ContactInfo'));

      this.setState({ selectedItems: selectedItems, arrContactsInfo: localstrgData });
    }
    else {
      this.setState({ selectedItems: selectedItems });
    }
  }

  //handling the onchange and onclick event of this component
  handleChange(event) {
    let fieldID = event.target.id
    switch (fieldID) {
      case "messagebox":
        if (event.key != "Enter") {
          this.setState({ txtmsgValue: event.target.value });
        }
        else {
          let selectedToUserIndex=this.handleChathistory()
          this.setState({ arrContactsInfo: localstrgData, txtmsgValue: "",selectedItems:localstrgData[selectedToUserIndex] });
        }
        break;
      case "sendicon":
        let selectedToUserIndex=this.handleChathistory()
          this.setState({ arrContactsInfo: localstrgData, txtmsgValue: "",selectedItems:localstrgData[selectedToUserIndex] });
      
        break;


    }

  }

//used to call send the message to one person to another by doing the below logic
  handleChathistory(){

  let loginUserIndex=0;
  let selectedToUserIndex=1;

  localstrgData.filter((element, index) => {
    if (element.ID == this.state.selectedItems.ID) {
              selectedToUserIndex=index;
    }
    else if (element.FullName == this.props.loginUserName) {
      loginUserIndex=index;
    }

  })
  let firstIndexValue = localstrgData[loginUserIndex];
  let secondIndexValue = localstrgData[selectedToUserIndex];
  firstIndexValue.ChatHistory.push({ msgFrom: firstIndexValue.FullName, msgTo: secondIndexValue.FullName, msgContent: this.state.txtmsgValue, msgDateTime: dateFormat(currentDate, "mm-dd-yyyy HH:MM") })
  let loginUserIndexValue = {
    ID: firstIndexValue.ID, FullName: firstIndexValue.FullName, Email: firstIndexValue.Email, Phone: firstIndexValue.Phone, Company: firstIndexValue.Company, Address: firstIndexValue.Address, NewMessage: firstIndexValue.NewMessage,
    ChatHistory: firstIndexValue.ChatHistory
  }
  secondIndexValue.ChatHistory.push({ msgFrom: firstIndexValue.FullName, msgTo: secondIndexValue.FullName, msgContent: this.state.txtmsgValue, msgDateTime: dateFormat(currentDate, "mm-dd-yyyy HH:MM") })
  let toUserIndexValue = {
    ID: secondIndexValue.ID, FullName: secondIndexValue.FullName, Email: secondIndexValue.Email, Phone: firstIndexValue.Phone, Company: secondIndexValue.Company, Address: secondIndexValue.Address, NewMessage: secondIndexValue.NewMessage + 1,
    ChatHistory: secondIndexValue.ChatHistory
  }
  localstrgData.splice(loginUserIndex, 1, loginUserIndexValue);
  localstrgData.splice(selectedToUserIndex, 1, toUserIndexValue);
  localStorage.setItem("ContactInfo", JSON.stringify(localstrgData))
  localstrgData = JSON.parse(localStorage.getItem('ContactInfo'));
  return selectedToUserIndex
}




  //render method to bind the html source code 
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-8">
            <div class="list-header-container">
              <div class="contact-header col-sm-4">
                <h2>Contacts</h2>
              </div>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Company</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.bindContacts()}
              </tbody>
            </table>
          </div>

          <ViewContacts selectedContacts={this.state.selectedItems} loginUserName={this.props.loginUserName} selectedUserChatHistory={this.state.selectedItems.ChatHistory} handleChange={this.handleChange} messageTyped={this.state.txtmsgValue} referenceScroll={this.chatRef} />
        </div>
      </div>
    )
  }

}


export default ContactList
