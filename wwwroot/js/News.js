//API KEY-9f3436bf65c47b3988484cb92d3cb3be

const mlbNews = {
  method: "GET",
  url: "https://api.sportsdata.io/v3/mlb/scores/json/News",
  headers: {
    "X-RapidAPI-Key": "7c01195a20mshbc9188a6ca4f5a5p1ce61cjsn5e640810eca6",
    "X-RapidAPI-Host": "nba-latest-news.p.rapidapi.com",
  },
};

const getNBANews = {
  method: "GET",
  url: "https://nba-latest-news.p.rapidapi.com/articles",
  headers: {
    "X-RapidAPI-Key": "7c01195a20mshbc9188a6ca4f5a5p1ce61cjsn5e640810eca6",
    "X-RapidAPI-Host": "nba-latest-news.p.rapidapi.com",
  },
};
async function getNBANewsData(url) {
  try {
    let res = await fetch(url, getNBANews);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getNewsData(url) {
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function showMLBNews() {
  $("body").removeClass("offcanvas-menu");
  buildHomepage(
    await getNewsData(
      "https://api.sportsdata.io/v3/mlb/scores/json/News?key=cfd056f739b1468db12353517381ca4d"
    ),
    "containerMLB"
  );
}

async function showNBANews() {
  $("body").removeClass("offcanvas-menu");
  buildHomepage(
    await getNBANewsData("https://nba-latest-news.p.rapidapi.com/articles"),
    "containerNBA"
  );
}

async function buildHomepage(allNews, containerName) {
  clear(containerName);

  let html =
    '<div class="pageHeader">Click Any Of The Boxes Below To View The Latest Stories!</div>';
  allNews.forEach((currentGame) => {
    let newsTitle = currentGame.title;
    let url = currentGame.url;
    if (newsTitle === undefined) {
      newsTitle = currentGame.Title;
    }
    if (url === undefined) {
      url = currentGame.Url;
    }
    let src = currentGame.source;
    let img = 0;

    if (src === "nba_canada" || src === "nba") {
      img = "/images/nbaLogo.png";
    } else if (src === "espn") {
      img = "/images/espnLogo.png";
    } else if (src === "slam") {
      img = "/images/slamLogo.png";
    } else if (src === "yahoo") {
      img = "/images/yahooLogo.png";
    } else if (src === "bleacher_report") {
      img = "/images/brLogo.png";
    } else {
      img = "/images/mlbLogo.png";
    }
    html += generateNewsHomepage(newsTitle, url, img);
  });

  let container = document.querySelector("." + containerName);
  container.innerHTML = html;
}

function generateNewsHomepage(newsTitle, url, img) {
  let htmlSegment = `<a class="col-lg-6 center-elements pt-3 pb-3 sportsLink" href="${url}"><div class="container sportsNews pt-3 pb-3"`;

  htmlSegment += `
      <div class="row article">
        <div class="col-4 sourceLogo"><img class="imageStyle" src="${img}"></img></div>
        <div class="col newsTitle">${newsTitle}</div>
      </div>`;
  htmlSegment += `
      </div>
    </div>
    </a>`;

  return htmlSegment;
}
