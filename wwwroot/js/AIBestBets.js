//API KEY-9f3436bf65c47b3988484cb92d3cb3be

const getBets = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7c01195a20mshbc9188a6ca4f5a5p1ce61cjsn5e640810eca6",
    "X-RapidAPI-Host": "betigolo-predictions.p.rapidapi.com",
  },
};

function removeAllActiveAI() {
  let nba = document.getElementById("nbaai");
  nba.classList.remove("active");
  let mlb = document.getElementById("mlbai");
  mlb.classList.remove("active");
  let nhl = document.getElementById("nhlai");
  nhl.classList.remove("active");
  let nfl = document.getElementById("nflai");
  nfl.classList.remove("active");
  let cbb = document.getElementById("cbbai");
  cbb.classList.remove("active");
  let cfb = document.getElementById("cfbai");
  cfb.classList.remove("active");
  let cbaseball = document.getElementById("cbaseballai");
  cbaseball.classList.remove("active");
  let prem = document.getElementById("premai");
  prem.classList.remove("active");
  let bund = document.getElementById("bundai");
  bund.classList.remove("active");
  let seriea = document.getElementById("serieaai");
  seriea.classList.remove("active");
  let ligue1 = document.getElementById("ligue1ai");
  ligue1.classList.remove("active");
  let laliga = document.getElementById("laligaai");
  laliga.classList.remove("active");
  let mls = document.getElementById("mlsai");
  mls.classList.remove("active");
}

function AddNoDataTxt() {
  return `<div style="color:white;width: 100%; height: 1%; padding-top: 30px; text-align: center; display: inline-block; font-size: 2vh;">Sorry, no data is available, please check back later!</div>`;
}

async function getBetData(url) {
  try {
    let res = await fetch(url, getBets);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getSoccerBetData() {
  let currentDate = getCurrentDate().substring(0, 10);
  try {
    let res = await fetch(
      "https://betminer.p.rapidapi.com/bm/predictions/list/" +
        currentDate +
        "/" +
        currentDate,
      soccerOptions
    );
    let result = await res.text();
    return JSON.parse(result);
  } catch (error) {
    console.log(error);
  }
}

const soccerOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7c01195a20mshbc9188a6ca4f5a5p1ce61cjsn5e640810eca6",
    "X-RapidAPI-Host": "betminer.p.rapidapi.com",
  },
};

function getEventDay(epochTIS) {
  let milliseconds = epochTIS * 1000;
  let date = new Date(milliseconds);
  date.setHours(date.getHours() - 5);
  return date.getDate();
}

function getCurrentDay() {
  let currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - 5);
  return currentDate.getDate();
}

function getCurrentDate() {
  let currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - 5);
  let date = currentDate.toISOString();
  date = date.substring(0, 10);
  return date;
}

function getDatePlusOne() {
  let currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - 5);
  currentDate.setDate(currentDate.getDate() + 1);
  let date = currentDate.toISOString();
  date = date.substring(0, 10);
  return date;
}

async function showNBABets() {
  removeAllActiveAI();
  let currentBtn = document.getElementById("nbaai");
  currentBtn.classList.add("active");
  let currentDate = getCurrentDate();
  let nextDay = getDatePlusOne();
  let html = "";

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/basketball/" + currentDate
    ),
    "containerNBA"
  );

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/basketball/" + nextDay
    ),
    "containerNBA"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".AccountContainer");
  container.innerHTML = html;
}

async function showMLBBets() {
  removeAllActiveAI();
  let currentBtn = document.getElementById("mlbai");
  currentBtn.classList.add("active");
  let currentDate = getCurrentDate();
  let nextDay = getDatePlusOne();
  let html = "";

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/baseball/" + currentDate
    ),
    "containerMLB"
  );

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/baseball/" + nextDay
    ),
    "containerMLB"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".AccountContainer");
  container.innerHTML = html;
}

