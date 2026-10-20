import { useRef, useState, useLayoutEffect, useCallback } from 'react'
import useDismiss from './useDismiss'
import { eventWhen } from './calendarDates'

const GAP = 8;          // px between the popover and what it points at
const GRID_WIDTH = 320; // popover width beside a grid cell

// Turns bare URLs in the description into links
function Linkified({ text }) {
    return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
        i % 2 === 1
            ? <a key={i} href={part} target="_blank" rel="noreferrer" className='text-pulseOrange underline break-all'>{part}</a>
            : part
    );
}

// Event details anchored to the clicked event: beside its day cell when it's in
// the month grid (flipping left near the edge), otherwise directly below it.
// Positioned inside `container`, so it scrolls along with the event.
export default function EventPopup({ event, anchor, container, onClose }) {
    const panelRef = useRef(null);
    const [pos, setPos] = useState({ top: 0, left: 0, width: GRID_WIDTH });

    useLayoutEffect(() => {
        function place() {
            const box = container.current.getBoundingClientRect();
            const target = anchor.getBoundingClientRect();
            const cell = anchor.closest('[data-day]');
            if (!cell) {
                setPos({ top: target.bottom - box.top + GAP, left: target.left - box.left, width: target.width });
                return;
            }
            const cellBox = cell.getBoundingClientRect();
            let left = cellBox.right - box.left + GAP;
            if (left + GRID_WIDTH > box.width) left = cellBox.left - box.left - GAP - GRID_WIDTH;
            const maxTop = box.height - panelRef.current.offsetHeight;
            setPos({
                top: Math.max(0, Math.min(target.top - box.top, maxTop)),
                left: Math.max(0, left),
                width: GRID_WIDTH,
            });
        }
        place();
        window.addEventListener('resize', place);
        return () => window.removeEventListener('resize', place);
    }, [anchor, container]);

    // Clicks on the anchor are left to its own handler, so clicking it again toggles
    const dismiss = useCallback((e) => {
        if (anchor.contains(e.target)) return;
        if (e.type === 'keydown') anchor.focus();
        onClose();
    }, [anchor, onClose]);
    useDismiss(panelRef, true, dismiss);

    return(
        <div ref={panelRef} role='dialog' aria-label={event.title} style={pos}
            className='absolute z-50 max-h-96 overflow-y-auto p-5 rounded-xl bg-white/90 backdrop-blur-md border-1 border-pulseOrange/30 shadow-lg text-pulseBlue
                       transition-[opacity,translate] duration-200 ease-out starting:opacity-0 starting:-translate-y-2'>
            <button type='button' aria-label='Close' onClick={onClose}
                className='absolute top-2 right-3 text-2xl leading-none cursor-pointer hover:text-pulseOrange transition-colors duration-200'>
                ×
            </button>
            <h2 className='text-xl font-bold pr-6'>{event.title}</h2>
            <p className='mt-2'>{eventWhen(event)}</p>
            {event.location && <p className='mt-1'>📍 {event.location}</p>}
            {event.description &&
                <p className='mt-3 whitespace-pre-line text-black/80'><Linkified text={event.description}/></p>}
            {event.htmlLink &&
                <a href={event.htmlLink} target='_blank' rel='noreferrer'
                    className='inline-block mt-4 text-pulseOrange hover:translate-x-1 transition-all duration-200'>
                    Open in Google Calendar →
                </a>}
        </div>
    );
}
