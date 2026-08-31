import {Routes, Route} from 'react-router'
import Homepage from './Pages/Homepage'
import Aboutpage from './Pages/Aboutpage'
import Eventspage from './Pages/Eventspage'
import NotFoundPage from './Pages/NotFoundPage'
function App() {
    return (
        <div className='bg-pulseWhite h-dvh pt-3 px-3'>
            <Routes>
                <Route index element={<Homepage/>}/>
                <Route path="about" element={<Aboutpage/>}/>
                <Route path="events" element={<Eventspage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
  )
}

export default App
