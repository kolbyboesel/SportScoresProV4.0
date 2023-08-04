const NBA = "2";
const MLB = "64";
const NFL = "63";
const NHL = "4";
const NCAAB = "2";
const CFB = "63";
const CBaseball = "64";
const Prem = "1";
const LaLiga = "1";
const SerieA = "1";
const Bundesliga = "1";
const Ligue1 = "1";
const MLS = "1";

const sportArray = [
  NBA,
  MLB,
  NFL,
  NHL,
  NCAAB,
  CFB,
  CBaseball,
  Prem,
  LaLiga,
  SerieA,
  Bundesliga,
  Ligue1,
  MLS,
];

function clear(elementID) {
  let container = document.querySelector("." + elementID);
  container.innerHTML = "";
}

const url = "https://sofascores.p.rapidapi.com/v1/sports";
const generalOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7c01195a20mshbc9188a6ca4f5a5p1ce61cjsn5e640810eca6",
    "X-RapidAPI-Host": "sofascores.p.rapidapi.com",
  },
};

async function getAllData(url) {
  try {
    const response = await fetch(url, generalOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

function formatEventDate(epochTIS) {
  let milliseconds = epochTIS * 1000;
  let date = new Date(milliseconds);
  date.setHours(date.getHours());
  let startTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (date.getHours() < 12) {
    startTime = date.getHours() + ":" + minutes + " AM";
  } else if (date.getHours() == 12) {
    startTime = date.getHours() + ":" + minutes + " PM";
  } else {
    startTime = date.getHours() - 12 + ":" + minutes + " PM";
  }

  return date.toLocaleDateString() + " Start Time: " + startTime;
}

function AddNoLiveDataTxt() {
  return `<div class="page-text">No Live Games, Check Back Later!</div>`;
}

function AddNoAvailableDataTxt() {
  return `<div class="page-text">No Games Available From the Selected Date</div>`;
}

function searchEventScores(searchDate) {
  console.log(searchDate);
}

async function loadScoreboard(
  live,
  sportID,
  league,
  containerName,
  loadingName,
  buttonID,
  date
) {
  let loadingContainer = document.querySelector("." + loadingName);
  loadingContainer.style.display = "revert";
  let url = "";
  if (live == "Y") {
    removeAllActiveLive();
    let currentBtn = document.getElementById(buttonID);
    currentBtn.classList.add("active");
    url =
      "https://sofascores.p.rapidapi.com/v1/events/schedule/live?sport_id=" +
      sportID;
  } else {
    url =
      "https://sofascores.p.rapidapi.com/v1/events/schedule/date?date=" +
      date +
      "&sport_id=" +
      sportID;
  }
  let eventDateMax = new Date(date);
  eventDateMax.setDate(eventDateMax.getDate() + 1);
  eventDateMax.setHours(eventDateMax.getHours() + 5);
  let eventDateMin = new Date(date);
  let html = "";
  if (live == "Y" || eventDateMax.getTime() < Date.now()) {
    html += buildLiveScoreboard(
      await getAllData(url),
      containerName,
      sportID,
      league,
      eventDateMin,
      live,
      loadingName,
      date,
      buttonID
    );
  } else {
    html += buildUpcomingScoreboard(
      await getAllData(url),
      containerName,
      sportID,
      league,
      eventDateMin,
      loadingName,
      date,
      buttonID
    );
  }
  if (
    html == "" &&
    url ==
      "https://sofascores.p.rapidapi.com/v1/events/schedule/live?sport_id=" +
        sportID
  ) {
    html += AddNoLiveDataTxt();
  } else if (html == "") {
    html += AddNoAvailableDataTxt();
  }
  let container = document.querySelector("." + containerName);
  loadingContainer.style.display = "none";
  container.innerHTML = html;
}

function buildUpcomingScoreboard(
  allData,
  containerName,
  sportID,
  league,
  date,
  loadingContainer,
  eventDate,
  buttonID
) {
  let html = "";
  let eventInfo = allData.data;
  let dateConfirm = false;
  eventInfo.forEach((currentEvent) => {
    let eventLeague = "";
    if (currentEvent.tournament.uniqueTournament.name == undefined) {
      eventLeague = currentEvent.tournament.name;
    } else {
      eventLeague = currentEvent.tournament.uniqueTournament.name;
    }
    let homeTeamID = currentEvent.homeTeam.id;
    let awayTeamID = currentEvent.awayTeam.id;
    let gameID = currentEvent.id;
    dateConfirm = false;
    let startTime = formatEventDate(currentEvent.startTimestamp);
    let compareDate = new Date(currentEvent.startTimestamp * 1000);
    compareDate.setHours(compareDate.getHours() - 5);
    let maxDate = new Date(date);
    maxDate.setDate(maxDate.getDate() + 1);
    if (
      compareDate.getTime() > date.getTime() &&
      compareDate.getTime() < maxDate.getTime()
    ) {
      dateConfirm = true;
    }
    let secondLeague = "";
    if (league == "NFL") {
      secondLeague = "NFL Preseason";
    }
    if (
      (eventLeague == league || eventLeague == secondLeague) &&
      dateConfirm == true
    ) {
      let homeTeam = currentEvent.homeTeam.name;
      let awayTeam = currentEvent.awayTeam.name;
      html += constructUpcomingScoreboard(
        currentEvent,
        startTime,
        homeTeam,
        awayTeam,
        gameID,
        homeTeamID,
        awayTeamID,
        containerName,
        loadingContainer,
        sportID,
        eventDate,
        league,
        buttonID
      );
    }
  });
  return html;
}

function buildLiveScoreboard(
  allData,
  containerName,
  sportID,
  league,
  date,
  live,
  loadingContainer,
  eventDate,
  buttonID
) {
  let html = "";
  let eventInfo = allData.data;
  let dateConfirm = false;
  eventInfo.forEach((currentEvent) => {
    let eventLeague = "";
    if (currentEvent.tournament.uniqueTournament.name != undefined) {
      eventLeague = currentEvent.tournament.uniqueTournament.name;
    } else {
      eventLeague = currentEvent.tournament.name;
    }
    let homeTeamID = currentEvent.homeTeam.id;
    let awayTeamID = currentEvent.awayTeam.id;
    let gameID = currentEvent.id;
    dateConfirm = false;
    let startTime = formatEventDate(currentEvent.startTimestamp);
    let compareDate = new Date(currentEvent.startTimestamp * 1000);
    compareDate.setHours(compareDate.getHours() - 5);
    let maxDate = new Date(date);
    maxDate.setDate(maxDate.getDate() + 1);
    if (
      compareDate.getTime() > date.getTime() &&
      compareDate.getTime() < maxDate.getTime()
    ) {
      dateConfirm = true;
    }
    if (live == "Y") {
      dateConfirm = true;
    }
    let secondLeague = "";
    if (league == "NFL") {
      secondLeague = "NFL Preseason";
    }
    if (
      (eventLeague == league || eventLeague == secondLeague) &&
      dateConfirm == true
    ) {
      let awayScore = currentEvent.awayScore.current;
      let homeScore = currentEvent.homeScore.current;
      let currentPeriod = currentEvent.status.description;
      let currentPTime = "";
      let homeTeam = currentEvent.homeTeam.name;
      let awayTeam = currentEvent.awayTeam.name;
      let numPeriods = "";
      let homePeriodScores = [];
      let awayPeriodScores = [];
      let sport = "";
      let awayStat1 = "NA";
      let awayStat2 = "NA";
      let homeStat1 = "NA";
      let homeStat2 = "NA";

      if (sportID == "64" && league == "MLB") {
        numPeriods = 9;
        sport = "baseball";
        if (currentEvent.awayScore.innings.inning1 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.innings.inning1.run);
        }
        if (currentEvent.awayScore.innings.inning2 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.innings.inning2.run);
        }
        if (currentEvent.awayScore.innings.inning3 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.innings.inning3.run);
        }
        if (currentEvent.awayScore.innings.inning4 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.innings.inning4.run);
        }
        if (currentEvent.awayScore.innings.inning5 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.innings.inning5.run);
        }
        if (currentEvent.awayScore.innings.inning6 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.innings.inning6.run);
        }
        if (currentEvent.awayScore.innings.inning7 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.innings.inning7.run);
        }
        if (currentEvent.awayScore.innings.inning8 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.innings.inning8.run);
        }
        if (currentEvent.awayScore.innings.inning9 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.innings.inning9.run);
        }

        if (currentEvent.homeScore.innings.inning1 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.innings.inning1.run);
        }
        if (currentEvent.homeScore.innings.inning2 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.innings.inning2.run);
        }
        if (currentEvent.homeScore.innings.inning3 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.innings.inning3.run);
        }
        if (currentEvent.homeScore.innings.inning4 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.innings.inning4.run);
        }
        if (currentEvent.homeScore.innings.inning5 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.innings.inning5.run);
        }
        if (currentEvent.homeScore.innings.inning6 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.innings.inning6.run);
        }
        if (currentEvent.homeScore.innings.inning7 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.innings.inning7.run);
        }
        if (currentEvent.homeScore.innings.inning8 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.innings.inning8.run);
        }
        if (currentEvent.homeScore.innings.inning9 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.innings.inning9.run);
        }
        try {
          awayStat1 = currentEvent.awayScore.inningsBaseball.hits;
        } catch (error) {}
        try {
          awayStat2 = currentEvent.awayScore.inningsBaseball.errors;
        } catch (error) {}
        try {
          homeStat1 = currentEvent.homeScore.inningsBaseball.hits;
        } catch (error) {}
        try {
          homeStat2 = currentEvent.homeScore.inningsBaseball.errors;
        } catch (error) {}
      }

      if (sportID == "64" && league == "NCAA, Regular Season") {
        numPeriods = 7;
        sport = "baseball";
        if (currentEvent.awayScore.period1 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period1);
        }
        if (currentEvent.awayScore.period2 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period2);
        }
        if (currentEvent.awayScore.period3 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period3);
        }
        if (currentEvent.awayScore.period4 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period4);
        }
        if (currentEvent.awayScore.period5 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period5);
        }
        if (currentEvent.awayScore.period6 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period6);
        }
        if (currentEvent.awayScore.period7 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period7);
        }

        if (currentEvent.homeScore.period1 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period1);
        }
        if (currentEvent.homeScore.period2 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period2);
        }
        if (currentEvent.homeScore.period3 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period3);
        }
        if (currentEvent.homeScore.period4 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period4);
        }
        if (currentEvent.homeScore.period5 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period5);
        }
        if (currentEvent.homeScore.period6 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period6);
        }
        if (currentEvent.homeScore.period7 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period7);
        }

        try {
          awayStat1 = currentEvent.awayScore.inningsBaseball.hits;
        } catch (error) {}
        try {
          awayStat2 = currentEvent.awayScore.inningsBaseball.errors;
        } catch (error) {}
        try {
          homeStat1 = currentEvent.homeScore.inningsBaseball.hits;
        } catch (error) {}
        try {
          homeStat2 = currentEvent.homeScore.inningsBaseball.errors;
        } catch (error) {}
      }

      if (sportID == "63") {
        numPeriods = 4;
        sport = "football";

        if (currentEvent.awayScore.period1 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period1);
        }
        if (currentEvent.awayScore.period2 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period2);
        }
        if (currentEvent.awayScore.period3 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period3);
        }
        if (currentEvent.awayScore.period4 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period4);
        }

        if (currentEvent.homeScore.period1 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period1);
        }
        if (currentEvent.homeScore.period2 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period2);
        }
        if (currentEvent.homeScore.period3 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period3);
        }
        if (currentEvent.homeScore.period4 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period4);
        }

        awayStat1 = "";
        awayStat2 = "";
        homeStat1 = "";
        homeStat2 = "";
      }

      if (sportID == "4") {
        numPeriods = 3;
        sport = "hockey";

        if (currentEvent.awayScore.period1 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period1);
        }
        if (currentEvent.awayScore.period2 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period2);
        }
        if (currentEvent.awayScore.period3 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period3);
        }

        if (currentEvent.homeScore.period1 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period1);
        }
        if (currentEvent.homeScore.period2 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period2);
        }
        if (currentEvent.homeScore.period3 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period3);
        }
        awayStat1 = "";
        awayStat2 = "";
        homeStat1 = "";
        homeStat2 = "";
      }

      if (sportID == "2") {
        if (league == "NBA") {
          numPeriods = 4;
        } else {
          numPeriods = 2;
        }
        sport = "basketball";

        if (currentEvent.awayScore.period1 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period1);
        }
        if (currentEvent.awayScore.period2 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period2);
        }

        if (currentEvent.homeScore.period1 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period1);
        }
        if (currentEvent.homeScore.period2 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period2);
        }
        if (league == "NBA") {
          if (currentEvent.awayScore.period3 != undefined) {
            awayPeriodScores.push(currentEvent.awayScore.period3);
          }
          if (currentEvent.awayScore.period4 != undefined) {
            awayPeriodScores.push(currentEvent.awayScore.period4);
          }
          if (currentEvent.homeScore.period3 != undefined) {
            homePeriodScores.push(currentEvent.homeScore.period3);
          }
          if (currentEvent.homeScore.period4 != undefined) {
            homePeriodScores.push(currentEvent.homeScore.period4);
          }
        }

        awayStat1 = "";
        awayStat2 = "";
        homeStat1 = "";
        homeStat2 = "";
      }

      if (sportID == "1") {
        numPeriods = 2;
        sport = "soccer";

        if (currentEvent.awayScore.period1 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period1);
        }
        if (currentEvent.awayScore.period2 != undefined) {
          awayPeriodScores.push(currentEvent.awayScore.period2);
        }

        if (currentEvent.homeScore.period1 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period1);
        }
        if (currentEvent.homeScore.period2 != undefined) {
          homePeriodScores.push(currentEvent.homeScore.period2);
        }

        awayStat1 = "";
        awayStat2 = "";
        homeStat1 = "";
        homeStat2 = "";
      }

      if (homeScore != undefined && awayScore != undefined) {
        html += constructLiveScoreboard(
          currentEvent,
          awayScore,
          homeScore,
          awayPeriodScores,
          homePeriodScores,
          currentPeriod,
          startTime,
          homeTeam,
          awayTeam,
          numPeriods,
          sport,
          homeStat1,
          homeStat2,
          awayStat1,
          awayStat2,
          gameID,
          homeTeamID,
          awayTeamID,
          containerName,
          loadingContainer,
          sportID,
          eventDate,
          league,
          buttonID
        );
      }
    }
  });
  return html;
}

