"use strict";

$(function () {
  // loading window
  $(document).ready(function () {
    let counter = 0;
    let c = 0;
    let i = setInterval(function () {
      $(".loading__counter").html(c + "%");
      $(".loading__bar").css("width", c + "%");

      counter++;
      c++;

      if (counter == 101) {
        clearInterval(i);
        $(".loading").fadeOut(500);
      }
    }, 30);
  });

  //hamburger-menu
  $(".hm").click(function () {
    $(".header__nav,.hm__top,.hm__middle,.hm__bottom,.hm__bar").toggleClass(
      "is-active"
    );
    $("html,body").toggleClass("is-active");
  });

  // slide-in
  $(window).scroll(function () {
    $(".js-trigger").each(function () {
      let nowScroll = $(window).scrollTop();
      let windowHeight = $(window).height();
      let servicePoint = $(this).offset().top;
      let triggerPoint = servicePoint - windowHeight / 2;
      if (nowScroll > triggerPoint) {
        $(this).find(".js-slide").addClass("is-active");
      }
    });
  });

  // header
  $(window).scroll(function () {
    let winTop = $(this).scrollTop();
    let winHeight = $(this).height();
    let getClass = $(".footer").attr("class");
    if (winTop >= winHeight - 40 && winTop <= winHeight * 4.8) {
      $(".header__flex,.header__ttl,.hm__bar").addClass("fixed");
    } else if (winTop >= winHeight * 4.8) {
      $(".header__flex,.header__ttl,.hm__bar").removeClass("fixed");
    } else {
      $(".header__flex,.header__ttl,.hm__bar").removeClass("fixed");
    }
  });

  // slideshow
  let nowPage = 0;
  let nextPage = 1;
  const slides = $(".about__slide-img");
  const slideLength = slides.length;
  const fadeTime = 1500;
  const showTime = 5000;

  slides.hide();

  slides.eq(nowPage).show();
  const slideshow = () => {
    slides.eq(nextPage).fadeIn(fadeTime);
    slides.eq(nowPage).fadeOut(fadeTime);
    nowPage = nextPage;
    nextPage = (nextPage + 1) % slideLength;
  };
  setInterval(slideshow, showTime);

  // mouse stalker
  let stalker = $("#stalker");

  $(".works__item-link").hover(
    function () {
      let getId = $(this).attr("id");
      switch (getId) {
        case "creativity":
          stalker.stop().animate({ opacity: 1 }, 500);
          stalker.css({ backgroundImage: "url('img/creativity.jpg')" });
          break;
        case "zeroplus_cs":
          stalker.stop().animate({ opacity: 1 }, 500);
          stalker.css({ backgroundImage: "url('img/zeroplus_cs.jpg')" });
          break;
        default:
          stalker.stop().animate({ opacity: 0 }, 500);
          break;
      }
    },
    function () {
      stalker.stop().animate({ opacity: 0 }, 500);
      stalker.css({ backgroundImage: "none" });
    }
  );

  $(".works__item-link").on("mousemove", function (e) {
    let x = e.clientX;
    let y = e.clientY;
    stalker.css({
      opacity: "1",
      top: y + "px",
      left: x + "px",
    });
  });

  // page scroll
  $.scrollify({
    section: ".scrollify", //対象要素を指定
    easing: "swing", // イージングを指定
    scrollSpeed: 1200, // スクロール時の速度
    updateHash: false, // スクロール時アドレスバーのURLを更新
  });
});
