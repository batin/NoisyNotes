import React, { useState, useEffect, useContext } from "react"
import Recorder from "react-mp3-recorder"
import ReactAudioPlayer from "react-audio-player"
import blobToBuffer from "blob-to-buffer"
import { IoIosCloseCircle } from "react-icons/io"
import { AiFillDelete } from "react-icons/ai"
import { FaEdit } from "react-icons/fa"
import axios from "axios"
import { AuthContext } from "../services/auth"

const Note = ({ close, data }) => {
  const [edit, setEdit] = useState(false)
  const [url, setUrl] = useState(null)
  const [name, setName] = useState(data.Title)
  const state = useContext(AuthContext)

  useEffect(() => {
    getNoise()
  }, [])

  const _onRecordingComplete = blob => {
    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        console.error(err)
        return
      }
      // console.log(url)
      if (url) {
        window.URL.revokeObjectURL(url)
      }
      var reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = function() {
        var base64data = reader.result
        console.log(base64data)
      }
      setUrl(url)
    })
  }

  const _onRecordingError = err => {
    console.log("error recording", err)
    if (url) {
      window.URL.revokeObjectURL(url)
    }
    setUrl(null)
  }

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

  return (
    <div className="d-flex flex-column align-content-center justify-content-center align-items-center addNotePopup">
      <IoIosCloseCircle className="closeBtn" size={25} onClick={close} />
      {edit ? (
        <>
          <Recorder
            onRecordingComplete={_onRecordingComplete}
            onRecordingError={_onRecordingError}
            className="m-auto recorder"
          />
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="noteInput"
            type="text"
            placeholder="Not Adı"
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
