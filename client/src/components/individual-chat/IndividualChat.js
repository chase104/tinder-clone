import React, {useState, useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar'
import './IndividualChat.css'
import Button from '@material-ui/core/Button';
import axios from 'axios'

const IndividualChat = (props) => {

  console.log(props.match.params.person)

  const [messages, setMessages] = useState([

  ])

  useEffect(() => {
      async function fetchData() {
        const req = await axios({
          method: "GET",
          url: `/tinder/getchat/6043bcb97dc63d2c7811eae0`
        })
      }
      fetchData();
  })
  const [inputData, setInputData] = useState(null)
  var inputField = document.getElementById("chatInput");

  const handleSend = (e) => {
    e.preventDefault();
    setMessages([...messages, {message:inputData}])
    setInputData(null)
    inputField.value=''
  }
  const handleInputChange = (e) => {
    setInputData(e.target.value)
    console.log(inputData);

  }

  console.log(inputField);
  return (
    <div className="chatHolder">
      <p className="matchDetails">YOU MATCHED WITH AINA ON 09/08/2017</p>
      <div className="messageContainer">
      {messages.map(message => {
          if (message.name){
            return(
              <div className="messageHolderMatched">
              <Avatar
              src="https://scontent-mad1-1.xx.fbcdn.net/v/t1.0-9/70744285_10212279152093716_3243885904137289728_n.jpg?_nc_cat=105&ccb=2&_nc_sid=174925&_nc_ohc=_K-UnzRftNEAX-28wnf&_nc_oc=AQmHoYdMXIqb7S_gQ0oAGd-UuerxqWOJNF40eKZ9zllE487lIzTstsNO1kKGlWrlY6g&_nc_ht=scontent-mad1-1.xx&oh=a6ea0015d3dab0c1964659da9ac5571e&oe=6007608B"
              />
                <p className="messageMatched">{message.message}</p>
              </div>
            )
          } else {
            return (
              <div className="messageHolderUser">
                <p className="messageUser">{message.message}</p>
              </div>
            )
          }
        }
      )}
      </div>

        <form className="chatInputForm" onSubmit={handleSend} autocomplete="off">
          <input type="text" placeholder="type a message..." className="chatInput" id="chatInput" onChange={(e) => handleInputChange(e)} />
          <Button className="chatInputButton" onClick={handleSend}>SEND</Button>
        </form>
    </div>
  )
}

export default IndividualChat
