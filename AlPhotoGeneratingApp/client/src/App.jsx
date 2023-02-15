import React from 'react'
import { HomePage,CreatePostPage } from './component'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Header from './component/Header'

const App = () => {
  return (
    <BrowserRouter>
     <Header />
      <main className='sm:p-8 px-4 lg:w-5/6 lg:mx-auto py-8 w-full border-b-[#e6ebf4] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route  path="/" element={<HomePage />}/>
          <Route  path="/create-post" element={<CreatePostPage />}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App