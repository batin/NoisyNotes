import React, { useState } from "react"
import Recorder from "react-mp3-recorder"
import ReactAudioPlayer from "react-audio-player"
import blobToBuffer from "blob-to-buffer"
import { IoIosCloseCircle } from "react-icons/io"
import { AiFillDelete } from "react-icons/ai"
import { FaEdit } from "react-icons/fa"

const Note = ({ close, data }) => {
  const [edit, setEdit] = useState(false)
  const [url, setUrl] = useState(data.url)
  const [name, setName] = useState(data.name)
  console.log(data)
  const _onRecordingComplete = blob => {
    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        console.error(err)
        return
      }

      console.log("recording", blob)

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
      console.log(url)
    }

    setUrl(null)
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
