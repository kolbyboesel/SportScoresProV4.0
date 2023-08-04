function AddNoStandingsTxt() {
  return `<div class="page-text">Standings Currently Unavailable, Check Back Later!</div>`;
}

async function showStandings(
  seasonID,
  tournamentID,
  containerName,
  loadingName
) {
  let loadingContainerObj = document.querySelector("." + loadingName);
  loadingContainerObj.style.display = "revert";
  let data = "";
  let html = "";
  try {
    data = await getAllData(
      "https://sofascores.p.rapidapi.com/v1/seasons/standings?standing_type=total&seasons_id=" +
        seasonID +
        "&tournament_id=" +
        tournamentID
    );
  } catch (error) {}
  html += buildStandings(data);
  if ((html += "")) {
    html += AddNoStandingsTxt();
  }
  let container = document.querySelector("." + containerName);
  loadingContainerObj.style.display = "none";
  container.innerHTML = html;
}

function buildStandings(allData) {
  let data = allData.data;
  let currentSport = data[0].tournament.category.sport.name;
  let teamDataArray = [];
  let arrayID = 0;
  let i = 0;
  if (currentSport == "Baseball") {
    data.forEach((currentStandings) => {
      if (currentStandings.name == "MLB") {
        arrayID = i;
      }
      i++;
    });
  }
  if (currentSport == "American football") {
    data.forEach((currentStandings) => {
      if (currentStandings.name == "NFL 23/24") {
        arrayID = i;
      }
      i++;
    });
  }
  let league = data[arrayID].name;

  data[arrayID].rows.forEach((currentTeam) => {
    let tempArray = [];
    tempArray.push(currentTeam.position);
    tempArray.push(currentTeam.team.nameCode);
    tempArray.push(currentTeam.team.name);
    tempArray.push(currentTeam.wins);
    tempArray.push(currentTeam.losses);
    if (currentSport == "Football") {
      tempArray.push(currentTeam.draws);
      tempArray.push(currentTeam.points);
    }
    if (currentSport == "Baseball") {
      tempArray.push(currentTeam.percentage);
      tempArray.push(currentTeam.gamesBehind);
    }
    teamDataArray.push(tempArray);
  });
  let html = "";
  html += constructStandings(league, currentSport, teamDataArray);
  return html;
}

function constructStandings(league, currentSport, leagueData) {
  let html = "";
  html += `<div class="container gamePreview no-gutters">
    <div class="row flex-nowrap header">
        <div class="col-12 center-text ">${league}</div>
    </div>
    <div class="row flex-nowrap">
        <div class="col">
            <div class="d-flex flex-column bd-highlight mb-3">
            <div class="p-2 bd-highlight">
                    <div class="container no-gutters">
                        <div class="row flex-nowrap">
                            <div class="col-2 center-text">
                                Rank
                            </div>
                            <div class="col sm-screen">
                                Team
                            </div>
                            <div class="col lg-screen">
                                Team
                            </div>
                            <div class="col-2 center-text">
                                W
                            </div>
                            <div class="col-2 center-text">
                                L
                            </div>`;
  if (currentSport == "Football") {
    html += `<div class="col-2 center-text">
                            D
                        </div>
                        <div class="col-2 center-text lg-screen">
                                Pts
                            </div>
                            `;
  }
  if (currentSport == "Baseball") {
    html += `<div class="col-2 center-text lg-screen">
                            Win %
                        </div>
                        <div class="col-2 center-text">
                                GB
                            </div>
                            `;
  }
  html += `</div>
                    </div>
                </div>`;
  for (let i = 0; i < leagueData.length; i++) {
    html += `<div class="p-2 bd-highlight">
                    <div class="container no-gutters">
                        <div class="row flex-nowrap">
                            <div class="col-2 center-text">
                                ${leagueData[i][0]}.
                            </div>
                            <div class="col sm-screen">
                                ${leagueData[i][1]}
                            </div>
                            <div class="col lg-screen">
                                ${leagueData[i][2]}
                            </div>
                            <div class="col-2 center-text">
                                ${leagueData[i][3]}
                            </div>
                            <div class="col-2 center-text">
                                ${leagueData[i][4]}
                            </div>`;
    if (currentSport == "Baseball" || currentSport == "Football") {
      html += `<div class="col-2 center-text lg-screen">
                                ${leagueData[i][5]}
                            </div>
                            <div class="col-2 center-text">
                                ${leagueData[i][6]}
                            </div>`;
    }
    html += `</div>
                    </div>
                </div>`;
  }
  html += `</div>
        </div>
    </div>
</div>`;
  return html;
}

//showStandings("47941", "108806", "containerPrem", "PremLoading");
