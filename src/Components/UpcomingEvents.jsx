import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { eventWhen, todayKey } from './calendarDates'

const MAX_EVENTS = 3;
const LOOKAHEAD_MS = 60 * 24 * 60 * 60 * 1000;  // stays under the API's 62-day cap
const HOUR_MS = 60 * 60 * 1000;

const card = 'w-full md:w-80 p-6 rounded-xl bg-white/70 backdrop-blur-md border-1 border-pulseOrange/30 shadow-lg text-pulseBlue';

function hasEnded(event, now) {
    // All-day ends are exclusive "YYYY-MM-DD" dates
    return event.allDay ? event.end <= todayKey() : new Date(event.end) <= now;
}

// The next few events, one per recurring series, so a weekly meeting can't fill every slot
function pickUpcoming(events, now) {
    const seen = new Set();
    const picked = [];
    for (const event of events) {
        if (hasEnded(event, now)) continue;
        const series = event.recurringEventId ?? event.id;
        if (seen.has(series)) continue;
        seen.add(series);
        picked.push(event);
        if (picked.length === MAX_EVENTS) break;
    }
    return picked;
}

function MessageCard({ children, className = '' }) {
    return <div className={`${card} text-center text-lg ${className}`}>{children}</div>;
}

export default function UpcomingEvents() {
    // null while loading, then an array of events, or 'error'
    const [events, setEvents] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const now = new Date();
        // Round down to the hour so repeat visits share the CDN cache entry
        const from = Math.floor(now.getTime() / HOUR_MS) * HOUR_MS;
        const params = new URLSearchParams({
            timeMin: new Date(from).toISOString(),
            timeMax: new Date(from + LOOKAHEAD_MS).toISOString(),
        });
        fetch(`/api/events?${params}`, { signal: controller.signal })
            .then((res) => {
                if (!res.ok) throw new Error(res.status);
                return res.json();
            })
            .then((json) => setEvents(pickUpcoming(json.events ?? [], now)))
            .catch((err) => {
                if (err.name !== 'AbortError') setEvents('error');
            });
        return () => controller.abort();
    }, []);

    let cards;
    if (events === null) {
        cards = Array.from({ length: MAX_EVENTS }, (_, i) => (
            <div key={i} className={`${card} flex flex-col gap-3 animate-pulse`}>
                <div className='h-7 w-3/4 rounded bg-pulseBlue/10'/>
                <div className='h-5 w-1/2 rounded bg-pulseBlue/10'/>
                <div className='h-5 w-1/3 rounded bg-pulseBlue/10'/>
            </div>
        ));
    } else if (events === 'error') {
        cards = <MessageCard className='text-pulseOrange'>Couldn't load events. Please try again later.</MessageCard>;
    } else if (events.length === 0) {
        cards = <MessageCard>No upcoming events right now — check back soon!</MessageCard>;
    } else {
        cards = events.map((event) => (
            <Link key={event.id} to='/events'
                className={`${card} flex flex-col gap-2 hover:border-pulseOrange hover:-translate-y-1 transition-all duration-200`}>
                <h3 className='text-xl font-bold'>{event.title}</h3>
                <p>{eventWhen(event)}</p>
                {event.location && <p>📍 {event.location}</p>}
            </Link>
        ));
    }

    return(
        <div>
            <div className='flex flex-wrap justify-center gap-6'>{cards}</div>
            <div className='flex justify-center mt-8'>
                <Link to='/events' className='text-xl text-pulseOrange hover:translate-x-1 transition-all duration-200'>
                    See all events →
                </Link>
            </div>
        </div>
    );
}
