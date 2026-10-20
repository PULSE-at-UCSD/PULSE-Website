// Vercel function: proxies the Google Calendar API so the key stays server-side.
// GET /api/events?timeMin=<ISO>&timeMax=<ISO>  ->  { events, subscribeUrl }

const MAX_RANGE_MS = 62 * 24 * 60 * 60 * 1000;  // a month grid is 6 weeks, plus slack

function json(body, status = 200, headers = {}) {
    return Response.json(body, { status, headers });
}

// Google descriptions are HTML; flatten to plain text, keeping line breaks
function toPlainText(html = "") {
    return html
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/(p|div|li)>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
}

export async function GET(request) {
    const apiKey = process.env.CALENDAR_API_KEY?.trim();
    const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim();
    if (!apiKey || !calendarId) {
        return json({ error: "Calendar is not configured" }, 500);
    }

    const params = new URL(request.url).searchParams;
    const timeMin = new Date(params.get("timeMin") ?? "");
    const timeMax = new Date(params.get("timeMax") ?? "");
    if (isNaN(timeMin) || isNaN(timeMax) || timeMax <= timeMin || timeMax - timeMin > MAX_RANGE_MS) {
        return json({ error: "Invalid timeMin/timeMax" }, 400);
    }

    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`);
    url.search = new URLSearchParams({
        key: apiKey,
        singleEvents: "true",  // expands recurring meetings into individual events
        orderBy: "startTime",
        timeZone: "America/Los_Angeles",
        maxResults: "250",
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
    });

    let data;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Google responded ${res.status}`);
        data = await res.json();
    } catch (err) {
        console.error("Calendar fetch failed:", err.message);
        return json({ error: "Couldn't load events" }, 502);
    }

    const events = (data.items ?? [])
        .filter((item) => item.status !== "cancelled")
        .map((item) => ({
            id: item.id,
            title: item.summary || "(No title)",
            allDay: !item.start?.dateTime,
            // All-day events give "YYYY-MM-DD" with an exclusive end date
            start: item.start?.dateTime ?? item.start?.date,
            end: item.end?.dateTime ?? item.end?.date,
            location: item.location ?? "",
            description: toPlainText(item.description),
            htmlLink: item.htmlLink,
            recurringEventId: item.recurringEventId ?? null,
        }));

    return json(
        {
            events,
            subscribeUrl: `https://calendar.google.com/calendar/u/0?cid=${Buffer.from(calendarId).toString("base64")}`,
        },
        200,
        { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
    );
}
