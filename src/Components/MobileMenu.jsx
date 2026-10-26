import { Link } from 'react-router'
import { useState, useRef, useCallback } from 'react'
import useDismiss from './useDismiss'

const linkStyle = 'block px-5 py-2 text-xl hover:text-pulseOrange hover:translate-x-1 transition-all duration-200';
const barStyle = 'absolute left-0 w-full h-0.5 rounded-full bg-black';

export default function MobileMenu({aboutPages = [], aboutLinks = [], joinUrl = "", className = ""}){
    const [isOpen, setIsOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const menuRef = useRef(null);

    const close = useCallback(() => {
        setIsOpen(false);
        setAboutOpen(false);
    }, []);

    useDismiss(menuRef, isOpen, close);

    return(
        <div ref={menuRef} className={className}>
            {/* Hamburger - switches to an X when open */}
            <button type="button" aria-label="Menu" aria-expanded={isOpen}
                className='relative block w-7 h-5 cursor-pointer'
                onClick={() => isOpen ? close() : setIsOpen(true)}>
                <span className={`${barStyle} ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`}></span>
                <span className={`${barStyle} top-1/2 -translate-y-1/2 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`${barStyle} ${isOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'}`}></span>
            </button>

            {/* Positioned against the nav bar, so it spans the nav's full width */}
            <div className={`absolute inset-x-0 top-full mt-3 py-2 rounded-xl bg-white/70 backdrop-blur-md border-1 border-pulseOrange/30 shadow-lg
                            transition-all duration-200 ease-out
                            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <Link to="/" onClick={close} className={linkStyle}>Home</Link>

                <button type="button" onClick={() => setAboutOpen((prev) => !prev)}
                    className={`${linkStyle} w-full text-left cursor-pointer ${aboutOpen ? 'text-pulseOrange' : ''}`}>
                    About
                </button>
                <div className={`grid transition-all duration-200 ease-out ${aboutOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className='overflow-hidden pl-4'>
                        {aboutPages.map((page, index) =>
                            <Link key={aboutLinks[index]} to={aboutLinks[index]} onClick={close} className={linkStyle}>{page}</Link>
                        )}
                    </div>
                </div>

                <Link to="/events" onClick={close} className={linkStyle}>Events</Link>

                <div className='hidden px-5 pt-2 pb-1'>
                    <button type="button" onClick={() => { window.open(joinUrl); close(); }}
                        className="w-full text-xl rounded-lg bg-pulseYellow py-1 text-pulseOrange cursor-pointer hover:bg-amber-200 hover:text-orange-400 transition-colors duration-200">
                        Join
                    </button>
                </div>
            </div>
        </div>
    );
}
