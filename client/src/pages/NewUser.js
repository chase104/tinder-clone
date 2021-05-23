import React, {useState, useEffect} from 'react'
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container:{
    maxWidth: "80vw",
    margin: "20px auto 100px auto",
    display: "flex",
    flexDirection: "column"
  },
  button: {
    maxWidth: "fit-content"
  },
  text:{
    maxWidth: "300px",
    margin: "12px 0px"
  },
  error:{
    color: "red",
    fontSize: "16px",
    margin: "8px 0px"
  }
});
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageResize, FilePondPluginFileEncode);

const NewUser = (props) => {
  const classes = useStyles()
  const [pond, setPond] = useState()
  const [image, setImage] = useState(null)
  const [user, setUser] = useState({})
  const [error, setError] = useState({
    errorPresent: false,
    message: null
  })
  useEffect(() => {
    console.log(image);
  }, [image])
  const handleInit = () => {
    console.log("filepond initiated: ", pond);
  }
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    })

  }
  const handleImageUpload = (file) => {
    console.log(file);
    setImage(file)
  }

  const handleSubmit = () => {
    console.log(image);
    if (user.email === undefined || user.firstname === undefined || user.password === undefined || image === null) {
      setError({
        errorPresent: true,
        message: "All fields Required"
      })
    } else {
      var fd = new FormData();
      fd.append('image', image)
      fd.append('email',  user.email)
      fd.append('name',  user.firstname + " " + user.lastname)
      fd.append('password',  user.password)

    axios({
      method: "POST",
      url: "/newuser",
      data: fd,
    }).then((res) => {
      let message = res.data.message
      if (message) {
        setError({
          errorPresent: true,
          message: message
        })
      } else {
         props.history.push('/login')
      }
    })
    }

  }


  return (
    <div className={classes.container}>
      <h1 style={{marginBottom: "20px"}}>Create Profile</h1>
      <TextField variant="outlined" label="First Name" id="firstname"  onChange={(e) => handleChange(e)} className={classes.text}/>
      <TextField variant="outlined" label="Last Name" id="lastname" onChange={(e) => handleChange(e)} className={classes.text}/>
      <TextField variant="outlined" label="Email" id="email" onChange={(e) => handleChange(e)} className={classes.text}/>
      <TextField variant="outlined" label="Password" id="password" onChange={(e) => handleChange(e)} className={classes.text}/>
      <h3 style={{marginTop: "20px"}}>Upload a picture of yourself:</h3>

      <FilePond ref={ref => setPond(ref)}
        id="image"
        allowMultiple={false}
        onupdatefiles={(fileItems) => handleImageUpload(fileItems[0].file)}
        oninit={() => handleInit()}
        />
        {
          error.errorPresent === false ? null :
          <div className={classes.error}>{error.message}</div>
        }
      <Button variant="contained" className={classes.button} color="primary" onClick={() => handleSubmit()}>Submit</Button>

    </div>
  )
}

export default NewUser