async function showNFLBets() {
  removeAllActiveAI();
  let currentBtn = document.getElementById("nflai");
  currentBtn.classList.add("active");
  let currentDate = getCurrentDate();
  let nextDay = getDatePlusOne();
  let html = "";

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/football/" + currentDate
    ),
    "containerNFL"
  );

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/football/" + nextDay
    ),
    "containerNFL"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".AccountContainer");
  container.innerHTML = html;
}

async function showNHLBets() {
  removeAllActiveAI();
  let currentBtn = document.getElementById("nhlai");
  currentBtn.classList.add("active");
  let currentDate = getCurrentDate();
  let nextDay = getDatePlusOne();

  let html = "";

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/icehockey/" + currentDate
    ),
    "containerNHL"
  );

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/icehockey/" + nextDay
    ),
    "containerNHL"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".AccountContainer");
  container.innerHTML = html;
}

async function showCFBBets() {
  removeAllActiveAI();
  let currentBtn = document.getElementById("cfbai");
  currentBtn.classList.add("active");
  let currentDate = getCurrentDate();
  let nextDay = getDatePlusOne();

  let html = "";

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/football/" + currentDate
    ),
    "containerNHL"
  );

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/football/" + nextDay
    ),
    "containerCFB"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".AccountContainer");
  container.innerHTML = html;
}

async function showCBBBets() {
  removeAllActiveAI();
  let currentBtn = document.getElementById("cbbai");
  currentBtn.classList.add("active");
  let currentDate = getCurrentDate();
  let nextDay = getDatePlusOne();

  let html = "";

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/basketball/" + currentDate
    ),
    "containerCBB"
  );

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/basketball/" + nextDay
    ),
    "containerCBB"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".AccountContainer");
  container.innerHTML = html;
}

async function showCBaseballBets() {
  removeAllActiveAI();
  let currentBtn = document.getElementById("cbaseballai");
  currentBtn.classList.add("active");
  let currentDate = getCurrentDate();
  let nextDay = getDatePlusOne();

  let html = "";

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/baseball/" + currentDate
    ),
    "containerCBaseball"
  );

  html += buildBestBetBoard(
    await getBetData(
      "https://betigolo-predictions.p.rapidapi.com/baseball/" + nextDay
    ),
    "containerCBaseball"
  );

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".AccountContainer");
  container.innerHTML = html;
}

async function showPremBets() {
  removeAllActiveAI();
  let currentBtn = document.getElementById("premai");
  currentBtn.classList.add("active");

  let html = "";

  html += buildSoccerBetBoard(await getSoccerBetData(), "containerPrem");

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".AccountContainer");
  container.innerHTML = html;
}

async function showLaligaBets() {
  removeAllActiveAI();
  let currentBtn = document.getElementById("laligaai");
  currentBtn.classList.add("active");

  let html = "";

  html += buildSoccerBetBoard(await getSoccerBetData(), "containerLaliga");

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".AccountContainer");
  container.innerHTML = html;
}

async function showSerieABets() {
  removeAllActiveAI();
  let currentBtn = document.getElementById("serieaai");
  currentBtn.classList.add("active");

  let html = "";

  html += buildSoccerBetBoard(await getSoccerBetData(), "containerSerieA");

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".AccountContainer");
  container.innerHTML = html;
}

async function showLigue1Bets() {
  removeAllActiveAI();
  let currentBtn = document.getElementById("ligue1ai");
  currentBtn.classList.add("active");

  let html = "";

  html += buildSoccerBetBoard(await getSoccerBetData(), "containerLigue1");

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".AccountContainer");
  container.innerHTML = html;
}

async function showBundesligaBets() {
  removeAllActiveAI();
  let currentBtn = document.getElementById("bundai");
  currentBtn.classList.add("active");

  let html = "";

  html += buildSoccerBetBoard(await getSoccerBetData(), "containerBundesliga");

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".AccountContainer");
  container.innerHTML = html;
}

async function showMLSBets() {
  removeAllActiveAI();
  let currentBtn = document.getElementById("mlsai");
  currentBtn.classList.add("active");

  let html = "";

  html += buildSoccerBetBoard(await getSoccerBetData(), "containerMLS");

  if (html == "") {
    html += AddNoDataTxt();
  }

  let container = document.querySelector(".AccountContainer");
  container.innerHTML = html;
}

