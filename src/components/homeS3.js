import React from "react"
import { FiMusic } from "react-icons/fi"
import { FaSearch, FaPlay } from "react-icons/fa"
import { navigate } from "gatsby"

const Section3 = () => {
  return (
    <section className="section3">
      <div className="container d-flex h-100">
        <div className="col-4 s3Item">
          <FaSearch />
          <h4>Arama Yap</h4>
          <p>
            Vero mi nascetur. Usus's eum ex'se corrupti hic privato hac hitmari
            per in minim ordinum sentiunt.
          </p>
        </div>
        <div className="col-4 s3Item middle">
          <FiMusic />
          <h4>Notlarını Kaydet</h4>
          <p>
            Vero mi nascetur. Usus's eum ex'se corrupti hic privato hac hitmari
            per in minim ordinum sentiunt.
          </p>
          <button
            onClick={() => {
              navigate("/register")
            }}
            className="btn"
          >
            Ücretsiz Üye Ol
          </button>
        </div>
        <div className="col-4 s3Item">
          <FaPlay />
          <h4>İstediğinde Dinle</h4>
          <p>
            Vero mi nascetur. Usus's eum ex'se corrupti hic privato hac hitmari
            per in minim ordinum sentiunt.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Section3