function constructLiveScoreboard(
  currentEvent,
  awayScore,
  homeScore,
  awayPeriodScores,
  homePeriodScores,
  currentPeriod,
  startTime,
  homeTeam,
  awayTeam,
  numPeriods,
  sport,
  homeStat1,
  homeStat2,
  awayStat1,
  awayStat2,
  gameID,
  homeTeamID,
  awayTeamID,
  containerName,
  loadingContainer,
  sportID,
  eventDate,
  league,
  buttonID
) {
  //Set Main Header
  if (currentPeriod == "Pause" && sport == "baseball") {
    currentPeriod = "End of Inning";
  }
  if (currentPeriod == "AET") {
    currentPeriod = "Final/OT";
  }
  if (currentPeriod == "Ended") {
    currentPeriod = "Final";
  }
  let htmlSegment =
    `<div class="col-12 center-elements pt-3 pb-3"><div class="container scoreboard hover-cursor" onclick=loadGamePreview(` +
    '"Y"' +
    "," +
    '"' +
    gameID +
    '"' +
    "," +
    '"' +
    homeTeamID +
    '"' +
    "," +
    '"' +
    awayTeamID +
    '"' +
    "," +
    '"' +
    containerName +
    '"' +
    "," +
    '"' +
    loadingContainer +
    '"' +
    "," +
    '"' +
    league +
    '"' +
    "," +
    '"' +
    eventDate +
    '"' +
    "," +
    '"' +
    sportID +
    '"' +
    "," +
    '"' +
    buttonID +
    '"' +
    `)>
    <div class="row header">
        <div class="col-auto headerElement">${startTime}</div>
        <div class="col headerElement" style="text-align:right">${currentPeriod}</div>
    </div>
    <div class="row periodHeader">
      <div class="col-4 headerElement"></div>`;

  //Set Period Header
  for (let i = 0; i < numPeriods; i++) {
    htmlSegment += `<div class="col periodScore mobile-m-hide">${i + 1}</div>`;
  }
  //Only Final Header
  if (
    sport == "soccer" ||
    sport == "basketball" ||
    sport == "hockey" ||
    sport == "football"
  ) {
    htmlSegment += `<div class="col periodScore">TOT</div>
    </div>`;
  }

  //Baseball Specific Stat Headers
  if (sport == "baseball") {
    htmlSegment += `<div class="col periodScore">R</div>
      <div class="col periodScore">H</div>
      <div class="col periodScore">E</div>
    </div>`;
  }
  //Away Team Row
  htmlSegment += `<div class="row team lose" style="border-left: none; border-top:none; border-right:none;">
      <div class="col-4 team">${awayTeam}</div>`;

  //Set Away Team Period Scores
  for (let i = 0; i < numPeriods; i++) {
    let currentPeriodScore = "";
    if (awayPeriodScores[i] != undefined) {
      currentPeriodScore = awayPeriodScores[i];
    } else {
      currentPeriodScore = " ";
    }
    htmlSegment += `
              <div class="col periodScore mobile-m-hide">${currentPeriodScore}</div>`;
  }

  //Set Away Team Total Score, Hits, and Errors
  htmlSegment += `<div class="col periodScore bold-font">${awayScore}</div>`;
  if (sport == "baseball") {
    htmlSegment += `<div class="col periodScore bold-font">${awayStat1}</div>
    <div class="col periodScore bold-font">${awayStat2}</div>`;
  }

  //Home Team Row
  htmlSegment += `</div>
      <div class="row team">
        <div class="col-4 team">${homeTeam}</div>`;

  //Set Home Team Period Scores
  for (let i = 0; i < numPeriods; i++) {
    let currentPeriodScore = "";
    if (homePeriodScores[i] != undefined) {
      currentPeriodScore = homePeriodScores[i];
    } else {
      currentPeriodScore = " ";
    }
    htmlSegment += `
                    <div class="col periodScore mobile-m-hide">${currentPeriodScore}</div>`;
  }

  //Set Home Team Total Score, Hits, and Errors
  htmlSegment += `<div class="col periodScore bold-font">${homeScore}</div>`;
  if (sport == "baseball") {
    htmlSegment += `<div class="col periodScore bold-font">${homeStat1}</div>
          <div class="col periodScore bold-font">${homeStat2}</div>`;
  }

  htmlSegment += `</div>
      </div>
    </div>`;

  return htmlSegment;
}