function round(value) {
  let temp = Math.ceil(value * 100) / 100;
  let returnValue = temp.toString().substring(0, 4);
  returnValue = returnValue * 100;
  let newVal = returnValue.toString().substring(0, 2);
  return newVal;
}

function buildBestBetBoard(allOdds, containerName) {
  let html = "";
  allOdds.forEach((currentGame) => {
    let homeTeam = 0;
    let awayTeam = 0;
    let homeMoneylineVal = 0;
    let awayMoneylineVal = 0;
    let currentLeague = currentGame.league_name;
    let currentDay = getCurrentDay();
    let eventDay = getEventDay(currentGame.match_dat);
    if (
      containerName === "containerMLB" &&
      currentGame.country_name === "USA" &&
      currentLeague === "MLB" &&
      currentDay === eventDay
    ) {
      homeTeam = currentGame.home_team_name;
      awayTeam = currentGame.away_team_name;
      homeMoneylineVal = round(currentGame.rank_htw_nt, 2);
      awayMoneylineVal = round(currentGame.rank_atw_nt, 2);
      firstOver = round(currentGame.rank_to_65_nt, 2);
      secondOver = round(currentGame.rank_to_75_nt, 2);
      thirdOver = round(currentGame.rank_to_85_nt, 2);
      fourthOver = round(currentGame.rank_to_95_nt, 2);
      fifthOver = round(currentGame.rank_to_105_nt, 2);
      firstOverVal = 6.5;
      secondOverVal = 7.5;
      thirdOverVal = 8.5;
      fourthOverVal = 9.5;
      fifthOverVal = 10.5;
      html += generateBestBetBoard(
        currentGame,
        homeTeam,
        awayTeam,
        homeMoneylineVal,
        awayMoneylineVal,
        firstOver,
        secondOver,
        thirdOver,
        fourthOver,
        fifthOver,
        firstOverVal,
        secondOverVal,
        thirdOverVal,
        fourthOverVal,
        fifthOverVal
      );
    }

    if (
      containerName === "containerCBaseball" &&
      currentGame.country_name === "USA" &&
      currentLeague === "NCAA" &&
      currentDay === eventDay
    ) {
      homeTeam = currentGame.home_team_name;
      awayTeam = currentGame.away_team_name;
      homeMoneylineVal = round(currentGame.rank_htw_nt, 2);
      awayMoneylineVal = round(currentGame.rank_atw_nt, 2);
      firstOver = round(currentGame.rank_to_65_nt, 2);
      secondOver = round(currentGame.rank_to_75_nt, 2);
      thirdOver = round(currentGame.rank_to_85_nt, 2);
      fourthOver = round(currentGame.rank_to_95_nt, 2);
      fifthOver = round(currentGame.rank_to_105_nt, 2);
      firstOverVal = 6.5;
      secondOverVal = 7.5;
      thirdOverVal = 8.5;
      fourthOverVal = 9.5;
      fifthOverVal = 10.5;
      html += generateBestBetBoard(
        currentGame,
        homeTeam,
        awayTeam,
        homeMoneylineVal,
        awayMoneylineVal,
        firstOver,
        secondOver,
        thirdOver,
        fourthOver,
        fifthOver,
        firstOverVal,
        secondOverVal,
        thirdOverVal,
        fourthOverVal,
        fifthOverVal
      );
    }

    if (
      containerName === "containerNHL" &&
      currentGame.country_name === "USA" &&
      currentLeague === "NHL" &&
      currentDay === eventDay
    ) {
      homeTeam = currentGame.home_team_name;
      awayTeam = currentGame.away_team_name;
      homeMoneylineVal = round(currentGame.rank_htw_nt, 2);
      awayMoneylineVal = round(currentGame.rank_atw_nt, 2);
      firstOver = round(currentGame.rank_to_35_nt, 2);
      secondOver = round(currentGame.rank_to_45_nt, 2);
      thirdOver = round(currentGame.rank_to_55_nt, 2);
      fourthOver = round(currentGame.rank_to_65_nt, 2);
      fifthOver = round(currentGame.rank_to_75_nt, 2);
      firstOverVal = 3.5;
      secondOverVal = 4.5;
      thirdOverVal = 5.5;
      fourthOverVal = 6.5;
      fifthOverVal = 7.5;
      html += generateBestBetBoard(
        currentGame,
        homeTeam,
        awayTeam,
        homeMoneylineVal,
        awayMoneylineVal,
        firstOver,
        secondOver,
        thirdOver,
        fourthOver,
        fifthOver,
        firstOverVal,
        secondOverVal,
        thirdOverVal,
        fourthOverVal,
        fifthOverVal
      );
    }

    if (
      containerName != "containerNHL" &&
      containerName != "containerMLB" &&
      currentGame.country_name === "USA" &&
      currentDay === eventDay &&
      currentLeague === "NBA"
    ) {
      homeTeam = currentGame.home_team_name;
      awayTeam = currentGame.away_team_name;
      homeMoneylineVal = round(currentGame.rank_htw_nt, 2);
      awayMoneylineVal = round(currentGame.rank_atw_nt, 2);
      firstOver = round(currentGame.rank_to_lvl1_nt, 2);
      secondOver = round(currentGame.rank_to_lvl2_nt, 2);
      thirdOver = round(currentGame.rank_to_lvl3_nt, 2);
      fourthOver = round(currentGame.rank_to_lvl4_nt, 2);
      fifthOver = round(currentGame.rank_to_lvl5_nt, 2);
      firstOverVal = 197.5;
      secondOverVal = 205.5;
      thirdOverVal = 213.5;
      fourthOverVal = 221.5;
      fifthOverVal = 229.5;
      html += generateBestBetBoard(
        currentGame,
        homeTeam,
        awayTeam,
        homeMoneylineVal,
        awayMoneylineVal,
        firstOver,
        secondOver,
        thirdOver,
        fourthOver,
        fifthOver,
        firstOverVal,
        secondOverVal,
        thirdOverVal,
        fourthOverVal,
        fifthOverVal
      );
    }

    if (
      containerName === "containerCBB" &&
      currentGame.country_name === "USA" &&
      currentLeague === "NCAA" &&
      currentDay === eventDay
    ) {
      homeTeam = currentGame.home_team_name;
      awayTeam = currentGame.away_team_name;
      homeMoneylineVal = round(currentGame.rank_htw_nt, 2);
      awayMoneylineVal = round(currentGame.rank_atw_nt, 2);
      firstOver = round(currentGame.rank_to_lvl1_nt, 2);
      secondOver = round(currentGame.rank_to_lvl2_nt, 2);
      thirdOver = round(currentGame.rank_to_lvl3_nt, 2);
      fourthOver = round(currentGame.rank_to_lvl4_nt, 2);
      fifthOver = round(currentGame.rank_to_lvl5_nt, 2);
      firstOverVal = 197.5;
      secondOverVal = 205.5;
      thirdOverVal = 213.5;
      fourthOverVal = 221.5;
      fifthOverVal = 229.5;
      html += generateBestBetBoard(
        currentGame,
        homeTeam,
        awayTeam,
        homeMoneylineVal,
        awayMoneylineVal,
        firstOver,
        secondOver,
        thirdOver,
        fourthOver,
        fifthOver,
        firstOverVal,
        secondOverVal,
        thirdOverVal,
        fourthOverVal,
        fifthOverVal
      );
    }
  });
  return html;
}

