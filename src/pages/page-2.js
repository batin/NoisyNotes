import React, { useState } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Recorder from 'react-mp3-recorder'
import ReactAudioPlayer from 'react-audio-player'
import blobToBuffer from 'blob-to-buffer'

const RecordPage = () => {
  const [url, setUrl] = useState('')

  const _onRecordingComplete = blob => {
    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        console.error(err)
        return
      }

      console.log('recording', blob)

      if (url) {
        window.URL.revokeObjectURL(url)
      }

      setUrl(window.URL.createObjectURL(blob))
    })
  }

  const _onRecordingError = err => {
    console.log('error recording', err)

    if (url) {
      window.URL.revokeObjectURL(url)
    }

    setUrl(null)
  }
  return (
    <Layout>
      <Seo title='Page-2' />
      <div
        className='container d-flex flex-column justify-content-center
        text-center align-center h-100'
      >
        <div>
          <Recorder
            onRecordingComplete={_onRecordingComplete}
            onRecordingError={_onRecordingError}
            className='m-auto'
          />

          <p>Click and hold to start recording.</p>
          {url && (
            <div>
              <ReactAudioPlayer src={url} controls />
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default RecordPage
