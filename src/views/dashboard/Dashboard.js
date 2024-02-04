import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

import {
  CCard,
  CCardHeader,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAvatar,
  CButton,
  CCardBody,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import { io } from 'socket.io-client'

const Dashboard = () => {
  const URL = 'http://localhost:4001'
  const socket = io(URL)
  const [customer, setCustomer] = useState(new Customer('1','2'))
  const [tableExample, setTable] = useState([
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
  ])
  console.log('rendering')
  useEffect(() => {
    // Code here will run once when the component mounts
    console.log('Component mounted');
    socket.on('connect', () => {
      console.log('connected')
    })
  
    socket.on('chat message', (msg, serverOffset) => {
      if(msg =="new app connected"){
        console.log("new app connected")
        return
      }
      if (msg.indexOf("first_name") == -1) {
        return;
      }
      const customerObj = JSON.parse(msg)


      setCustomer(new Customer(customerObj.first_name, customerObj.last_name))
      tableExample.push( {
        avatar: { src: avatar1, status: 'success' },
        user: {
          name: customerObj.first_name + ' ' + customerObj.last_name,
          new: true,
          registered: 'Jan 1, 2023',
        },
        country: { name: 'USA', flag: cifUs },
        usage: {
          value: 50,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'success',
        },
        payment: { name: 'Mastercard', icon: cibCcMastercard },
        activity: '10 sec ago',
      })
      setTable(tableExample)
      setVisible(!visible)
      // const item = document.createElement('li')
      // item.textContent = msg
      // messages.appendChild(item)
      // window.scrollTo(0, document.body.scrollHeight)
      // socket.auth.serverOffset = serverOffset
    })
  

    // Any cleanup code can go in the return function
    return () => {
      console.log('Component will unmount');
    };
  }, []); // Empty dependency array means it will only run once

  // const socket = io({
  //   auth: {
  //     serverOffset: 0
  //   },
  //   ackTimeout: 10000,
  //   retries: 3,
  // })

 
  const [visible, setVisible] = useState(false)

  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>New Customer Signed in!</CModalTitle>
        </CModalHeader>
        <CModalBody>{customer.first_name + ' ' +customer.last_name}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Your Customers </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                    
                    
                    <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      
                    
                    
                      <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Signed-in</div>
                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

class Customer{
  first_name
  last_name
  constructor(first_name, last_name) {
    this.first_name = first_name
    this.last_name = last_name
  }
}
export default Dashboard
