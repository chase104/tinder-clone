import React, {useState, useEffect} from 'react'
import './ChatsPage.css'
import Chat from '../components/chat/Chat.js'
import axios from 'axios'

const ChatsPage = () => {
  const [chats, setChats] = useState()

  const getChats = () => {
    axios({
      method: "GET",
      url: "/get-messages",
    })
  }


  return (
    <div>
      <Chat
        name="Aina"
        id="Aina12345"
        message="Hey! How are you? :)"
        timestamp="35 minutes ago"
        profilePic="https://scontent-mad1-1.xx.fbcdn.net/v/t1.0-9/70744285_10212279152093716_3243885904137289728_n.jpg?_nc_cat=105&ccb=2&_nc_sid=174925&_nc_ohc=_K-UnzRftNEAX-28wnf&_nc_oc=AQmHoYdMXIqb7S_gQ0oAGd-UuerxqWOJNF40eKZ9zllE487lIzTstsNO1kKGlWrlY6g&_nc_ht=scontent-mad1-1.xx&oh=a6ea0015d3dab0c1964659da9ac5571e&oe=6007608B"
      />
      <Chat
        name="Aina"
        message="Hey! How are you? :)"
        timestamp="35 minutes ago"
        profilePic="https://scontent-mad1-1.xx.fbcdn.net/v/t1.0-9/70744285_10212279152093716_3243885904137289728_n.jpg?_nc_cat=105&ccb=2&_nc_sid=174925&_nc_ohc=_K-UnzRftNEAX-28wnf&_nc_oc=AQmHoYdMXIqb7S_gQ0oAGd-UuerxqWOJNF40eKZ9zllE487lIzTstsNO1kKGlWrlY6g&_nc_ht=scontent-mad1-1.xx&oh=a6ea0015d3dab0c1964659da9ac5571e&oe=6007608B"
      />
      <Chat
        name="Aina"
        message="Hey! How are you? :)"
        timestamp="35 minutes ago"
        profilePic="https://scontent-mad1-1.xx.fbcdn.net/v/t1.0-9/70744285_10212279152093716_3243885904137289728_n.jpg?_nc_cat=105&ccb=2&_nc_sid=174925&_nc_ohc=_K-UnzRftNEAX-28wnf&_nc_oc=AQmHoYdMXIqb7S_gQ0oAGd-UuerxqWOJNF40eKZ9zllE487lIzTstsNO1kKGlWrlY6g&_nc_ht=scontent-mad1-1.xx&oh=a6ea0015d3dab0c1964659da9ac5571e&oe=6007608B"
      />
      <Chat
        name="Aina"
        message="Hey! How are you? :)"
        timestamp="35 minutes ago"
        profilePic="https://scontent-mad1-1.xx.fbcdn.net/v/t1.0-9/70744285_10212279152093716_3243885904137289728_n.jpg?_nc_cat=105&ccb=2&_nc_sid=174925&_nc_ohc=_K-UnzRftNEAX-28wnf&_nc_oc=AQmHoYdMXIqb7S_gQ0oAGd-UuerxqWOJNF40eKZ9zllE487lIzTstsNO1kKGlWrlY6g&_nc_ht=scontent-mad1-1.xx&oh=a6ea0015d3dab0c1964659da9ac5571e&oe=6007608B"
      />
    </div>
  )
}

export default ChatsPage
