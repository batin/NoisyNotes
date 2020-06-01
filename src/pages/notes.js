import React, { useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import emptyState from "../images/empty.svg"
import { FiPlus } from "react-icons/fi"
import AddNotePopup from "../components/addNotePopup"
import NoteItem from "../components/noteItem"
import Note from "../components/note"
import "../styles/index.scss"

const Section1 = () => {
  const [empty, setEmpty] = useState(false)
  const [popup, setPopup] = useState(false)
  const [selected, setSelected] = useState(false)
  // const state = useContext(AuthContext)
  const notes = [
    {
      name: "note 1",
      url: "url",
      tags: ["#fizik", "#uni", "#school"],
    },
    {
      name: "note 2",
      url: "url2",
      tags: ["#javascript", "#jsx", "#react"],
    },
    {
      name: "note 3",
      url: "url3",
      tags: ["#javascript", "#jsx", "#react"],
    },
    {
      name: "note 4",
      url: "url4",
      tags: ["#javascript", "#jsx", "#react"],
    },
    {
      name: "note 5",
      url: "url5",
      tags: ["#javascript", "#jsx", "#react"],
    },
  ]

  const close = () => {
    setPopup(false)
    setSelected(false)
  }

  return (
    <Layout pageName="Notlarım">
      <Seo title="Notlarım" />
      <section className="section1">
        {popup ? (
          <div className="d-flex popupContainer justify-content-center align-content-center">
            <div className="popup">
              <AddNotePopup close={close} />
            </div>
          </div>
        ) : (
          <div />
        )}
        {selected ? (
          <div className="d-flex popupContainer justify-content-center align-content-center">
            <div className="popup">
              <Note close={close} data={selected} />
            </div>
          </div>
        ) : (
          <div />
        )}
        {empty ? (
          <div className="d-flex flex-column justify-content-center align-items-center emptyState">
            <img src={emptyState} alt="" srcset="" />
            <h1 className="empty">Burada hiç kayıtlı not yok :( </h1>
            <button onClick={() => setPopup(true)} className="btn button">
              <FiPlus size={20} className="plus" /> <span> Yeni Not</span>
            </button>
          </div>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center normalState">
            <div className="searchBar d-flex flex-wrap justify-content-between align-items-center">
              <input type="text" placeholder="Notlarda Ara..." />
              <button onClick={() => setPopup(true)} className="btn">
                <FiPlus size={15} className="plus" /> <span> Yeni Not</span>
              </button>
            </div>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {notes.map((note, key) => {
                return (
                  <NoteItem
                    data={note}
                    key={key}
                    open={() => {
                      setSelected(note)
                    }}
                  />
                )
              })}
            </div>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default Section1
