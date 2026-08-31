import {Routes, Route} from 'react-router'
import Homepage from './Pages/Homepage'
import Aboutpage from './Pages/Aboutpage'
import Eventspage from './Pages/Eventspage'
import NotFoundPage from './Pages/NotFoundPage'
function App() {
    return (
        <div className='bg-pulseWhite min-h-screen m-0'>
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
