import React from 'react'
import CreateRoom from '../Components/CreateRoom'

const Home:React.FC = () => {
  return (
    <>
      <div className=' h-[100vh] flex justify-center items-center  w-full bg-gray-800' >
      <CreateRoom/>
      </div>
    </>
  )
}

export default Home