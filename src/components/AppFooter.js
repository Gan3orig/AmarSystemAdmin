import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      {/* <div>
        <a href="https://majorsoft.mn" target="_blank" rel="noopener noreferrer">
          AI POS System
        </a>
        <span className="ms-1">&copy; 2024 majorsoft.</span>
      </div> */}
      <div className="ms-auto">
        <span className="me-1">Developed</span>
        <a href="https://majorsoft.mn" target="_blank" rel="noopener noreferrer">
          MajorSoft
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
