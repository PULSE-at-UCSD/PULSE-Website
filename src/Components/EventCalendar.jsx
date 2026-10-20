import { useState, useEffect, useMemo, useCallback } from 'react'
import EventPopup from './EventPopup'
import { todayKey, monthOf, shiftMonth, monthLabel, monthGrid, addDays, dayNumber, longDate, shortTime, eventsByDay } from './calendarDates'

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MAX_PER_CELL = 3;  // desktop cells show this many before "+N more"

const glass = 'rounded-xl bg-white/70 backdrop-blur-md border-1 border-pulseOrange/30 shadow-lg';
const navButton = 'px-3 py-1 rounded-lg cursor-pointer hover:text-pulseOrange transition-colors duration-200';

function EventBlock({ event, onSelect, className = "" }) {
    return(
        <button type='button' onClick={(e) => { e.stopPropagation(); onSelect(event); }}
            className={`block w-full text-left rounded-md bg-pulseOrange text-white px-2 py-0.5 truncate cursor-pointer
                        hover:bg-orange-400 transition-colors duration-200 ${className}`}>
            {!event.allDay && <span className='font-bold mr-1'>{shortTime(event.start)}</span>}
            {event.title}
        </button>
    );
}

export default function EventCalendar() {
    const today = todayKey();
    const [month, setMonth] = useState(monthOf(today));
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    // Responses per month, so flipping back to a month doesn't refetch
    const [loaded, setLoaded] = useState({});
    const [failed, setFailed] = useState({});

    const grid = useMemo(() => monthGrid(month), [month]);
    const data = loaded[month];
    const byDay = useMemo(() => eventsByDay(data?.events ?? []), [data]);
    const loading = !data && !failed[month];

    useEffect(() => {
        if (loaded[month]) return;
        const controller = new AbortController();
        const params = new URLSearchParams({
            // A day of slack each side covers any timezone offset
            timeMin: `${addDays(grid[0], -1)}T00:00:00Z`,
            timeMax: `${addDays(grid[grid.length - 1], 2)}T00:00:00Z`,
        });
        fetch(`/api/events?${params}`, { signal: controller.signal })
            .then((res) => {
                if (!res.ok) throw new Error(res.status);
                return res.json();
            })
            .then((json) => setLoaded((prev) => ({ ...prev, [month]: json })))
            .catch((err) => {
                if (err.name !== 'AbortError') setFailed((prev) => ({ ...prev, [month]: true }));
            });
        return () => controller.abort();
    }, [month, grid, loaded]);

    function goTo(newMonth) {
        setMonth(newMonth);
        setSelectedDay(null);
        setFailed((prev) => ({ ...prev, [newMonth]: false }));  // retry on revisit
    }

    const closePopup = useCallback(() => setSelectedEvent(null), []);
    const dayEvents = selectedDay ? byDay.get(selectedDay) ?? [] : [];
    const subscribeUrl = data?.subscribeUrl ?? Object.values(loaded)[0]?.subscribeUrl;

    return(
        <div className='text-pulseBlue'>
            <div className={`${glass} p-3 md:p-5`}>
                {/* Month header */}
                <div className='flex items-center justify-between mb-3'>
                    <button type='button' aria-label='Previous month' className={`${navButton} text-2xl`}
                        onClick={() => goTo(shiftMonth(month, -1))}>‹</button>
                    <div className='flex items-center gap-3'>
                        <h2 className='text-2xl md:text-3xl font-bold'>{monthLabel(month)}</h2>
                        {month !== monthOf(today) &&
                            <button type='button' className={`${navButton} text-sm border-1 border-pulseBlue/30`}
                                onClick={() => goTo(monthOf(today))}>Today</button>}
                    </div>
                    <button type='button' aria-label='Next month' className={`${navButton} text-2xl`}
                        onClick={() => goTo(shiftMonth(month, 1))}>›</button>
                </div>

                {failed[month] &&
                    <p className='text-center text-pulseOrange mb-3'>Couldn't load events. Please try again later.</p>}

                {/* Weekday row */}
                <div className='grid grid-cols-7 text-center text-sm md:text-base font-bold pb-2'>
                    {WEEKDAYS.map((day) => <div key={day}>{day}</div>)}
                </div>

                {/* Day cells */}
                <div className={`grid grid-cols-7 border-t-1 border-l-1 border-pulseBlue/15 ${loading ? 'animate-pulse' : ''}`}>
                    {grid.map((day) => {
                        const events = byDay.get(day) ?? [];
                        const inMonth = monthOf(day) === month;
                        const isSelected = day === selectedDay;
                        return(
                            <div key={day} onClick={() => setSelectedDay(isSelected ? null : day)}
                                className={`min-h-14 md:min-h-28 p-1 border-r-1 border-b-1 border-pulseBlue/15 cursor-pointer
                                            transition-colors duration-200 hover:bg-pulseOrange/5
                                            ${inMonth ? '' : 'opacity-40'} ${isSelected ? 'bg-pulseOrange/10' : ''}`}>
                                <span aria-label={longDate(day)}
                                    className={`flex items-center justify-center size-7 mx-auto md:mx-0 rounded-full text-sm md:text-base
                                                ${day === today ? 'bg-pulseOrange text-white font-bold' : ''}`}>
                                    {dayNumber(day)}
                                </span>

                                {/* Mobile: dots */}
                                <div className='md:hidden flex flex-wrap justify-center gap-0.5 mt-1'>
                                    {events.slice(0, 3).map((event) => (
                                        <span key={event.id} className='size-1.5 rounded-full bg-pulseOrange'></span>
                                    ))}
                                </div>

                                {/* Desktop: event blocks */}
                                <div className='hidden md:flex flex-col gap-1 mt-1 text-sm'>
                                    {events.slice(0, MAX_PER_CELL).map((event) => (
                                        <EventBlock key={event.id} event={event} onSelect={setSelectedEvent}/>
                                    ))}
                                    {events.length > MAX_PER_CELL &&
                                        <span className='px-2 text-pulseOrange hover:underline'>
                                            +{events.length - MAX_PER_CELL} more
                                        </span>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Selected day's events */}
                {selectedDay &&
                    <div className='mt-4'>
                        <h3 className='text-xl font-bold mb-2'>{longDate(selectedDay)}</h3>
                        {dayEvents.length === 0
                            ? <p className='text-black/60'>No events this day.</p>
                            : <div className='flex flex-col gap-2 text-lg'>
                                {dayEvents.map((event) => (
                                    <EventBlock key={event.id} event={event} onSelect={setSelectedEvent} className='py-1.5'/>
                                ))}
                            </div>}
                    </div>}
            </div>

            {subscribeUrl &&
                <div className='flex justify-center mt-5'>
                    <a href={subscribeUrl} target='_blank' rel='noreferrer'
                        className='text-xl rounded-lg bg-pulseYellow px-5 py-1 text-pulseOrange hover:bg-amber-200 hover:text-orange-400 transition-colors duration-200'>
                        Add to my Google Calendar
                    </a>
                </div>}

            {selectedEvent && <EventPopup event={selectedEvent} onClose={closePopup}/>}
        </div>
    );
}
