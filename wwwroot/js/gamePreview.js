async function loadGamePreview(
  live,
  gameID,
  homeTeamID,
  awayTeamID,
  containerName,
  loadingContainer
) {
  let loadingContainerObj = document.querySelector("." + loadingContainer);
  loadingContainerObj.style.display = "revert";
  let homeTeamLogo = await getImgLogo(
    "https://sofascores.p.rapidapi.com/v1/teams/logo?team_id=" + homeTeamID
  );
  let awayTeamLogo = await getImgLogo(
    "https://sofascores.p.rapidapi.com/v1/teams/logo?team_id=" + awayTeamID
  );
  let html = "";

  html += generateGamePreview(
    live,
    homeTeamLogo,
    awayTeamLogo,
    await getAllData(
      "https://sofascores.p.rapidapi.com/v1/events/form?event_id=" + gameID
    ),
    await getAllData(
      "https://sofascores.p.rapidapi.com/v1/events/lineups?event_id=" + gameID
    ),
    await getAllData(
      "https://sofascores.p.rapidapi.com/v1/events/data?event_id=" + gameID
    ),
    await getAllData(
      "https://sofascores.p.rapidapi.com/v1/events/odds/all?event_id=" +
        gameID +
        "&odds_format=decimal&provider_id=1"
    )
  );

  let container = document.querySelector("." + containerName);
  loadingContainerObj.style.display = "none";
  container.innerHTML = html;
}

function generateGamePreview(
  live,
  homeTeamLogo,
  awayTeamLogo,
  formData,
  lineupData,
  eventData,
  oddData
) {
  let form = formData.data;
  let lineup = lineupData.data;
  let event = eventData.data;
  let odds = oddData.data;

  let sport = event.tournament.category.sport.name;
  let homeRecord = "   ";
  let awayRecord = "   ";
  let homeTeam = "        ";
  let awayTeam = "        ";
  let shortHomeTeamName = "  ";
  let shortAwayTeamName = "   ";
  let homeManager = "        ";
  let awayManager = "        ";
  let homeLineup = [];
  let awayLineup = [];
  try {
    homeRecord = form.homeTeam.value;
  } catch (error) {}
  try {
    awayRecord = form.awayTeam.value;
  } catch (error) {}

  try {
    homeTeam = event.homeTeam.name;
  } catch (error) {}

  try {
    awayTeam = event.awayTeam.name;
  } catch (error) {}

  try {
    shortHomeTeamName = event.homeTeam.nameCode;
  } catch (error) {}

  try {
    shortAwayTeamName = event.awayTeam.nameCode;
  } catch (error) {}

  try {
    homeManager = event.homeTeam.manager.name;
  } catch (error) {}

  try {
    awayManager = event.awayTeam.manager.name;
  } catch (error) {}
  try {
    lineup.home.players.forEach((currentPlayer) => {
      let tempArray = [];
      if (currentPlayer.substitute == false) {
        tempArray.push(currentPlayer.player.shortName);
        tempArray.push(currentPlayer.player.position);
        homeLineup.push(tempArray);
      } else if (currentPlayer.substitute == true && sport == "Baseball") {
        tempArray.push(currentPlayer.player.shortName);
        tempArray.push(currentPlayer.player.position);
        homeLineup.push(tempArray);
      }
    });
  } catch (error) {}
  try {
    lineup.away.players.forEach((currentPlayer) => {
      let tempArray = [];
      if (currentPlayer.substitute == false) {
        tempArray.push(currentPlayer.player.shortName);
        tempArray.push(currentPlayer.player.position);
        awayLineup.push(tempArray);
      } else if (currentPlayer.substitute == true && sport == "Baseball") {
        tempArray.push(currentPlayer.player.shortName);
        tempArray.push(currentPlayer.player.position);
        awayLineup.push(tempArray);
      }
    });
  } catch (error) {}
  let awayScore = "";
  let homeScore = "";
  let gameStatus = "";
  let homeMoneyline = "";
  let awayMoneyline = "";
  if (live == "Y") {
    awayScore = event.awayScore.current;
    homeScore = event.homeScore.current;
    gameStatus = event.status.description;
    if (gameStatus == "AET") {
      gameStatus = "Final/OT";
    }
    if (gameStatus == "Ended") {
      gameStatus = "Final";
    }
  } else {
    try {
      homeMoneyline = odds.choices[0].fractionalValue;
      awayMoneyline = odds.choices[1].fractionalValue;
    } catch (error) {
      homeMoneyline = "";
      awayMoneyline = "";
    }
  }
  let coachHeader = "Coach";
  if (sport == "Baseball") {
    coachHeader = "Manager";
  }
  let html = buildGamePreview(
    live,
    homeTeamLogo,
    awayTeamLogo,
    homeRecord,
    awayRecord,
    homeTeam,
    awayTeam,
    homeManager,
    awayManager,
    awayScore,
    homeScore,
    gameStatus,
    homeMoneyline,
    awayMoneyline,
    shortHomeTeamName,
    shortAwayTeamName,
    homeLineup,
    awayLineup,
    coachHeader
  );

  return html;
}

