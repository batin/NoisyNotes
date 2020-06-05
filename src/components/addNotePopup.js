import React, { useState, useContext } from "react"
import Recorder from "react-mp3-recorder"
import ReactAudioPlayer from "react-audio-player"
import blobToBuffer from "blob-to-buffer"
import { IoIosCloseCircle } from "react-icons/io"
import { AuthContext } from "../services/auth"
import axios from "axios"
import TagsInput from "react-tagsinput"
import "react-tagsinput/react-tagsinput.css"
import mp3 from "../images/2.mp3"

const AddNotePopup = ({ close }) => {
  const state = useContext(AuthContext)
  const [url, setUrl] = useState("")
  const [mp3file, setMp3file] = useState(null)
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState([])
  const save = async () => {
    const formdata = new FormData()
    formdata.append("title", title)
    formdata.append("tags", tags.join(", "))
    formdata.append("file", mp3file)
    // try {
    //   const saved = await axios({
    //     method: "POST",
    //     url: "https://noisy-notes.herokuapp.com/user/noises",
    //     headers: {
    //       Authorization: `Bearer ${state.token}`,
    //       "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
    //     },
    //     data: formdata,
    //   })
    //   console.log(saved)
    // } catch (err) {
    //   console.log(err)
    // }
    var myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${state.token}`)
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    }

    fetch("https://noisy-notes.herokuapp.com/user/noises", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log("error", error))
  }

  const _onRecordingComplete = blob => {
    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        console.error(err)
        return
      }
      const file = new File(buffer, "deneme.mp3", {
        type: blob.type,
        lastModified: Date.now(),
      })
      setMp3file(blob)
      console.log(file)
      if (url) {
        window.URL.revokeObjectURL(url)
      }
      setUrl(window.URL.createObjectURL(blob))
    })
  }

  const _onRecordingError = err => {
    console.log("error recording", err)
    if (url) {
      window.URL.revokeObjectURL(url)
    }
    setUrl(null)
  }

  return (
    <div className="d-flex flex-column align-content-center justify-content-center align-items-center addNotePopup">
      <IoIosCloseCircle className="closeBtn" size={25} onClick={close} />
      <Recorder
        onRecordingComplete={_onRecordingComplete}
        onRecordingError={_onRecordingError}
        className="m-auto recorder"
      />
      {url && (
        <>
          <input
            value={title}
            className="noteInput"
            type="text"
            placeholder="Not Adı"
            aria-label="Not Adı"
            onChange={e => setTitle(e.target.value)}
          />
          <TagsInput
            className="tagInput"
            value={tags}
            onChange={tag => setTags(tag)}
          />
          <div className="player">
            <ReactAudioPlayer src={url} controls />
          </div>
          <button onClick={() => save()} className="btn button save">
            Kaydet
          </button>
        </>
      )}
    </div>
  )
}

export default AddNotePopup