function buildSoccerBetBoard(allOdds, containerName) {
  let html = "";
  let homeTeam = 0;
  let awayTeam = 0;

  let homeForm = 0;
  let awayForm = 0;

  let homeMoneylineVal = 0;
  let awayMoneylineVal = 0;

  let drawVal = 0;
  let scorePredict = 0;
  let bothTeamsScore = 0;

  let firstOver = 0;
  let secondOver = 0;
  let thirdOver = 0;

  let firstOverVal = 0;
  let secondOverVal = 0;
  let thirdOverVal = 0;

  allOdds.forEach((currentGame) => {
    if (
      currentGame.country === "USA" &&
      currentGame.competition === "Major League Soccer" &&
      containerName === "containerMLS"
    ) {
      homeTeam = currentGame.homeTeam;
      awayTeam = currentGame.awayTeam;
      homeMoneylineVal = round(currentGame.home_win_odds, 2);
      awayMoneylineVal = round(currentGame.away_win_odds, 2);
      homeForm = currentGame.homeform;
      awayForm = currentGame.awayform;
      drawVal = round(currentGame.draw_odds, 2);
      scorePredict = currentGame.correctscore;
      bothTeamsScore = currentGame.both_teams_to_score;
      firstOver = currentGame.over15goals;
      secondOver = currentGame.over25goals;
      thirdOver = currentGame.over35goals;
      firstOverVal = 1.5;
      secondOverVal = 2.5;
      thirdOverVal = 3.5;
      html += generateSoccerBestBetBoard(
        currentGame,
        homeTeam,
        awayTeam,
        homeMoneylineVal,
        awayMoneylineVal,
        homeForm,
        awayForm,
        drawVal,
        scorePredict,
        bothTeamsScore,
        firstOver,
        secondOver,
        thirdOver,
        firstOverVal,
        secondOverVal,
        thirdOverVal
      );
    }

    if (
      currentGame.country === "England" &&
      currentGame.competition === "Premier League" &&
      containerName === "containerPrem"
    ) {
      homeTeam = currentGame.homeTeam;
      awayTeam = currentGame.awayTeam;
      homeMoneylineVal = round(currentGame.home_win_odds, 2);
      awayMoneylineVal = round(currentGame.away_win_odds, 2);
      homeForm = currentGame.homeform;
      awayForm = currentGame.awayform;
      drawVal = round(currentGame.draw_odds, 2);
      scorePredict = currentGame.correctscore;
      bothTeamsScore = currentGame.both_teams_to_score;
      firstOver = currentGame.over15goals;
      secondOver = currentGame.over25goals;
      thirdOver = currentGame.over35goals;
      firstOverVal = 1.5;
      secondOverVal = 2.5;
      thirdOverVal = 3.5;
      html += generateSoccerBestBetBoard(
        currentGame,
        homeTeam,
        awayTeam,
        homeMoneylineVal,
        awayMoneylineVal,
        homeForm,
        awayForm,
        drawVal,
        scorePredict,
        bothTeamsScore,
        firstOver,
        secondOver,
        thirdOver,
        firstOverVal,
        secondOverVal,
        thirdOverVal
      );
    }

    if (
      currentGame.country === "Germany" &&
      currentGame.competition === "Bundesliga" &&
      containerName === "containerBundesliga"
    ) {
      homeTeam = currentGame.homeTeam;
      awayTeam = currentGame.awayTeam;
      homeMoneylineVal = round(currentGame.home_win_odds, 2);
      awayMoneylineVal = round(currentGame.away_win_odds, 2);
      homeForm = currentGame.homeform;
      awayForm = currentGame.awayform;
      drawVal = round(currentGame.draw_odds, 2);
      scorePredict = currentGame.correctscore;
      bothTeamsScore = currentGame.both_teams_to_score;
      firstOver = currentGame.over15goals;
      secondOver = currentGame.over25goals;
      thirdOver = currentGame.over35goals;
      firstOverVal = 1.5;
      secondOverVal = 2.5;
      thirdOverVal = 3.5;
      html += generateSoccerBestBetBoard(
        currentGame,
        homeTeam,
        awayTeam,
        homeMoneylineVal,
        awayMoneylineVal,
        homeForm,
        awayForm,
        drawVal,
        scorePredict,
        bothTeamsScore,
        firstOver,
        secondOver,
        thirdOver,
        firstOverVal,
        secondOverVal,
        thirdOverVal
      );
    }

    if (
      currentGame.country === "Spain" &&
      currentGame.competition === "La Liga" &&
      containerName === "containerLaliga"
    ) {
      homeTeam = currentGame.homeTeam;
      awayTeam = currentGame.awayTeam;
      homeMoneylineVal = round(currentGame.home_win_odds, 2);
      awayMoneylineVal = round(currentGame.away_win_odds, 2);
      homeForm = currentGame.homeform;
      awayForm = currentGame.awayform;
      drawVal = round(currentGame.draw_odds, 2);
      scorePredict = currentGame.correctscore;
      bothTeamsScore = currentGame.both_teams_to_score;
      firstOver = currentGame.over15goals;
      secondOver = currentGame.over25goals;
      thirdOver = currentGame.over35goals;
      firstOverVal = 1.5;
      secondOverVal = 2.5;
      thirdOverVal = 3.5;
      html += generateSoccerBestBetBoard(
        currentGame,
        homeTeam,
        awayTeam,
        homeMoneylineVal,
        awayMoneylineVal,
        homeForm,
        awayForm,
        drawVal,
        scorePredict,
        bothTeamsScore,
        firstOver,
        secondOver,
        thirdOver,
        firstOverVal,
        secondOverVal,
        thirdOverVal
      );
    }

    if (
      currentGame.country === "Italy" &&
      currentGame.competition === "Serie A" &&
      containerName === "containerSerieA"
    ) {
      homeTeam = currentGame.homeTeam;
      awayTeam = currentGame.awayTeam;
      homeMoneylineVal = round(currentGame.home_win_odds, 2);
      awayMoneylineVal = round(currentGame.away_win_odds, 2);
      homeForm = currentGame.homeform;
      awayForm = currentGame.awayform;
      drawVal = round(currentGame.draw_odds, 2);
      scorePredict = currentGame.correctscore;
      bothTeamsScore = currentGame.both_teams_to_score;
      firstOver = currentGame.over15goals;
      secondOver = currentGame.over25goals;
      thirdOver = currentGame.over35goals;
      firstOverVal = 1.5;
      secondOverVal = 2.5;
      thirdOverVal = 3.5;
      html += generateSoccerBestBetBoard(
        currentGame,
        homeTeam,
        awayTeam,
        homeMoneylineVal,
        awayMoneylineVal,
        homeForm,
        awayForm,
        drawVal,
        scorePredict,
        bothTeamsScore,
        firstOver,
        secondOver,
        thirdOver,
        firstOverVal,
        secondOverVal,
        thirdOverVal
      );
    }

    if (
      currentGame.country === "France" &&
      currentGame.competition === "Ligue 1" &&
      containerName === "containerLigue1"
    ) {
      homeTeam = currentGame.homeTeam;
      awayTeam = currentGame.awayTeam;
      homeMoneylineVal = round(currentGame.home_win_odds, 2);
      awayMoneylineVal = round(currentGame.away_win_odds, 2);
      homeForm = currentGame.homeform;
      awayForm = currentGame.awayform;
      drawVal = round(currentGame.draw_odds, 2);
      scorePredict = currentGame.correctscore;
      bothTeamsScore = currentGame.both_teams_to_score;
      firstOver = currentGame.over15goals;
      secondOver = currentGame.over25goals;
      thirdOver = currentGame.over35goals;
      firstOverVal = 1.5;
      secondOverVal = 2.5;
      thirdOverVal = 3.5;
      html += generateSoccerBestBetBoard(
        currentGame,
        homeTeam,
        awayTeam,
        homeMoneylineVal,
        awayMoneylineVal,
        homeForm,
        awayForm,
        drawVal,
        scorePredict,
        bothTeamsScore,
        firstOver,
        secondOver,
        thirdOver,
        firstOverVal,
        secondOverVal,
        thirdOverVal
      );
    }
  });
  return html;
}

