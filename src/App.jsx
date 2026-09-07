import {Routes, Route} from 'react-router'
import Homepage from './Pages/Homepage.jsx'
import OurMissionpage from './Pages/OurMissionpage.jsx'
import Boardpage from './Pages/Boardpage.jsx'
import Eventspage from './Pages/Eventspage.jsx'
import NotFoundPage from './Pages/NotFoundPage.jsx'
function App() {
    return (
        <div className='flex flex-col bg-pulseWhite min-h-screen m-0'>
            <Routes>
                <Route index element={<Homepage/>}/>
                <Route path="our-mission" element={<OurMissionpage/>}/>
                <Route path="board" element={<Boardpage/>}/>
                <Route path="events" element={<Eventspage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
  )
}

export default App

