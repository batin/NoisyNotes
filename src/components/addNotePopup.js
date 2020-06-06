import React, { useState, useContext, useEffect } from "react"
// import Recorder from "react-mp3-recorder"
import ReactAudioPlayer from "react-audio-player"
// import blobToBuffer from "blob-to-buffer"
import { IoIosCloseCircle, IoMdMic } from "react-icons/io"
import { BsStopFill } from "react-icons/bs"
import { AuthContext } from "../services/auth"
import TagsInput from "react-tagsinput"
import "react-tagsinput/react-tagsinput.css"
import Microm from "microm"
import axios from "axios"
const AddNotePopup = ({ close }) => {
  const state = useContext(AuthContext)
  const [url, setUrl] = useState("")
  const [mp3file, setMp3file] = useState(null)
  const [title, setTitle] = useState("")
  const [recording, setRecording] = useState(false)
  const [tags, setTags] = useState([])

  useEffect(() => {
    window.microm = new Microm()
  }, [])

  useEffect(() => {
    console.log(tags)
  }, [tags])
  const save = async () => {
    const formdata = new FormData()
    formdata.append("title", title)
    formdata.append("tags", tags.join(", "))
    formdata.append("file", mp3file)
    try {
      await axios({
        method: "POST",
        url: "https://noisy-notes.herokuapp.com/user/noises",
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
        data: formdata,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const start = () => {
    window.microm.record().then(() => setRecording(true))
  }

  const stop = () => {
    setRecording(false)
    window.microm.stop().then(function(result) {
      const mp3 = result
      setMp3file(new Blob(mp3.buffer, { type: "audio/mpeg" }))
      setUrl(mp3.url)
    })
  }

  return (
    <div className="d-flex flex-column align-content-center justify-content-center align-items-center addNotePopup">
      <IoIosCloseCircle className="closeBtn" size={25} onClick={close} />
      {recording ? (
        <div onClick={() => stop()} className="m-auto recorder">
          <BsStopFill size={20} />
        </div>
      ) : (
        <div onClick={() => start()} className="m-auto recorder">
          <IoMdMic size={20} />
        </div>
      )}
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