function generateBestBetBoard(
  currentGame,
  homeTeam,
  awayTeam,
  homeMoneylineVal,
  awayMoneylineVal,
  firstOver,
  secondOver,
  thirdOver,
  fourthOver,
  fifthOver,
  firstOverVal,
  secondOverVal,
  thirdOverVal,
  fourthOverVal,
  fifthOverVal
) {
  let htmlSegment = `<div class="col-12 center-elements pt-3 pb-3"><div class="container bestBets">`;

  htmlSegment += `<div class="row header border-bottom">
        <div class="col">Team</div>
        <div class="col right-text">Moneyline</div>
      </div>
      <div class="row team" style="border-left: none; border-top:none; border-right:none;">
        <div class="col">${awayTeam}</div>
        <div class="col right-text">${awayMoneylineVal}%</div>
      </div>
     
      <div class="row team">
        <div class="col">${homeTeam}</div>
        <div class="col right-text">${homeMoneylineVal}%</div>
      </div> 

      <div class="row header border-bottom border-top" style="border-top-style:solid;border-top-left-radius:0px!important;border-top-right-radius:0px!important">
      <div class="col center-text">Over ${firstOverVal}</div>
      <div class="col center-text">Over ${secondOverVal}</div>
      <div class="col center-text">Over ${thirdOverVal}</div>
      <div class="col center-text">Over ${fourthOverVal}</div>
      <div class="col center-text">Over ${fifthOverVal}</div>
      </div>
      
      <div class="row team">
        <div class="col center-text">${firstOver}%</div>
        <div class="col center-text">${secondOver}%</div>
        <div class="col center-text">${thirdOver}%</div>
        <div class="col center-text">${fourthOver}%</div>
        <div class="col center-text">${fifthOver}%</div>

      </div>`;

  htmlSegment += `
      </div>
    </div>`;

  return htmlSegment;
}

