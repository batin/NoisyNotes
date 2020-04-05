import React from 'react'

const Header = () => {
  return (
    <header className='container-fluid d-flex w-100 header justify-content-between'>
      <div className='header-img' />
      <div className='d-flex buttons'>
        <button className='btn btn-1'>giris yap</button>
        <button className='btn btn-2'>kayit ol</button>
      </div>
    </header>
  )
}

export default Header
