// Date helpers for the events calendar. Days are handled as "YYYY-MM-DD" keys
// in the club's timezone, so the grid matches San Diego no matter where the
// visitor is.
export const TIME_ZONE = 'America/Los_Angeles';

const keyFormat = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit' });
const timeFormat = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, hour: 'numeric', minute: '2-digit' });
const longDateFormat = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric' });
const monthFormat = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric' });

// Calendar arithmetic is done on UTC dates so DST never shifts a day
function fromKey(key) {
    const [y, m, d] = key.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d));
}
function toKey(date) {
    return date.toISOString().slice(0, 10);
}
export function addDays(key, days) {
    const date = fromKey(key);
    date.setUTCDate(date.getUTCDate() + days);
    return toKey(date);
}

export function todayKey() {
    return keyFormat.format(new Date());
}

// "2026-10" style month keys
export function monthOf(key) {
    return key.slice(0, 7);
}
export function shiftMonth(month, delta) {
    const [y, m] = month.split('-').map(Number);
    return toKey(new Date(Date.UTC(y, m - 1 + delta, 1))).slice(0, 7);
}
export function monthLabel(month) {
    return monthFormat.format(fromKey(`${month}-01`));
}

// The 42 day keys (6 Sunday-first weeks) shown for a month
export function monthGrid(month) {
    const first = `${month}-01`;
    const start = addDays(first, -fromKey(first).getUTCDay());
    return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

export function dayNumber(key) {
    return Number(key.slice(8));
}
export function longDate(key) {
    return longDateFormat.format(fromKey(key));
}

// "6pm" / "6:30pm"
export function shortTime(iso) {
    return timeFormat.format(new Date(iso)).replace(':00', '').replace(' ', '').toLowerCase();
}

// Every day key an event touches. All-day ends are exclusive; timed events
// ending exactly at midnight don't spill into the next day.
function eventDays(event) {
    const first = event.allDay ? event.start : keyFormat.format(new Date(event.start));
    const last = event.allDay
        ? addDays(event.end, -1)
        : keyFormat.format(new Date(new Date(event.end).getTime() - 1));
    const days = [first];
    while (days[days.length - 1] < last) days.push(addDays(days[days.length - 1], 1));
    return days;
}

export function eventsByDay(events) {
    const map = new Map();
    for (const event of events) {
        for (const day of eventDays(event)) {
            if (!map.has(day)) map.set(day, []);
            map.get(day).push(event);
        }
    }
    return map;
}

// "Thursday, October 22 · 6pm – 8pm", or a date range for multi-day events
export function eventWhen(event) {
    const days = eventDays(event);
    const dates = days.length > 1
        ? `${longDate(days[0])} – ${longDate(days[days.length - 1])}`
        : longDate(days[0]);
    if (event.allDay) return dates;
    return `${dates} · ${shortTime(event.start)} – ${shortTime(event.end)}`;
}
