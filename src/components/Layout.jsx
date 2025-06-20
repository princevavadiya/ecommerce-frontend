import React from 'react'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import { Outlet } from 'react-router'


function Layout() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <Outlet />
    </>)

}

export default Layout