function generateSoccerBestBetBoard(
  currentGame,
  homeTeam,
  awayTeam,
  homeMoneylineVal,
  awayMoneylineVal,
  homeForm,
  awayForm,
  drawVal,
  scorePredict,
  bothTeamsScore,
  firstOver,
  secondOver,
  thirdOver,
  firstOverVal,
  secondOverVal,
  thirdOverVal
) {
  let htmlSegment = `<div class="col-12 center-elements pt-3 pb-3"><div class="container bestBets soccer-best-bet">`;

  htmlSegment += `<div class="row header border-bottom">
        <div class="col">Team</div>
        <div class="col right-text">Moneyline</div>
      </div>
      <div class="row team" style="border-left: none; border-top:none; border-right:none;">
        <div class="col-auto">${awayTeam} (Form: ${awayForm})</div>
        <div class="col right-text">${awayMoneylineVal}%</div>
      </div>
     
      <div class="row team">
        <div class="col-auto">${homeTeam} (Form: ${homeForm})</div>
        <div class="col right-text">${homeMoneylineVal}%</div>
      </div> 

      <div class="row header border-top border-bottom-none" style="border-top-style:solid;border-top-left-radius:0px!important;border-top-right-radius:0px!important">
      <div class="col center-text">Draw</div>
      <div class="col center-text">Score Prediction</div>
      <div class="col center-text">Both Teams to Score</div>
      </div>
      
      <div class="row team">
        <div class="col center-text">${drawVal}%</div>
        <div class="col center-text">${scorePredict}</div>
        <div class="col center-text">${bothTeamsScore}%</div>
      </div>

      <div class="row header border-top border-bottom-none" style="border-top-style:solid;border-top-left-radius:0px!important;border-top-right-radius:0px!important">
      <div class="col center-text">Over ${firstOverVal}</div>
      <div class="col center-text">Over ${secondOverVal}</div>
      <div class="col center-text">Over ${thirdOverVal}</div>
      </div>
      
      <div class="row team">
        <div class="col center-text">${firstOver}%</div>
        <div class="col center-text">${secondOver}%</div>
        <div class="col center-text">${thirdOver}%</div>
      </div>`;

  htmlSegment += `
      </div>
    </div>`;

  return htmlSegment;
}
