window.Alert = function (message) {
  alert(message);
};

$(function () {
  var siteSticky = function () {
    $(".js-sticky-header").sticky({ topSpacing: 0 });
  };
  siteSticky();

  var siteMenuClone = function () {
    $(".js-clone-nav").each(function () {
      var $this = $(this);
      $this
        .clone()
        .attr("class", "site-nav-wrap")
        .appendTo(".site-mobile-menu-body");
    });

    setTimeout(function () {
      var counter = 0;
      $(".site-mobile-menu .has-children").each(function () {
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find(".arrow-collapse").attr({
          "data-toggle": "collapse",
          "data-target": "#collapseItem" + counter,
        });

        $this.find("> ul").attr({
          class: "collapse",
          id: "collapseItem" + counter,
        });

        counter++;
      });
    }, 1000);

    $("body").on("click", ".arrow-collapse", function (e) {
      var $this = $(this);
      if ($this.closest("li").find(".collapse").hasClass("show")) {
        $this.removeClass("active");
      } else {
        $this.addClass("active");
      }
      e.preventDefault();
    });

    $(window).resize(function () {
      var $this = $(this),
        w = $this.width();

      if (w > 768) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });

    $("body").on("click", ".js-menu-toggle", function (e) {
      var $this = $(this);
      e.preventDefault();

      if ($("body").hasClass("offcanvas-menu")) {
        $("body").removeClass("offcanvas-menu");
      } else {
        $("body").addClass("offcanvas-menu");
        $this.addClass("active");
      }
    });

    // click outisde offcanvas
    $(document).mouseup(function (e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });
    $("body").on("click", ".Home", function (e) {
      var $this = $(this);
      e.preventDefault();
      window.location.href = "https://sportscores.azurewebsites.net/";
      $("body").removeClass("offcanvas-menu");
    });

    $("body").on("click", ".LiveScores", function (e) {
      var $this = $(this);
      e.preventDefault();
      window.location.href = "https://sportscores.azurewebsites.net/LiveScores";
      $("body").removeClass("offcanvas-menu");
    });

    $("body").on("click", ".BettingOdds", function (e) {
      var $this = $(this);
      e.preventDefault();
      window.location.href = "https://sportscores.azurewebsites.net/AllBetOdds";
      $("body").removeClass("offcanvas-menu");
    });

    $("body").on("click", ".MLB", function (e) {
      var $this = $(this);
      e.preventDefault();
      window.location.href = "https://sportscores.azurewebsites.net/MLB";
      $("body").removeClass("offcanvas-menu");
    });

    $("body").on("click", ".NBA", function (e) {
      var $this = $(this);
      e.preventDefault();
      window.location.href = "https://sportscores.azurewebsites.net/NBA";
      $("body").removeClass("offcanvas-menu");
    });

    $("body").on("click", ".NFL", function (e) {
      var $this = $(this);
      e.preventDefault();
      window.location.href = "https://sportscores.azurewebsites.net/NFL";
      $("body").removeClass("offcanvas-menu");
    });

    $("body").on("click", ".NHL", function (e) {
      var $this = $(this);
      e.preventDefault();
      window.location.href = "https://sportscores.azurewebsites.net/NHL";
      $("body").removeClass("offcanvas-menu");
    });

    $("body").on("click", ".Login", function (e) {
      var $this = $(this);
      e.preventDefault();
      window.location.href = "https://sportscores.azurewebsites.net/Login";
      $("body").removeClass("offcanvas-menu");
    });

    $("body").on("click", ".Signup", function (e) {
      var $this = $(this);
      e.preventDefault();
      window.location.href = "https://sportscores.azurewebsites.net/Signup";
      $("body").removeClass("offcanvas-menu");
    });

    $("body").on("click", ".AccountHome", function (e) {
      var $this = $(this);
      e.preventDefault();
      window.location.href =
        "https://sportscores.azurewebsites.net/AccountHome";
      $("body").removeClass("offcanvas-menu");
    });

    $("body").on("click", ".Contact", function (e) {
      var $this = $(this);
      e.preventDefault();
      window.location.href = "https://sportscores.azurewebsites.net/Contact";
      $("body").removeClass("offcanvas-menu");
    });

    $("body").on("click", ".ChangeEmail", function (e) {
      var $this = $(this);
      e.preventDefault();
      window.location.href =
        "https://sportscores.azurewebsites.net/ChangeEmail";
      $("body").removeClass("offcanvas-menu");
    });

    $("body").on("click", ".ChangePsw", function (e) {
      var $this = $(this);
      e.preventDefault();
      window.location.href = "https://sportscores.azurewebsites.net/ChangePsw";
      $("body").removeClass("offcanvas-menu");
    });
  };
  siteMenuClone();
});

window.changeElementStyle = function (element, property, value) {
  element.style[property] = value;
};

/* Code that highlights active page on the main nav */
function removeAll() {
  let home = document.getElementById("home");
  home.classList.remove("active");
  let live = document.getElementById("live");
  live.classList.remove("active");
  let betOdds = document.getElementById("betting");
  betOdds.classList.remove("active");
}

function homeActive() {
  removeAll();
  let currentBtn = document.getElementById("home");
  currentBtn.classList.add("active");
}

function liveActive() {
  removeAll();
  let currentBtn = document.getElementById("live");
  currentBtn.classList.add("active");
}

function bettingActive() {
  removeAll();
  let currentBtn = document.getElementById("betting");
  currentBtn.classList.add("active");
}
