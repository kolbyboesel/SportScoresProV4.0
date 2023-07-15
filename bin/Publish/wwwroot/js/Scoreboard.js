//API KEY-9f3436bf65c47b3988484cb92d3cb3be

function clear(elementID) {
  let container = document.querySelector("." + elementID);
  container.innerHTML = "";
}

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7c01195a20mshbc9188a6ca4f5a5p1ce61cjsn5e640810eca6",
    "X-RapidAPI-Host": "odds.p.rapidapi.com",
  },
};

function AddNoDataTxt() {
  return `<div class="col-12 no-score-info"><h1>Sorry, no data is available, please check back later!</h1></div>`;
}

function removeAllActive() {
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
async function getData(url) {
  try {
    let res = await fetch(url, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function showNBAScores() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/basketball_nba/scores?daysFrom=1"
    ),
    "containerNBA"
  );
  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerNBA");
  container.innerHTML = html;
}

async function showMLBScores() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/baseball_mlb/scores?daysFrom=1"
    ),
    "containerMLB"
  );
  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerMLB");
  container.innerHTML = html;
}

async function showNFLScores() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/americanfootball_nfl/scores?daysFrom=1"
    ),
    "containerNFL"
  );
  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerNFL");
  container.innerHTML = html;
}

async function showCFBScores() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/americanfootball_ncaaf/scores?daysFrom=1"
    ),
    "containeCFB"
  );
  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerCFB");
  container.innerHTML = html;
}

async function showCollegeBaseballScores() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/baseball_ncaa/scores?daysFrom=1"
    ),
    "containerCBaseball"
  );
  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerCBaseball");
  container.innerHTML = html;
}

async function showCBBScores() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/basketball_ncaab/scores?daysFrom=1"
    ),
    "containerNCAAB"
  );
  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerNCAAB");
  container.innerHTML = html;
}

async function showPremScores() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/soccer_epl/scores?daysFrom=1"
    ),
    "containerPrem"
  );
  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerPrem");
  container.innerHTML = html;
}

async function showLigue1Scores() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/soccer_france_ligue_one/scores?daysFrom=1"
    ),
    "containerLigue1"
  );
  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerLigue1");
  container.innerHTML = html;
}

async function showBundesligaScores() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/soccer_germany_bundesliga/scores?daysFrom=1"
    ),
    "containerNFL"
  );
  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerBundesliga");
  container.innerHTML = html;
}

async function showSerieAScores() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/soccer_italy_serie_a/scores?daysFrom=1"
    ),
    "containerSerieA"
  );
  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerSerieA");
  container.innerHTML = html;
}

async function showLaligaScores() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/soccer_spain_la_liga/scores?daysFrom=1"
    ),
    "containerLaLiga"
  );
  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerLaLiga");
  container.innerHTML = html;
}

async function showMLSScores() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/soccer_usa_mls/scores?daysFrom=1"
    ),
    "containerMLS"
  );
  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerMLS");
  container.innerHTML = html;
}

async function showNHLScores() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/icehockey_nhl/scores?daysFrom=1"
    ),
    "containerNHL"
  );
  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerNHL");
  container.innerHTML = html;
}

/* For Live Scores Page */
async function showLiveMLB() {
  removeAllActive();
  let currentBtn = document.getElementById("mlblive");
  currentBtn.classList.add("active");
  let html = "";
  html += buildScoreboard(
    await getData("https://odds.p.rapidapi.com/v4/sports/baseball_mlb/scores"),
    "liveScoresContainer"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".liveScoresContainer");
  container.innerHTML = html;
}

async function showLiveNBA() {
  removeAllActive();
  let currentBtn = document.getElementById("nbalive");
  currentBtn.classList.add("active");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/basketball_nba/scores"
    ),
    "liveScoresContainer"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".liveScoresContainer");
  container.innerHTML = html;
}

async function showLiveNHL() {
  removeAllActive();
  let currentBtn = document.getElementById("nhllive");
  currentBtn.classList.add("active");
  let html = "";
  html += buildScoreboard(
    await getData("https://odds.p.rapidapi.com/v4/sports/icehockey_nhl/scores"),
    "liveScoresContainer"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".liveScoresContainer");
  container.innerHTML = html;
}

async function showLiveNFL() {
  removeAllActive();
  let currentBtn = document.getElementById("nfllive");
  currentBtn.classList.add("active");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/americanfootball_nfl/scores"
    ),
    "liveScoresContainer"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".liveScoresContainer");
  container.innerHTML = html;
}

async function showLiveCFB() {
  removeAllActive();
  let currentBtn = document.getElementById("cfblive");
  currentBtn.classList.add("active");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/americanfootball_ncaaf/scores"
    ),
    "liveScoresContainer"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".liveScoresContainer");
  container.innerHTML = html;
}

async function showLiveCBB() {
  removeAllActive();
  let currentBtn = document.getElementById("cbblive");
  currentBtn.classList.add("active");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/basketball_ncaab/scores"
    ),
    "liveScoresContainer"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".liveScoresContainer");
  container.innerHTML = html;
}

