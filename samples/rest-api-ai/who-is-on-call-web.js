const http = require("node:http");

const API_URL = "https://connect.signl4.com/api/v3";
const API_KEY = "SIGNL4_API_KEY";
const TEAM_ID = ""; // Optional SIGNL4_TEAM_ID
const PORT = Number(process.env.PORT || 3001);
const HOST = process.env.HOST || "127.0.0.1";
const TIME_ZONE =
  process.env.SIGNL4_TIME_ZONE ||
  Intl.DateTimeFormat().resolvedOptions().timeZone ||
  "UTC";

if (!API_KEY) {
  console.error(
    "SIGNL4_API_KEY is missing.\n" +
      'Set it in PowerShell with:\n$env:SIGNL4_API_KEY = "your-api-key"'
  );
  process.exit(1);
}

const apiHeaders = {
  "X-S4-Api-Key": API_KEY,
  "Content-Type": "application/json",
  Accept: "application/json"
};

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...apiHeaders,
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(
      `${path} failed: ${response.status} ${response.statusText}\n` +
        (await response.text())
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const dateKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

const dayFormatter = new Intl.DateTimeFormat(undefined, {
  timeZone: TIME_ZONE,
  weekday: "short",
  month: "short",
  day: "numeric"
});

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  timeZone: TIME_ZONE,
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit"
});

function dateKey(date) {
  const parts = dateKeyFormatter.formatToParts(date);
  const get = type => parts.find(part => part.type === type)?.value;

  return `${get("year")}-${get("month")}-${get("day")}`;
}

function nextSevenDays(now) {
  const days = [];
  const seen = new Set();

  /*
   * Twelve-hour steps ensure that seven consecutive calendar dates are
   * discovered, including across daylight-saving transitions.
   */
  for (let hours = 0; days.length < 7 && hours < 216; hours += 12) {
    const date = new Date(now.getTime() + hours * 60 * 60 * 1000);
    const key = dateKey(date);

    if (!seen.has(key)) {
      seen.add(key);
      days.push({ key, date });
    }
  }

  return days;
}

function scheduleDateKeys(start, end) {
  const keys = new Set();
  const startDate = new Date(start);
  const endDate = new Date(end);

  const finalInstant = new Date(
    Math.max(startDate.getTime(), endDate.getTime() - 1)
  );

  keys.add(dateKey(startDate));
  keys.add(dateKey(finalInstant));

  /*
   * Add intermediate calendar dates for assignments lasting multiple days.
   */
  for (
    let time = startDate.getTime() + 6 * 60 * 60 * 1000;
    time < finalInstant.getTime();
    time += 6 * 60 * 60 * 1000
  ) {
    keys.add(dateKey(new Date(time)));
  }

  return keys;
}

async function getCalendarData() {
  const start = new Date();
  const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);

  const scheduleFilter = {
    minDate: start.toISOString(),
    maxDate: end.toISOString(),
    limit: 1000
  };

  if (TEAM_ID) {
    scheduleFilter.teamIds = [TEAM_ID];
  }

  /*
   * The endpoint name is included in apiRequest errors, making it clear
   * which request failed.
   */
  const [teams, users, schedules] = await Promise.all([
    apiRequest("/teams"),
    apiRequest("/users"),
    apiRequest("/schedules", {
      method: "POST",
      body: JSON.stringify(scheduleFilter)
    })
  ]);

  const teamNames = new Map(
    (teams || []).map(team => [
      team.id,
      team.name || team.externalName || team.id
    ])
  );

  const userNames = new Map(
    (users || []).map(user => [
      user.id,
      user.name || user.mail || user.id
    ])
  );

  const entries = (schedules || [])
    .map(schedule => ({
      ...schedule,
      teamName:
        teamNames.get(schedule.teamId) ||
        schedule.teamId ||
        "Unknown team",
      userName:
        userNames.get(schedule.userId) ||
        schedule.userId ||
        "Unassigned",
      dateKeys: scheduleDateKeys(schedule.start, schedule.end)
    }))
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  return {
    start,
    end,
    days: nextSevenDays(start),
    entries
  };
}

