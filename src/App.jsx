import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';


import Homepage from './pages/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className="">
     <Homepage />
      
    </div>
    
    </BrowserRouter>
  )
}

export default App
