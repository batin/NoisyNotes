import React, { useState, useEffect, useContext } from "react"
import ReactAudioPlayer from "react-audio-player"
import { AiFillDelete } from "react-icons/ai"
import { IoIosCloseCircle, IoMdMic } from "react-icons/io"
import { BsStopFill } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"
import axios from "axios"
import { AuthContext } from "../services/auth"
import TagsInput from "react-tagsinput"
import "react-tagsinput/react-tagsinput.css"

const Note = ({ close, data }) => {
  const [edit, setEdit] = useState(false)
  const [url, setUrl] = useState(null)
  const [name, setName] = useState(data.Title)
  const [recording, setRecording] = useState(false)
  const [mp3file, setMp3file] = useState(null)
  const [tags, setTags] = useState([])
  const [oldMp3File, setOldMp3File] = useState(null)
  const state = useContext(AuthContext)

  useEffect(() => {
    const Microm = require("microm")
    setTags(
      data.Tags.map(tag => {
        return tag.Title
      })
    )
    getNoise()
    if (window) window.microm = new Microm()
  }, [])

  const getNoise = async () => {
    try {
      const saved = await axios({
        method: "GET",

        url: `https://noisy-notes.herokuapp.com/user/noises/${data.ID}/file`,
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
        responseType: "blob",
      })
      const blob = new Blob([saved.data], {
        type: "audio/mpeg",
      })
      await setOldMp3File(blob)
      var reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = function() {
        var base64data = reader.result
        setUrl(base64data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteNote = async () => {
    await axios({
      method: "DELETE",
      url: `https://noisy-notes.herokuapp.com/user/noises/${data.ID}`,
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    })
    close()
  }

  const save = async () => {
    try {
      const formdata = new FormData()
      formdata.append("title", name)
      formdata.append("tags", tags.join(", "))
      if (mp3file) {
        formdata.append("file", mp3file)
      } else {
        formdata.append("file", oldMp3File)
      }
      const saved = await axios({
        method: "PUT",
        url: `https://noisy-notes.herokuapp.com/user/noises/${data.ID}`,
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
        data: formdata,
      })
    } catch (err) {
      console.log(err)
    }
    close()
  }

  const start = () => {
    window.microm.record().then(() => setRecording(true))
  }

  const stop = () => {
    setRecording(false)
    if (window)
      window.microm.stop().then(function(result) {
        const mp3 = result
        setMp3file(new Blob(mp3.buffer, { type: "audio/mpeg" }))
        setUrl(mp3.url)
      })
  }

  return (
    <div className="d-flex flex-column align-content-center justify-content-center align-items-center addNotePopup">
      <IoIosCloseCircle className="closeBtn" size={25} onClick={close} />
      {edit ? (
        <>
          {recording ? (
            <div onClick={stop} className="m-auto recorder recording">
              <BsStopFill size={20} />
            </div>
          ) : (
            <div onClick={start} className="m-auto recorder ">
              <IoMdMic size={20} />
            </div>
          )}
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="noteInput"
            type="text"
            placeholder="Not Adı"
          />
          <TagsInput
            className="tagInput"
            value={tags}
            onChange={tag => setTags(tag)}
          />
        </>
      ) : (
        <div />
      )}
      <div className="player">
        <ReactAudioPlayer src={url} controls />
      </div>
      {edit ? (
        <button className="btn button save" onClick={save}>
          Kaydet
        </button>
      ) : (
        <div className="d-flex buttons">
          <AiFillDelete size={30} onClick={deleteNote} />
          <FaEdit
            size={30}
            onClick={() => {
              setEdit(true)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Note