function renderScheduleCard(entry, dayKey) {
  const start = new Date(entry.start);
  const end = new Date(entry.end);

  const beginsToday = dateKey(start) === dayKey;
  const endsToday = dateKey(new Date(end.getTime() - 1)) === dayKey;

  let timeText;

  if (beginsToday && endsToday) {
    timeText =
      `${timeFormatter.format(start)} – ` +
      `${timeFormatter.format(end)}`;
  } else if (beginsToday) {
    timeText = `From ${timeFormatter.format(start)}`;
  } else if (endsToday) {
    timeText = `Until ${timeFormatter.format(end)}`;
  } else {
    timeText = "All day";
  }

  const tier =
    entry.tierId !== undefined &&
    entry.tierId !== null
      ? `<div class="tier">
           Escalation tier ${escapeHtml(entry.tierId)}
         </div>`
      : "";

  return `
    <article class="shift">
      <div class="shift-time">${escapeHtml(timeText)}</div>
      <div class="user">${escapeHtml(entry.userName)}</div>

      <div class="team">
        <span></span>
        ${escapeHtml(entry.teamName)}
      </div>

      ${tier}
    </article>
  `;
}

function renderPage({ start, end, days, entries }) {
  const calendarDays = days
    .map((day, index) => {
      const dayEntries = entries.filter(entry =>
        entry.dateKeys.has(day.key)
      );

      const shifts = dayEntries.length
        ? dayEntries
            .map(entry => renderScheduleCard(entry, day.key))
            .join("")
        : '<div class="empty">No on-call assignment</div>';

      return `
        <section class="day ${index === 0 ? "today" : ""}">
          <header class="day-header">
            <span>${escapeHtml(dayFormatter.format(day.date))}</span>
            ${index === 0 ? "<strong>Today</strong>" : ""}
          </header>

          <div class="day-content">
            ${shifts}
          </div>
        </section>
      `;
    })
    .join("");

  const range =
    `${dateTimeFormatter.format(start)} – ` +
    `${dateTimeFormatter.format(end)}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Refresh the page every five minutes. -->
  <meta http-equiv="refresh" content="300">

  <title>SIGNL4 On-call Schedule</title>

  <style>
    :root {
      color-scheme: light;
      --blue: #1266e3;
      --navy: #10213b;
      --line: #dce4ee;
      --soft: #f4f7fb;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: Inter, "Segoe UI", Arial, sans-serif;
      color: #17243a;
      background: #eef3f8;
    }

    .topbar {
      height: 8px;
      background: linear-gradient(90deg, #0f66e8, #31b8f2);
    }

    main {
      width: min(1500px, 96%);
      margin: 0 auto;
      padding: 34px 0 48px;
    }

    .heading {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 22px;
    }

    .eyebrow {
      margin: 0 0 7px;
      color: var(--blue);
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.11em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      color: var(--navy);
      font-size: clamp(28px, 4vw, 44px);
      letter-spacing: -0.035em;
    }

    .subtitle {
      margin: 9px 0 0;
      color: #64748b;
      font-size: 15px;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .count {
      color: #64748b;
      font-size: 14px;
      white-space: nowrap;
    }

    button {
      border: 0;
      border-radius: 10px;
      padding: 11px 17px;
      color: white;
      background: var(--blue);
      font: 700 14px inherit;
      cursor: pointer;
      box-shadow: 0 5px 14px #1266e32e;
    }

    button:hover {
      background: #0757ca;
    }

    .calendar {
      display: grid;
      grid-template-columns: repeat(7, minmax(175px, 1fr));
      border: 1px solid var(--line);
      border-radius: 16px;
      overflow: hidden;
      background: white;
      box-shadow: 0 12px 35px #10213b12;
    }

    .day {
      min-width: 0;
      min-height: 430px;
      border-right: 1px solid var(--line);
    }

    .day:last-child {
      border-right: 0;
    }

    .day-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 58px;
      padding: 14px;
      color: #4b5d75;
      background: #f8fafc;
      border-bottom: 1px solid var(--line);
      font-weight: 750;
    }

    .day-header strong {
      padding: 4px 7px;
      border-radius: 999px;
      color: white;
      background: var(--blue);
      font-size: 10px;
      text-transform: uppercase;
    }

    .today {
      background: #f8fbff;
    }

    .today .day-header {
      color: var(--blue);
      background: #eaf3ff;
    }

    .day-content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 11px;
    }

    .shift {
      padding: 12px;
      border: 1px solid #cfe0f5;
      border-left: 4px solid var(--blue);
      border-radius: 10px;
      background: white;
      box-shadow: 0 3px 10px #10213b0d;
    }

    .shift-time {
      margin-bottom: 7px;
      color: var(--blue);
      font-size: 12px;
      font-weight: 800;
    }

    .user {
      color: var(--navy);
      font-size: 15px;
      font-weight: 800;
      overflow-wrap: anywhere;
    }

    .team {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 5px;
      color: #64748b;
      font-size: 12px;
      overflow-wrap: anywhere;
    }

    .team span {
      width: 7px;
      height: 7px;
      flex: 0 0 auto;
      border-radius: 50%;
      background: #35b77a;
    }

    .tier {
      margin-top: 8px;
      padding-top: 7px;
      border-top: 1px solid #edf1f5;
      color: #8a97a9;
      font-size: 11px;
    }

    .empty {
      padding: 24px 9px;
      color: #97a4b4;
      font-size: 13px;
      text-align: center;
    }

    footer {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      margin-top: 14px;
      color: #7c899a;
      font-size: 12px;
    }

    @media (max-width: 1100px) {
      .calendar {
        grid-template-columns: repeat(2, 1fr);
      }

      .day {
        min-height: 260px;
        border-bottom: 1px solid var(--line);
      }
    }

    @media (max-width: 650px) {
      main {
        width: 92%;
        padding-top: 25px;
      }

      .heading {
        align-items: flex-start;
        flex-direction: column;
      }

      .calendar {
        display: block;
      }

      .day {
        min-height: auto;
        border-right: 0;
        border-bottom: 1px solid var(--line);
      }

      .actions {
        width: 100%;
        justify-content: space-between;
      }

      footer {
        flex-direction: column;
        gap: 5px;
      }
    }
  </style>
</head>

<body>
  <div class="topbar"></div>

  <main>
    <div class="heading">
      <div>
        <p class="eyebrow">SIGNL4</p>
        <h1>Upcoming on-call schedule</h1>
        <p class="subtitle">${escapeHtml(range)}</p>
      </div>

      <div class="actions">
        <span class="count">
          ${entries.length}
          assignment${entries.length === 1 ? "" : "s"}
        </span>

        <button onclick="location.reload()">Refresh</button>
      </div>
    </div>

    <div class="calendar">
      ${calendarDays}
    </div>

    <footer>
      <span>Times shown in ${escapeHtml(TIME_ZONE)}</span>
      <span>Automatically refreshes every five minutes</span>
    </footer>
  </main>
</body>
</html>`;
}

