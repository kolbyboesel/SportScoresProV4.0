//API KEY-9f3436bf65c47b3988484cb92d3cb3be

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

async function showNBANews() {
  $("body").removeClass("offcanvas-menu");
  buildNBAHomepage(
    await getNBANewsData("https://nba-latest-news.p.rapidapi.com/articles"),
    "containerNBA"
  );
}

async function buildNBAHomepage(allNews, containerName) {
  clear(containerName);

  let html =
    '<div class="pageHeader containerPad">Click Any Of The Boxes Below To View The Latest Stories!</div>';
  allNews.forEach((currentGame) => {
    let newsTitle = currentGame.title;
    let url = currentGame.url;
    let src = currentGame.source;
    let img = 0;
    if (src === "nba_canada" || src === "nba") {
      img = "/images/nbaLogo.png";
    }
    if (src === "espn") {
      img = "/images/espnLogo.png";
    }
    if (src === "slam") {
      img = "/images/slamLogo.png";
    }
    if (src === "yahoo") {
      img = "/images/yahooLogo.png";
    }
    if (src === "bleacher_report") {
      img = "/images/brLogo.png";
    }

    html += generateNBAHomepage(newsTitle, url, img);
  });

  let container = document.querySelector("." + containerName);
  container.innerHTML = html;
}

function generateNBAHomepage(newsTitle, url, img) {
  let htmlSegment = `<a class="sportsLink mobileScreen" href="${url}">
                      <div class="outerNews">
                        <div class="sportsNews"`;

  htmlSegment += `
      <div class="article">
        <div class="sourceLogo"><img class="imageStyle" src="${img}"></img></div>
        <div class="newsTitle">${newsTitle}</div>
      </div>`;
  htmlSegment += `
      </div>
    </div>
    </a>`;

  return htmlSegment;
}