async function showLiveCBaseball() {
  removeAllActive();
  let currentBtn = document.getElementById("cbaseballlive");
  currentBtn.classList.add("active");
  let html = "";
  html += buildScoreboard(
    await getData("https://odds.p.rapidapi.com/v4/sports/baseball_ncaa/scores"),
    "liveScoresContainer"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".liveScoresContainer");
  container.innerHTML = html;
}

async function showLivePrem() {
  removeAllActive();
  let currentBtn = document.getElementById("premlive");
  currentBtn.classList.add("active");
  let html = "";
  html += buildScoreboard(
    await getData("https://odds.p.rapidapi.com/v4/sports/soccer_epl/scores"),
    "liveScoresContainer"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".liveScoresContainer");
  container.innerHTML = html;
}

async function showLiveBundesliga() {
  removeAllActive();
  let currentBtn = document.getElementById("bundlive");
  currentBtn.classList.add("active");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/soccer_germany_bundesliga/scores"
    ),
    "liveScoresContainer"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".liveScoresContainer");
  container.innerHTML = html;
}

async function showLiveLigue1() {
  removeAllActive();
  let currentBtn = document.getElementById("ligue1live");
  currentBtn.classList.add("active");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/soccer_france_ligue_one/scores"
    ),
    "liveScoresContainer"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".liveScoresContainer");
  container.innerHTML = html;
}

async function showLiveLaliga() {
  removeAllActive();
  let currentBtn = document.getElementById("laligalive");
  currentBtn.classList.add("active");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/soccer_spain_la_liga/scores"
    ),
    "liveScoresContainer"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".liveScoresContainer");
  container.innerHTML = html;
}

async function showLiveSerieA() {
  removeAllActive();
  let currentBtn = document.getElementById("seriealive");
  currentBtn.classList.add("active");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/soccer_italy_serie_a/scores"
    ),
    "liveScoresContainer"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".liveScoresContainer");
  container.innerHTML = html;
}

async function showLiveMLS() {
  removeAllActive();
  let currentBtn = document.getElementById("mlslive");
  currentBtn.classList.add("active");
  let html = "";
  html += buildScoreboard(
    await getData(
      "https://odds.p.rapidapi.com/v4/sports/soccer_usa_mls/scores"
    ),
    "liveScoresContainer"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".liveScoresContainer");
  container.innerHTML = html;
}

function buildScoreboard(allScores, containerName) {
  let html = "";
  allScores.forEach((currentScore) => {
    let awayScore = 0;
    let homeScore = 0;

    try {
      let awayScoreRaw = currentScore.scores[1].score;
      let homeScoreRaw = currentScore.scores[0].score;

      awayScoreRaw === null
        ? (awayScore = 0)
        : (awayScore = Number(awayScoreRaw));
      homeScoreRaw === null
        ? (homeScore = 0)
        : (homeScore = Number(homeScoreRaw));
    } catch (error) {
      homeScore = 0;
      awayScore = 0;
    }

    let winningTeam =
      awayScore < homeScore ? currentScore.home_team : currentScore.away_team;
    let completedDate = formatDate(currentScore.commence_time);

    html += generateScoreboard(
      currentScore,
      awayScore,
      homeScore,
      winningTeam,
      completedDate,
      containerName
    );
  });
  return html;
}

function formatDate(rawDate) {
  let dateTimeValue = Date.parse(rawDate);
  let dateRaw = new Date(dateTimeValue);

  return (
    dateRaw.toLocaleDateString() +
    " Start Time: " +
    dateRaw.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
}

function generateScoreboard(
  currentScore,
  awayScore,
  homeScore,
  winningTeam,
  dateTimeValue,
  containerName
) {
  let htmlSegment = `<div class="col-lg-6 center-elements pt-3 pb-3"><div class="container scoreboard scoreboard-collapsible">`;
  let gameStatus;

  if (currentScore.completed) {
    gameStatus = "FINAL";
  } else {
    gameStatus = "INP/TBD";
  }

  if (winningTeam === currentScore.away_team) {
    htmlSegment += `<div class="row header">
    <div class="col-auto headerElement">${dateTimeValue}</div>
    <div class="col headerElement" style="text-align:right">${gameStatus}</div>
  </div>
      <div class="row team win" style="border-left: none; border-top:none; border-right:none;">
        <div class="col-auto team">${currentScore.away_team}</div>
        <div class="col score">${awayScore}</div>
      </div>
      <div class="row team lose">
        <div class="col-auto team">${currentScore.home_team}</div>
        <div class="col score">${homeScore}</div>
      </div>`;
  } else {
    htmlSegment += `<div class="row header">
    <div class="col-auto headerElement">${dateTimeValue}</div>
    <div class="col headerElement" style="text-align:right">${gameStatus}</div>
  </div>
      <div class="row team lose" style="border-left: none; border-top:none; border-right:none;">
        <div class="col-auto team">${currentScore.away_team}</div>
        <div class="col score">${awayScore}</div>
      </div>
      <div class="row team win">
        <div class="col-auto team">${currentScore.home_team}</div>
        <div class="col score">${homeScore}</div>
      </div>`;
  }

  htmlSegment += `</div>
  <div class="scoreboard-content">Test!</div>
  </div>`;

  return htmlSegment;
}
