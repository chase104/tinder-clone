import React, { useState, useEffect } from 'react'
import './styles.css'

const MongoChat = () => {



    const handleChange = (e) => {
        console.log(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitted");
    }
    return (
        <div className="mongochat-container">
            <div className="messages">
                message one
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" onChange={(e) => handleChange(e)} />
            </form>

        </div>
    )
}

export default MongoChat
