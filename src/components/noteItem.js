import React from "react"
import { FaPlay } from "react-icons/fa"

const NoteItem = ({ data, open }) => {
  return (
    <div
      onClick={open}
      className="d-flex flex-column align-content-center justify-content-center align-items-center noteItem m-5"
    >
      <h1>{data.name}</h1>
      <FaPlay size={80} className="my-3" />
      {data.tags.join(", ")}
    </div>
  )
}

export default NoteItem
