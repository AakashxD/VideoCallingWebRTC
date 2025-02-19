import React from 'react'
import CreateRoom from '../Components/CreateRoom'

const Home:React.FC = () => {
  return (
    <>
      <div className=' h-[100vh] flex justify-center items-center m-4 w-full bg-purple-300'>
      <h1> Enter the room </h1>
      <CreateRoom/>
      </div>
    </>
  )
}

export default Home