function buildGamePreview(
  live,
  homeTeamLogo,
  awayTeamLogo,
  homeRecord,
  awayRecord,
  homeTeam,
  awayTeam,
  homeManager,
  awayManager,
  awayScore,
  homeScore,
  gameStatus,
  homeMoneyline,
  awayMoneyline,
  shortHomeTeamName,
  shortAwayTeamName,
  homeLineup,
  awayLineup,
  coachHeader
) {
  let html = "";
  html +=
    `<div class="container gamePreview">
     <div class="row flex-nowrap">
         <div class="col center-elements">
             <div class="container no-gutters">
                 <div class="row flex-nowrap">

                     <div class="col-auto center-elements no-gutters"><img class="height-6vh" src="` +
    awayTeamLogo +
    `"></div>
                     <div class="col team-name-style center-elements lg-screen center-text">${awayTeam}</div>
                     <div class="col team-name-style center-elements sm-screen center-text">${shortAwayTeamName}</div>`;
  if (live == "Y") {
    html += `<div
                         class="col-auto team-name-style center-elements bold-lg-font center-text no-gutters-sm">
                         ${awayScore}</div>`;
  } else {
    html += `<div class="col-auto team-name-style center-elements center-text no-gutters-sm">
                         ${awayMoneyline}</div>`;
  }

  html += `
                 </div>
             </div>
         </div>

         <div class="col-auto center-elements">`;
  if (live == "Y") {
    html += `<div>${gameStatus}</div>`;
  } else {
    html += `<div>at</div>`;
  }
  html += `</div>

         <div class="col center-elements">
             <div class="container no-gutters">
                 <div class="row flex-nowrap">`;
  if (live == "Y") {
    html += `<div
                         class="col-auto team-name-style center-elements bold-lg-font center-text no-gutters-sm">
                         ${homeScore}</div>
                     <div class="col team-name-style center-elements sm-screen center-text">${shortHomeTeamName}</div>
                     <div class="col team-name-style center-elements lg-screen center-text">${homeTeam}</div>`;
  } else {
    html += `<div class="col team-name-style center-elements sm-screen center-text">
                         ${shortHomeTeamName}</div>
                     <div class="col team-name-style center-elements lg-screen center-text">${homeTeam}</div>
                     <div class="col-auto team-name-style center-elements center-text no-gutters-sm">${homeMoneyline}
                     </div>`;
  }
  html +=
    `<div class="col-auto center-elements no-gutters"><img class="height-6vh" src="` +
    homeTeamLogo +
    `"></div>
                 </div>
             </div>
         </div>
     </div>

     <div class="row header">
         <div class="col center-elements">
             <div class="team-record-style center-elements center-text">${awayRecord}</div>
         </div>

         <div class="col-auto center-elements">
             <div> </div>
         </div>

         <div class="col center-elements">
             <div class="team-record-style center-elements center-text">${homeRecord}</div>
         </div>
     </div>

     <div class="row">
         <div class="col">
             <div class="d-flex flex-column bd-highlight mb-3">
                <div class=" p-2 bd-highlight center-elements center-text">Away Starters</div>`;
  for (let i = 0; i < awayLineup.length; i++) {
    html += `<div class="p-2 bd-highlight">
                     <div class="container no-gutters">
                         <div class="row flex-nowrap whitespace-nowrap">
                             <div class="col-auto">
                                 ${awayLineup[i][0]}
                             </div>
                             <div class="col right-text">
                            ${awayLineup[i][1]}
                            </div>
                        </div>
                    </div>
            </div>`;
  }
  html += `<div class=" p-2 bd-highlight center-text whitespace-nowrap">${coachHeader}: ${awayManager}</div>
                         </div>
                     </div>

                     <div class="col">
                         <div class="d-flex flex-column bd-highlight mb-3 right-text">
                         <div class=" p-2 bd-highlight center-elements center-text">Home Starters</div>`;

  for (let i = 0; i < homeLineup.length; i++) {
    html += `<div class="p-2 bd-highlight">
                                 <div class="container no-gutters">
                                     <div class="row flex-nowrap whitespace-nowrap">
                                         <div class="col-auto">
                                             ${homeLineup[i][0]}
                                         </div>
                                         <div class="col right-text">
                                            ${homeLineup[i][1]}
                                        </div>
                                    </div>
                                </div>
                            </div>`;
  }
  html += `<div class=" p-2 bd-highlight center-text whitespace-nowrap">${coachHeader}: ${homeManager}</div>
                                     </div>
                                 </div>
                         </div>
                     </div>`;
  return html;
}

async function getImgLogo(url) {
  try {
    const response = await fetch(url, generalOptions);
    const result = await response.blob();
    let imgUrl = URL.createObjectURL(result);
    return imgUrl;
  } catch (error) {
    console.error(error);
  }
}

loadGamePreview(
  "Y",
  "11163757",
  "3627",
  "3633",
  "liveScoresContainer",
  "liveLoading"
);
