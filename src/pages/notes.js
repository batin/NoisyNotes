import React, { useState, useContext, useEffect } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import emptyState from "../images/empty.svg"
import { FiPlus } from "react-icons/fi"
import AddNotePopup from "../components/addNotePopup"
import NoteItem from "../components/noteItem"
import Note from "../components/note"
import "../styles/index.scss"
import { AuthContext } from "../services/auth"
import { navigate } from "gatsby"
import axios from "axios"

const Notes = () => {
  const state = useContext(AuthContext)
  const [noises, setNoises] = useState(null)
  const [popup, setPopup] = useState(false)
  const [selected, setSelected] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    console.log(state.token)
    fetchNoises()
  }, [])

  useEffect(() => {
    fetchNoises()
  }, [popup, selected, query])

  const renderNoises = () => {
    return noises.map((note, key) => {
      return (
        <NoteItem
          data={note}
          key={key}
          open={() => {
            setSelected(note)
          }}
        />
      )
    })
  }

  const fetchNoises = async () => {
    try {
      if (!state.token) {
        navigate("/")
      } else {
        const saved = await axios({
          method: "GET",
          url: `https://noisy-notes.herokuapp.com/user/noises?q=${query}`,
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        await setNoises(saved.data)
        await state.setNoises(saved.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

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
        {noises ? (
          <div className="d-flex flex-column justify-content-center align-items-center normalState">
            <div className="searchBar d-flex flex-wrap justify-content-between align-items-center">
              <input
                value={query}
                onChange={e => {
                  setQuery(e.target.value)
                }}
                type="text"
                placeholder="Notlarda Ara..."
              />
              <button onClick={() => setPopup(true)} className="btn">
                <FiPlus size={15} className="plus" strokeWidth="3" />
                <span> Yeni Not</span>
              </button>
            </div>
            {state.user && noises ? (
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {renderNoises()}
              </div>
            ) : (
              <div />
            )}
          </div>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center emptyState">
            <img src={emptyState} alt="" />
            <h1 className="empty">Burada hiç kayıtlı not yok :( </h1>
            <button onClick={() => setPopup(true)} className="btn button">
              <FiPlus size={20} className="plus" /> <span> Yeni Not</span>
            </button>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default Notes
