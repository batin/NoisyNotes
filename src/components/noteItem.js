import React from "react"
import { FaPlay } from "react-icons/fa"

const NoteItem = ({ data, open }) => {
  return (
    <div
      onClick={open}
      className="d-flex flex-column align-content-center justify-content-center align-items-center noteItem m-5"
    >
      <h1>{data.Title}</h1>
      <FaPlay size={80} className="my-3" />
      <div className="d-flex">
        {data.Tags.map((tag, key) => {
          return (
            <p key={key}>
              #{tag.Title}
              {key === data.Tags.length - 1 ? "" : ", "}
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default NoteItem
