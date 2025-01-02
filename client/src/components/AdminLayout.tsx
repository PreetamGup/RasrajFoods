import React from 'react'
import AsideBar from './layout/AsideBar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='flex'>
        <AsideBar />
        <Outlet />
      {/* Admin Dashboard Content */}
    </div>
  )
}

export default AdminLayout