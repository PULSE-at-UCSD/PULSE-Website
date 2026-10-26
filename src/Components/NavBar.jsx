import { Link } from 'react-router'
import myLogo from '../Assets/pulse-logos/orangePulse.png'
import Dropdown from './Dropdown';
import MobileMenu from './MobileMenu';

const aboutPages = ["Our Mission", "Board"];
const aboutLinks = ["/our-mission", "/board"];
const joinUrl = "https://docs.google.com/forms/d/e/1FAIpQLSccz3VRtcmbl_kfuhE94vAyzo4o__pEpltvJCwBevct4CW9uA/viewform";

export default function NavBar() {
    return(
        <nav className="flex bg-white rounded-4xl shadow-lg shadow-black/20 p-1 items-center sticky top-0 mx-4 md:mx-20 my-4 z-100">
            <Link to="/"><img src={myLogo} className='min-w-24 max-w-24 mx-3'></img></Link>
            <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 lg:gap-35 md:gap-15 text-2xl items-center">
                <li><Link to="/"><span className='hover:text-pulseOrange duration-200'>Home</span></Link></li>
                <li className='relative cursor-pointer'>
                    <Dropdown titleName='About' pages={aboutPages} links={aboutLinks}/>
                </li>
                <li><Link to="/events"><span className='hover:text-pulseOrange duration-200'>Events</span></Link></li>
            </ul>
            <button className="hidden md:hidden mr-10 ml-auto text-2xl rounded-lg bg-pulseYellow px-5 py-1 text-pulseOrange bold cursor-pointer hover:bg-amber-200 hover:text-orange-400 transition-colors duration-200"
                        type="button" onClick={() => window.open(joinUrl)}>Join</button>
            <MobileMenu className='md:hidden ml-auto mr-5' aboutPages={aboutPages} aboutLinks={aboutLinks} joinUrl={joinUrl}/>
        </nav>
    );
}
