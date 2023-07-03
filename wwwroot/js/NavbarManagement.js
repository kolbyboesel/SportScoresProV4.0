window.Alert = function (message) {
  alert(message);
};

$(function () {
  var siteSticky = function () {
    $(".js-sticky-header").sticky({ topSpacing: 0 });
  };
  siteSticky();

  let siteMenuClone = function () {
    $(".js-clone-nav").each(function () {
      let $this = $(this);
      $this
        .clone()
        .attr("class", "site-nav-wrap")
        .appendTo(".site-mobile-menu-body");
    });

    setTimeout(function () {
      let counter = 0;
      $(".site-mobile-menu .has-children").each(function () {
        let $this = $(this);

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
      let $this = $(this);
      if ($this.closest("li").find(".collapse").hasClass("show")) {
        $this.removeClass("active");
      } else {
        $this.addClass("active");
      }
      e.preventDefault();
    });

    $(window).resize(function () {
      let $this = $(this),
        w = $this.width();

      if (w > 768) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });

    $("body").on("click", ".js-menu-toggle", function (e) {
      let $this = $(this);
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
      let container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
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