function renderError(error) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>SIGNL4 API Error</title>

  <style>
    body {
      margin: 0;
      padding: 40px;
      font-family: "Segoe UI", Arial, sans-serif;
      color: #17243a;
      background: #f3f6fa;
    }

    .box {
      max-width: 900px;
      margin: auto;
      padding: 28px;
      border-radius: 14px;
      background: white;
      box-shadow: 0 10px 30px #10213b16;
    }

    h1 {
      color: #b42318;
    }

    pre {
      overflow: auto;
      padding: 16px;
      border-radius: 8px;
      background: #f8fafc;
      white-space: pre-wrap;
    }

    button {
      padding: 10px 16px;
      border: 0;
      border-radius: 8px;
      color: white;
      background: #1266e3;
      cursor: pointer;
    }
  </style>
</head>

<body>
  <div class="box">
    <h1>Could not load the on-call schedule</h1>

    <p>The SIGNL4 API returned an error:</p>

    <pre>${escapeHtml(error.message)}</pre>

    <button onclick="location.reload()">Try again</button>
  </div>
</body>
</html>`;
}

const server = http.createServer(async (request, response) => {
  if (request.url === "/favicon.ico") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.url !== "/") {
    response.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8"
    });

    response.end("Not found");
    return;
  }

  try {
    const data = await getCalendarData();

    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });

    response.end(renderPage(data));
  } catch (error) {
    console.error(error.message);

    response.writeHead(502, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });

    response.end(renderError(error));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`SIGNL4 on-call calendar: http://${HOST}:${PORT}`);
  console.log(`Time zone: ${TIME_ZONE}`);

  console.log(
    TEAM_ID
      ? `Team filter: ${TEAM_ID}`
      : "Team filter: all accessible teams"
  );
});