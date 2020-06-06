import React, { useState, useEffect, useContext } from "react"
import ReactAudioPlayer from "react-audio-player"
import Microm from "microm"
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
  const [tags, setTags] = useState([])

  const state = useContext(AuthContext)

  useEffect(() => {
    setTags(
      data.Tags.map(tag => {
        return tag.Title
      })
    )
    getNoise()
    window.microm = new Microm()
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
      var blob = new Blob([saved.data], {
        type: "audio/mpeg",
      })
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

  const start = () => {
    window.microm.record().then(() => setRecording(true))
  }

  const stop = () => {
    setRecording(false)
    window.microm.stop().then(function(result) {
      const mp3 = result
      setUrl(mp3.url)
    })
  }

  return (
    <div className="d-flex flex-column align-content-center justify-content-center align-items-center addNotePopup">
      <IoIosCloseCircle className="closeBtn" size={25} onClick={close} />
      {edit ? (
        <>
          {recording ? (
            <div onClick={() => stop()} className="m-auto recorder">
              <BsStopFill size={20} />
            </div>
          ) : (
            <div onClick={() => start()} className="m-auto recorder">
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
        {/* <audio src={url} controls /> */}
      </div>
      {edit ? (
        <button
          className="btn button save"
          onClick={() => {
            setEdit(false)
          }}
        >
          Kaydet
        </button>
      ) : (
        <div className="d-flex buttons">
          <AiFillDelete size={30} />
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
