import React from 'react'
import './Chat.css'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'

const Chat = ({message, name, profilePic, timestamp}) => {
  return (
    <Link to={`/chat/${name}`}>
      <div className="chat">
        <Avatar className="chat_image" alt={name} src={profilePic} />
        <div className="nameAndMessageHolder">
          <h2>{name}</h2>
          <p className="message">{message}</p>
        </div>
        <p className="timeStamp">{timestamp}</p>
      </div>
    </Link>

  )
}

export default Chat
