//API KEY-9f3436bf65c47b3988484cb92d3cb3be
const MLB_URL =
  "https://odds.p.rapidapi.com/v4/sports/baseball_mlb/odds?regions=us&oddsFormat=american&markets=spreads,totals,h2h&dateFormat=iso";
const NBA_URL =
  "https://odds.p.rapidapi.com/v4/sports/basketball_nba/odds?regions=us&oddsFormat=american&markets=spreads,totals,h2h&dateFormat=iso";
const NFL_URL =
  "https://odds.p.rapidapi.com/v4/sports/americanfootball_nfl/odds?regions=us&oddsFormat=american&markets=spreads,totals,h2h&dateFormat=iso";
const Prem_URL =
  "https://odds.p.rapidapi.com/v4/sports/soccer_epl/odds?regions=us&oddsFormat=american&markets=spreads,totals,h2h&dateFormat=iso";
const SerieA_URL =
  "https://odds.p.rapidapi.com/v4/sports/soccer_italy_serie_a/odds?regions=us&oddsFormat=american&markets=spreads,totals,h2h&dateFormat=iso";
const Ligue1_URL =
  "https://odds.p.rapidapi.com/v4/sports/soccer_france_ligue_one/odds?regions=us&oddsFormat=american&markets=spreads,totals,h2h&dateFormat=iso";
const Laliga_URL =
  "https://odds.p.rapidapi.com/v4/sports/soccer_spain_la_liga/odds?regions=us&oddsFormat=american&markets=spreads,totals,h2h&dateFormat=iso";
const Bundesliga_URL =
  "https://odds.p.rapidapi.com/v4/sports/soccer_germany_bundesliga/odds?regions=us&oddsFormat=american&markets=spreads,totals,h2h&dateFormat=iso";
const CBB_URL =
  "https://odds.p.rapidapi.com/v4/sports/basketball_ncaab/odds?regions=us&oddsFormat=american&markets=spreads,totals,h2h&dateFormat=iso";
const CFB_URL =
  "https://odds.p.rapidapi.com/v4/sports/americanfootball_ncaaf/odds?regions=us&oddsFormat=american&markets=spreads,totals,h2h&dateFormat=iso";
const CollegeBaseball_URL =
  "https://odds.p.rapidapi.com/v4/sports/baseball_ncaa/odds?regions=us&oddsFormat=american&markets=spreads,totals,h2h&dateFormat=iso";
const MLS_URL =
  "https://odds.p.rapidapi.com/v4/sports/soccer_usa_mls/odds?regions=us&oddsFormat=american&markets=spreads,totals,h2h&dateFormat=iso";
let awaySpread = 0;
let homeSpread = 0;
let homeSpreadOdds = 0;
let awaySpreadOdds = 0;
let awayMoneyline = 0;
let homeMoneyline = 0;
let overValue = 0;
let underValue = 0;
let overOdds = 0;
let underOdds = 0;
let completedDate = 0;
function AddNoDataTxt() {
  return `<div class="col-12 no-score-info"><h1>Sorry, no data is available, please check back later!</h1></div>`;
}

function removeAllActiveBet() {
  let nba = document.getElementById("nbabet");
  nba.classList.remove("active");
  let mlb = document.getElementById("mlbbet");
  mlb.classList.remove("active");
  let nhl = document.getElementById("nhlbet");
  nhl.classList.remove("active");
  let nfl = document.getElementById("nflbet");
  nfl.classList.remove("active");
  let cbb = document.getElementById("cbbbet");
  cbb.classList.remove("active");
  let cfb = document.getElementById("cfbbet");
  cfb.classList.remove("active");
  let cbaseball = document.getElementById("cbaseballbet");
  cbaseball.classList.remove("active");
  let prem = document.getElementById("prembet");
  prem.classList.remove("active");
  let bund = document.getElementById("bundbet");
  bund.classList.remove("active");
  let seriea = document.getElementById("serieabet");
  seriea.classList.remove("active");
  let ligue1 = document.getElementById("ligue1bet");
  ligue1.classList.remove("active");
  let laliga = document.getElementById("laligabet");
  laliga.classList.remove("active");
  let mls = document.getElementById("mlsbet");
  mls.classList.remove("active");
}

