import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from './Landing'
import { SignIn } from './Signin'
import { Signup } from './Signup'
import { Preview } from './preview';

function App() {
  return (
    //<Preview/>
    <BrowserRouter>
      <Routes>
          <Route path="/signup" element={<Signup/> }/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/landing" element={<Landing/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
