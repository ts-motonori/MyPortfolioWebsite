/**
 * Sets loading. 
 */
function endLoading() {
  $.when(
    $(".loadingWrap").hide()
  ).done(function () {
    $(".unLoadingBlock").removeClass("unLoadingBlock");
  });
}

/**
 * Sets inview animations. 
 */
function setInviewAnimation() {

  $inviewEls = $(".inview");
  $inviewEls.on("inview", function () {

    $inviewEl = $(this);
    $inviewEl.css("animation-delay", $inviewEl.attr("data-delay"));
    $inviewEl.css("animation-duration", $inviewEl.attr("data-duration"));
    $inviewEl.addClass($inviewEl.attr("data-animate"));

  });

}

/**
 * Sets smooth scroll. 
 */
function setSmoothScroll() {

  $("a[href^='#']").click(function () {

    const speed = 500;
    const href = $(this).attr("href");
    const target = $(href == "#" || href == "" ? "html" : href);
    const position = target.offset().top;

    $("html, body").animate({
      scrollTop: position
    }, speed, "swing");

  });

}

/**
 * Sets navigation helper.
 */
function setNavigationHelper() {

  let positions = [];
  $(".linkInPage").each(function () {
    const name = $(this).attr("id");
    const offset = $(this).offset().top;
    positions[name] = offset;
  });

  const setActiveNavigation = function () {
    const scrollPosition = $(window).scrollTop() + (window.innerHeight * 0.35);
    for (let name in positions) {
      if (positions[name] <= scrollPosition) {
        const $menus = $(".header_menu, .sp_menu");
        const $activeMenu = $menus.find("a[href='#" + name + "']");
        $menus.find("a").removeClass("active");
        $activeMenu.addClass("active");
      }
    }
  };

  $(window).scroll(function () {
    setActiveNavigation();
  });

  setActiveNavigation();

}

/**
 * Sets sp menu.
 */
function setSpMenu() {

  const slideSpeed = 200;

  $(".menuTrigger").on("click", function () {
    $menuEl = $(".sp_menu_button");
    $menuEl.toggleClass("active");
    $($menuEl.data("target")).slideToggle(slideSpeed);
    $($menuEl.data("override")).slideToggle(slideSpeed);
  });

}

/**
 * Sets skill charts.
 */
function setSkillCharts() {

  const createNewChart = function ($chartEl) {

    new Chart($chartEl, {
      type: "radar",
      data: chartData[$chartEl.data("chart")],
      options: {
        legend: {
          labels: {
            fontColor: "#333"
          }
        },
        title: {
          fontColor: "#333",
        },
        responsive: true,
        maintainAspectRatio: false,
        scale: {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            max: 3,
            fontSize: 12,
            fontColor: "#aaa"
          },
          pointLabels: {
            fontSize: 14,
            fontColor: "#333"
          }
        },
      }
    });
  };

  $(".raderChart").each(function () {

    const $chartEl = $(this);
    let animationLock = false;

    $chartEl[0].getContext("2d").canvas.height = 280;
    $chartEl.on("inview", function () {
      if (animationLock) { return; }

      createNewChart($chartEl);
      animationLock = true;

    });

  });

}