function constructUpcomingScoreboard(
  currentEvent,
  startTime,
  homeTeam,
  awayTeam,
  gameID,
  homeTeamID,
  awayTeamID,
  containerName,
  loadingContainer,
  sportID,
  eventDate,
  league,
  buttonID
) {
  let htmlSegment =
    `<div class="col-6 col-lg-12 center-elements pt-3 pb-3"><div class="container scoreboard-upcoming hover-cursor" onclick=loadGamePreview(` +
    '"N"' +
    "," +
    '"' +
    gameID +
    '"' +
    "," +
    '"' +
    homeTeamID +
    '"' +
    "," +
    '"' +
    awayTeamID +
    '"' +
    "," +
    '"' +
    containerName +
    '"' +
    "," +
    '"' +
    loadingContainer +
    '"' +
    "," +
    '"' +
    league +
    '"' +
    "," +
    '"' +
    eventDate +
    '"' +
    "," +
    '"' +
    sportID +
    '"' +
    "," +
    '"' +
    buttonID +
    '"' +
    `)>
    <div class="row header">
        <div class="col-12 center-text headerElement">${startTime}</div>
    </div>
    <div class="row center-text center-elements">
      ${homeTeam} at ${awayTeam}
    </div>
    </div>
    </div>`;

  return htmlSegment;
}

function removeAllActiveLive() {
  let nba = document.getElementById("nbalive");
  nba.classList.remove("active");
  let mlb = document.getElementById("mlblive");
  mlb.classList.remove("active");
  let nhl = document.getElementById("nhllive");
  nhl.classList.remove("active");
  let nfl = document.getElementById("nfllive");
  nfl.classList.remove("active");
  let cbb = document.getElementById("cbblive");
  cbb.classList.remove("active");
  let cfb = document.getElementById("cfblive");
  cfb.classList.remove("active");
  let cbaseball = document.getElementById("cbaseballlive");
  cbaseball.classList.remove("active");
  let prem = document.getElementById("premlive");
  prem.classList.remove("active");
  let bund = document.getElementById("bundlive");
  bund.classList.remove("active");
  let seriea = document.getElementById("seriealive");
  seriea.classList.remove("active");
  let ligue1 = document.getElementById("ligue1live");
  ligue1.classList.remove("active");
  let laliga = document.getElementById("laligalive");
  laliga.classList.remove("active");
  let mls = document.getElementById("mlslive");
  mls.classList.remove("active");
}

loadScoreboard("Y", 64, "MLB", "liveScoresContainer", "liveLoading", "mlblive");
