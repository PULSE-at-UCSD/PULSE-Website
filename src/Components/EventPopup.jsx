import { useRef } from 'react'
import useDismiss from './useDismiss'
import { eventWhen } from './calendarDates'

// Turns bare URLs in the description into links
function Linkified({ text }) {
    return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
        i % 2 === 1
            ? <a key={i} href={part} target="_blank" rel="noreferrer" className='text-pulseOrange underline break-all'>{part}</a>
            : part
    );
}

export default function EventPopup({ event, onClose }) {
    const panelRef = useRef(null);
    useDismiss(panelRef, true, onClose);

    return(
        <div className='fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/20
                        transition-opacity duration-200 starting:opacity-0'>
            <div ref={panelRef} role='dialog' aria-modal='true' aria-label={event.title}
                className='relative w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 rounded-xl bg-white/70 backdrop-blur-md border-1 border-pulseOrange/30 shadow-lg text-pulseBlue
                           transition-all duration-200 ease-out starting:opacity-0 starting:-translate-y-2'>
                <button type='button' aria-label='Close' onClick={onClose}
                    className='absolute top-3 right-4 text-2xl leading-none cursor-pointer hover:text-pulseOrange transition-colors duration-200'>
                    ×
                </button>
                <h2 className='text-2xl font-bold pr-8'>{event.title}</h2>
                <p className='mt-2 text-lg'>{eventWhen(event)}</p>
                {event.location && <p className='mt-1 text-lg'>📍 {event.location}</p>}
                {event.description &&
                    <p className='mt-4 whitespace-pre-line text-black/80'><Linkified text={event.description}/></p>}
                {event.htmlLink &&
                    <a href={event.htmlLink} target='_blank' rel='noreferrer'
                        className='inline-block mt-5 text-pulseOrange hover:translate-x-1 transition-all duration-200'>
                        Open in Google Calendar →
                    </a>}
            </div>
        </div>
    );
}
