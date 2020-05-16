import React, { useState } from "react"
import Recorder from "react-mp3-recorder"
import ReactAudioPlayer from "react-audio-player"
import blobToBuffer from "blob-to-buffer"
import { IoIosCloseCircle } from "react-icons/io"

const AddNotePopup = ({ close }) => {
  const [url, setUrl] = useState("")

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
          <input className="noteInput" type="text" placeholder="Not Adı" />
          <div className="player">
            <ReactAudioPlayer src={url} controls />
          </div>
          <button className="btn button save">Kaydet</button>
        </>
      )}
    </div>
  )
}

export default AddNotePopup