async function showNBAOdds() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildOddsBoard(await getData(NBA_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerNBA");
  container.innerHTML = html;
}
async function showMLBOdds() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildOddsBoard(await getData(MLB_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerMLB");
  container.innerHTML = html;
}
async function showNFLOdds() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildOddsBoard(await getData(NFL_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerNFL");
  container.innerHTML = html;
}
async function showNHLOdds() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildOddsBoard(await getData(NHL_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerNHL");
  container.innerHTML = html;
}

async function showCFBOdds() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildOddsBoard(await getData(CFB_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerCFB");
  container.innerHTML = html;
}

async function showCollegeBaseballOdds() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildOddsBoard(await getData(CollegeBaseball_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerCBaseball");
  container.innerHTML = html;
}

async function showCollegeBasketballlOdds() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildOddsBoard(await getData(CBB_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerNCAAB");
  container.innerHTML = html;
}

async function showPremOdds() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildOddsBoard(await getData(Prem_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerPrem");
  container.innerHTML = html;
}

async function showLigue1Odds() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildOddsBoard(await getData(Ligue1_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerLigue1");
  container.innerHTML = html;
}

async function showBundesligaOdds() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildOddsBoard(await getData(Bundesliga_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerBundesliga");
  container.innerHTML = html;
}

async function showLaligaOdds() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildOddsBoard(await getData(Laliga_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerLaLiga");
  container.innerHTML = html;
}

async function showSerieAodds() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildOddsBoard(await getData(SerieA_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerSerieA");
  container.innerHTML = html;
}

async function showMLSodds() {
  $("body").removeClass("offcanvas-menu");
  let html = "";
  html += buildOddsBoard(await getData(MLS_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "containerMLS");
  container.innerHTML = html;
}

async function showAccountMLB() {
  removeAllActiveBet();
  let currentBtn = document.getElementById("mlbbet");
  currentBtn.classList.add("active");

  let html = "";

  html += buildOddsBoard(await getData(MLB_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "betOddsContainer");
  container.innerHTML = html;
}

async function showAccountNBA() {
  removeAllActiveBet();
  let currentBtn = document.getElementById("nbabet");
  currentBtn.classList.add("active");

  let html = "";

  html += buildOddsBoard(await getData(NBA_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "betOddsContainer");
  container.innerHTML = html;
}

async function showAccountNFL() {
  removeAllActiveBet();
  let currentBtn = document.getElementById("nflbet");
  currentBtn.classList.add("active");

  let html = "";

  html += buildOddsBoard(await getData(NFL_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "betOddsContainer");
  container.innerHTML = html;
}

async function showAccountNHL() {
  removeAllActiveBet();
  let currentBtn = document.getElementById("nhlbet");
  currentBtn.classList.add("active");

  let html = "";

  html += buildOddsBoard(await getData(NHL_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "betOddsContainer");
  container.innerHTML = html;
}

async function showAccountCFB() {
  removeAllActiveBet();
  let currentBtn = document.getElementById("cfbbet");
  currentBtn.classList.add("active");

  let html = "";

  html += buildOddsBoard(await getData(CFB_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "betOddsContainer");
  container.innerHTML = html;
}

async function showAccountCBB() {
  removeAllActiveBet();
  let currentBtn = document.getElementById("cbbbet");
  currentBtn.classList.add("active");

  let html = "";

  html += buildOddsBoard(await getData(CBB_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "betOddsContainer");
  container.innerHTML = html;
}

async function showAccountCBaseball() {
  removeAllActiveBet();
  let currentBtn = document.getElementById("cbaseballbet");
  currentBtn.classList.add("active");

  let html = "";

  html += buildOddsBoard(await getData(CollegeBaseball_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "betOddsContainer");
  container.innerHTML = html;
}

async function showAccountPrem() {
  removeAllActiveBet();
  let currentBtn = document.getElementById("prembet");
  currentBtn.classList.add("active");

  let html = "";

  html += buildOddsBoard(await getData(Prem_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "betOddsContainer");
  container.innerHTML = html;
}

async function showAccountLaliga() {
  removeAllActiveBet();
  let currentBtn = document.getElementById("laligabet");
  currentBtn.classList.add("active");

  let html = "";

  html += buildOddsBoard(await getData(Laliga_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "betOddsContainer");
  container.innerHTML = html;
}

async function showAccountLigue1() {
  removeAllActiveBet();
  let currentBtn = document.getElementById("ligue1bet");
  currentBtn.classList.add("active");

  let html = "";

  html += buildOddsBoard(await getData(Ligue1_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "betOddsContainer");
  container.innerHTML = html;
}

async function showAccountBundesliga() {
  removeAllActiveBet();
  let currentBtn = document.getElementById("bundbet");
  currentBtn.classList.add("active");

  let html = "";

  html += buildOddsBoard(await getData(Bundesliga_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "betOddsContainer");
  container.innerHTML = html;
}

async function showAccountSerieA() {
  removeAllActiveBet();
  let currentBtn = document.getElementById("serieabet");
  currentBtn.classList.add("active");

  let html = "";

  html += buildOddsBoard(await getData(SerieA_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "betOddsContainer");
  container.innerHTML = html;
}

async function showAccountMLS() {
  removeAllActiveBet();
  let currentBtn = document.getElementById("mlsbet");
  currentBtn.classList.add("active");

  let html = "";

  html += buildOddsBoard(await getData(MLS_URL));

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector("." + "betOddsContainer");
  container.innerHTML = html;
}

function buildOddsBoard(allOdds) {
  let html = "";
  allOdds.forEach((currentGame) => {
    setValues(currentGame);

    completedDate = formatDate(currentGame.commence_time);

    html += generateOddsBoard(currentGame);
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

function checkValues() {
  if (awaySpread == 0) {
    awaySpread = "NA";
  }
  if (homeSpread == 0) {
    homeSpread = "NA";
  }
  if (homeSpreadOdds == 0) {
    homeSpreadOdds = "NA";
  }
  if (awaySpreadOdds == 0) {
    awaySpreadOdds = "NA";
  }
  if (awayMoneyline == 0) {
    awayMoneyline = "NA";
  }
  if (homeMoneyline == 0) {
    homeMoneyline = "NA";
  }
  if (overValue == 0) {
    overValue = "NA";
  }
  if (underValue == 0) {
    underValue = "NA";
  }
  if (overOdds == 0) {
    overOdds = "NA";
  }
  if (underOdds == 0) {
    underOdds = "NA";
  }
}

function generateOddsBoard(currentGame) {
  checkValues(
    awaySpread,
    homeSpread,
    homeSpreadOdds,
    awaySpreadOdds,
    awayMoneyline,
    homeMoneyline,
    overValue,
    underValue,
    overOdds,
    underOdds
  );

  let htmlSegment = `<div class="col-12 center-elements pt-3 pb-3"><div class="container betBoard">`;
  let gameStatus;

  htmlSegment += `<div class="row header">
        <div class="col-auto bet-main-element mobileText">Date: ${completedDate}</div>
        <div class="col bet-odds-grid">Spread</div>
        <div class="col bet-odds-grid">O/U</div>
        <div class="col bet-odds-grid">ML</div>
      </div>
      <div class="row team" style="border-left: none; border-top:none; border-right:none;">
        <div class="col-auto bet-main-element">${currentGame.away_team}</div>
        <div class="col mobileText bet-odds-grid">${
          awaySpread + "(" + awaySpreadOdds + ")"
        }</div>
        <div class="col mobileText bet-odds-grid">${
          overValue + "(" + overOdds + ")"
        }</div>
        <div class="col mobileText bet-odds-grid">${awayMoneyline}</div>
      </div>
      <div class="row team">
        <div class="col-auto bet-main-element">${currentGame.home_team}</div>
        <div class="col mobileText bet-odds-grid">${
          homeSpread + "(" + homeSpreadOdds + ")"
        }</div>
        <div class="col mobileText bet-odds-grid">${
          underValue + "(" + underOdds + ")"
        }</div>
        <div class="col mobileText bet-odds-grid">${homeMoneyline}</div>
      </div>`;

  htmlSegment += `
      </div>
    </div>`;

  return htmlSegment;
}

function setValues(currentGame) {
  awaySpread =
    homeSpread =
    homeSpreadOdds =
    awaySpreadOdds =
    awayMoneyline =
    homeMoneyline =
    overValue =
    underValue =
    overOdds =
    underOdds =
      0;

  if (currentGame.bookmakers[0].markets.length === 1) {
    let currentMarket = currentGame.bookmakers[0].markets[0].key;
    if (currentMarket === "spreads") {
      if (
        currentGame.away_team ==
        currentGame.bookmakers[0].markets[0].outcomes[0].name
      ) {
        awaySpread = currentGame.bookmakers[0].markets[0].outcomes[0].point;
        awaySpreadOdds = currentGame.bookmakers[0].markets[0].outcomes[0].price;
        homeSpread = currentGame.bookmakers[0].markets[0].outcomes[1].point;
        homeSpreadOdds = currentGame.bookmakers[0].markets[0].outcomes[1].price;
      } else {
        awaySpread = currentGame.bookmakers[0].markets[0].outcomes[1].point;
        awaySpreadOdds = currentGame.bookmakers[0].markets[0].outcomes[1].price;
        homeSpread = currentGame.bookmakers[0].markets[0].outcomes[0].point;
        homeSpreadOdds = currentGame.bookmakers[0].markets[0].outcomes[0].price;
      }
    }
    if (currentMarket === "h2h") {
      if (
        currentGame.away_team ==
        currentGame.bookmakers[0].markets[0].outcomes[0].name
      ) {
        awayMoneyline = currentGame.bookmakers[0].markets[0].outcomes[0].price;
        homeMoneyline = currentGame.bookmakers[0].markets[0].outcomes[1].price;
      }
    }
    if (currentMarket === "totals") {
      if (currentGame.bookmakers[0].markets[0].outcomes[0].name == "Over") {
        overValue = currentGame.bookmakers[0].markets[0].outcomes[0].point;
        overOdds = currentGame.bookmakers[0].markets[0].outcomes[0].price;
        underValue = currentGame.bookmakers[0].markets[0].outcomes[1].point;
        underOdds = currentGame.bookmakers[0].markets[0].outcomes[1].price;
      } else {
        overValue = currentGame.bookmakers[0].markets[i].outcomes[1].point;
        overOdds = currentGame.bookmakers[0].markets[i].outcomes[1].price;
        underValue = currentGame.bookmakers[0].markets[i].outcomes[0].point;
        underOdds = currentGame.bookmakers[0].markets[i].outcomes[0].price;
      }
    }
  }
  if (currentGame.bookmakers[0].markets.length === 2) {
    for (let i = 0; i < 2; i++) {
      let currentMarket = currentGame.bookmakers[0].markets[i].key;
      setMultipleValues(currentGame, currentMarket, i);
    }
  }
  if (currentGame.bookmakers[0].markets.length === 3) {
    for (let i = 0; i < 3; i++) {
      let currentMarket = currentGame.bookmakers[0].markets[i].key;
      setMultipleValues(currentGame, currentMarket, i);
    }
  }

  function setMultipleValues(currentGame, currentMarket, i) {
    if (currentMarket === "spreads") {
      if (
        currentGame.away_team ==
        currentGame.bookmakers[0].markets[i].outcomes[0].name
      ) {
        awaySpread = currentGame.bookmakers[0].markets[i].outcomes[0].point;
        awaySpreadOdds = currentGame.bookmakers[0].markets[i].outcomes[0].price;
        homeSpread = currentGame.bookmakers[0].markets[i].outcomes[1].point;
        homeSpreadOdds = currentGame.bookmakers[0].markets[i].outcomes[1].price;
      } else {
        awaySpread = currentGame.bookmakers[0].markets[i].outcomes[1].point;
        awaySpreadOdds = currentGame.bookmakers[0].markets[i].outcomes[1].price;
        homeSpread = currentGame.bookmakers[0].markets[i].outcomes[0].point;
        homeSpreadOdds = currentGame.bookmakers[0].markets[i].outcomes[0].price;
      }
    } else if (currentMarket === "h2h") {
      if (
        currentGame.away_team ==
        currentGame.bookmakers[0].markets[i].outcomes[0].name
      ) {
        awayMoneyline = currentGame.bookmakers[0].markets[i].outcomes[0].price;
        homeMoneyline = currentGame.bookmakers[0].markets[i].outcomes[1].price;
      }
    } else if (currentMarket === "totals") {
      if (currentGame.bookmakers[0].markets[i].outcomes[0].name == "Over") {
        overValue = currentGame.bookmakers[0].markets[i].outcomes[0].point;
        overOdds = currentGame.bookmakers[0].markets[i].outcomes[0].price;
        underValue = currentGame.bookmakers[0].markets[i].outcomes[1].point;
        underOdds = currentGame.bookmakers[0].markets[i].outcomes[1].price;
      } else {
        overValue = currentGame.bookmakers[0].markets[i].outcomes[1].point;
        overOdds = currentGame.bookmakers[0].markets[i].outcomes[1].price;
        underValue = currentGame.bookmakers[0].markets[i].outcomes[0].point;
        underOdds = currentGame.bookmakers[0].markets[i].outcomes[0].price;
      }
    }
  }
}
