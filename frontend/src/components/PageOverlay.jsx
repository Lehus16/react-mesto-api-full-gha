import React from 'react'

const PageOverlay = ({ isLoading, Logo }) => {
  return (
    <div className={`page-overlay ${!isLoading ? 'hidden' : ''}`}>
      <img
        className="page-overlay__logo"
        src={Logo}
        alt=""
      />
    </div>
  )
}

export default PageOverlay
