const API_URL = "https://connect.signl4.com/api/v3";
const API_KEY = "SIGNL4_API_KEY";
const TEAM_ID = "";  // Optional SIGNL4_TEAM_ID


if (!API_KEY) {
  console.error(
    "SIGNL4_API_KEY is missing.\n" +
    'Set it in PowerShell with:\n$env:SIGNL4_API_KEY = "your-api-key"'
  );
  process.exit(1);
}

const headers = {
  "X-S4-Api-Key": API_KEY,
  "Content-Type": "application/json",
  Accept: "application/json"
};

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  });

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(
      `${path} failed: ${response.status} ${response.statusText}\n` +
      responseText
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function formatDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(date));
}

async function main() {
  const start = new Date();
  const end = new Date(start);

  end.setUTCDate(end.getUTCDate() + 7);

  const scheduleFilter = {
    minDate: start.toISOString(),
    maxDate: end.toISOString(),
    limit: 1000
  };

  if (TEAM_ID) {
    scheduleFilter.teamIds = [TEAM_ID];
    console.log(`Retrieving schedule for team ${TEAM_ID} ...`);
  } else {
    console.log("Retrieving schedules for all accessible teams ...");
    console.log(
      "Tip: Set SIGNL4_TEAM_ID if you want to retrieve only one team."
    );
  }

  /*
   * Requests are made separately so the error message clearly indicates
   * which SIGNL4 endpoint failed.
   */
  console.log("Retrieving teams ...");
  const teams = await apiRequest("/teams");

  console.log("Retrieving users ...");
  const users = await apiRequest("/users");

  console.log("Retrieving schedules ...");
  const schedules = await apiRequest("/schedules", {
    method: "POST",
    body: JSON.stringify(scheduleFilter)
  });

  const userNames = new Map(
    (users || []).map(user => [
      user.id,
      user.name || user.mail || user.id
    ])
  );

  const teamNames = new Map(
    (teams || []).map(team => [
      team.id,
      team.name || team.externalName || team.id
    ])
  );

  const result = (schedules || [])
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .map(schedule => ({
      Team: teamNames.get(schedule.teamId) || schedule.teamId || "Unknown",
      "On-call user":
        userNames.get(schedule.userId) || schedule.userId || "Unknown",
      Start: formatDate(schedule.start),
      End: formatDate(schedule.end),
      Tier: schedule.tierId
    }));

  console.log(
    `\nUpcoming on-call schedule: ${formatDate(start)} – ${formatDate(end)}\n`
  );

  if (result.length === 0) {
    console.log("No on-call assignments found for the next seven days.");
    return;
  }

  console.table(result);
}

main().catch(error => {
  console.error("\nSIGNL4 API request failed:");
  console.error(error.message);
  process.exit(1);
});
