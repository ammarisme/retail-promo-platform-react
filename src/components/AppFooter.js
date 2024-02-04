import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CusConnect
        </a>
        <span className="ms-1">&copy; 2023 thesellerstack.com</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://thesellerstack.com" target="_blank" rel="noopener noreferrer">
          TheSellerStack.com
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
