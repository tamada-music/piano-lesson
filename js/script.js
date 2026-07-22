document.addEventListener("DOMContentLoaded", () => {
  // 各セクションをスクロール時にふんわり表示
  const fadeUpElements = document.querySelectorAll(
    ".introduction__inner--bottom, .about-lesson > .section-title, .about-lesson > .inner, .blog > .news__board--title, .blog > .text"
  );
  const fvBg = document.querySelector(".fv-bg");
  const fvTitleTexts = document.querySelectorAll(".fv__title span");
  const introductionImage = document.querySelector(".introduction__img");
  const teacherImage = document.querySelector(".teacher__img");
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (fvBg && fvTitleTexts.length > 0 && window.gsap && window.ScrollTrigger && !isReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: fvBg,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      })
      .from(fvBg, {
        autoAlpha: 0,
        scale: 1.04,
        delay: 0.5,
        duration: 1.4,
        ease: "power2.out",
      })
      .from(
        fvTitleTexts,
        {
          autoAlpha: 0,
          x: (index) => (index % 2 === 0 ? -80 : 80),
          y: 30,
          duration: 1,
          ease: "power3.out",
          stagger: 0.18,
        },
        "-=0.85"
      );
  }

  if (fadeUpElements.length > 0 && window.gsap && window.ScrollTrigger && !isReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    fadeUpElements.forEach((element) => {
      gsap.from(element, {
        autoAlpha: 0,
        y: 60,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    });
  }

  if ((introductionImage || teacherImage) && window.gsap && window.ScrollTrigger && !isReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    if (introductionImage) {
      gsap.from(introductionImage, {
        autoAlpha: 0,
        y: 70,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: introductionImage,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }

    if (teacherImage) {
      gsap.from(teacherImage, {
        autoAlpha: 0,
        x: -90,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teacherImage,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }
  }

  // FV以外の各セクションに音符を散りばめる
  const noteSymbols = ["♪", "♫", "♩", "♬"];
  const notePositions = [
    { x: "6%", y: "8%", s: "1.5em", r: "-18deg", d: "0s" },
    { x: "86%", y: "7%", s: "1.8em", r: "12deg", d: "0.6s" },
    { x: "38%", y: "14%", s: "1.3em", r: "8deg", d: "1.3s" },
    { x: "70%", y: "23%", s: "2em", r: "-8deg", d: "0.3s" },
    { x: "16%", y: "29%", s: "1.6em", r: "22deg", d: "1s" },
    { x: "92%", y: "39%", s: "1.4em", r: "-15deg", d: "1.7s" },
    { x: "30%", y: "47%", s: "1.9em", r: "5deg", d: "0.5s" },
    { x: "60%", y: "55%", s: "1.5em", r: "-22deg", d: "1.2s" },
    { x: "8%", y: "66%", s: "1.7em", r: "18deg", d: "0.9s" },
    { x: "78%", y: "72%", s: "2.2em", r: "-10deg", d: "1.5s" },
    { x: "45%", y: "82%", s: "1.4em", r: "15deg", d: "0.2s" },
    { x: "22%", y: "90%", s: "1.8em", r: "-20deg", d: "1.8s" },
  ];

  document.querySelectorAll("main > section:not(.fv)").forEach((section) => {
    const notesWrapper = document.createElement("div");
    notesWrapper.className = "section-notes";
    notesWrapper.setAttribute("aria-hidden", "true");

    notePositions.forEach((position, index) => {
      const note = document.createElement("span");
      note.className = "section-note";
      note.textContent = noteSymbols[index % noteSymbols.length];
      note.style.setProperty("--x", position.x);
      note.style.setProperty("--y", position.y);
      note.style.setProperty("--s", position.s);
      note.style.setProperty("--r", position.r);
      note.style.setProperty("--d", position.d);
      notesWrapper.appendChild(note);
    });

    section.appendChild(notesWrapper);
  });

  // ドロワーメニュー関連
  const drawerLinks = document.querySelectorAll(".drawer-menu__link");
  const hamburger = document.querySelector(".js-hamburger");
  const drawer = document.querySelector(".js-drawer");

  // ハンバーガーメニューの開閉
  document.body.addEventListener("click", (e) => {
    if (e.target.closest(".js-hamburger")) {
      hamburger.classList.toggle("is-active");
      drawer.classList.toggle("is-open");
    }
  });

  // メニューリンククリックでメニューを閉じる（アニメーション付き）
  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("is-active");
      drawer.classList.add("is-closing");

      setTimeout(() => {
        drawer.classList.remove("is-open", "is-closing");
      }, 400); // CSSのアニメーション時間に合わせる
    });
  });



  // アコーディオン（CSS grid-template-rows でスムーズに開閉）
  const accordions = document.querySelectorAll(".js-accordion");
  accordions.forEach((accordion) => {
    const items = accordion.querySelectorAll(".js-accordion__item");
    const shouldOpenFirst = !accordion.classList.contains("js-accordion--initially-closed");

    const setAccordionState = (item, isOpen) => {
      const title = item.querySelector(".js-accordion__title");
      const content = item.querySelector(".js-accordion__content");

      if (!title || !content) {
        return;
      }

      item.classList.toggle("is-open", isOpen);
      title.classList.toggle("is-open", isOpen);
      content.classList.toggle("is-open", isOpen);
      title.setAttribute("aria-expanded", isOpen ? "true" : "false");
      content.setAttribute("aria-hidden", isOpen ? "false" : "true");
    };

    items.forEach((item, index) => {
      setAccordionState(item, shouldOpenFirst && index === 0);
    });

    accordion.addEventListener("click", (event) => {
      const title = event.target.closest(".js-accordion__title");
      if (!title || !accordion.contains(title)) {
        return;
      }

      const item = title.closest(".js-accordion__item");
      if (!item) {
        return;
      }

      setAccordionState(item, !item.classList.contains("is-open"));
    });
  });





  // // アコーディオン
  // const accordionTitles = document.querySelectorAll(".js-accordion__title");
  // if (accordionTitles.length > 0) {
  //   const firstAccordionTitle = accordionTitles[0];
  //   const firstAccordionContent = firstAccordionTitle.nextElementSibling;

  //   if (firstAccordionContent) {
  //     firstAccordionTitle.classList.add("is-open");
  //     firstAccordionContent.style.display = "block";
  //     firstAccordionContent.style.maxHeight = firstAccordionContent.scrollHeight + "px";
  //   }

  //   accordionTitles.forEach((title) => {
  //     title.addEventListener("click", function () {
  //       this.classList.toggle("is-open");
  //       const content = this.nextElementSibling;
  //       if (content) {
  //         const isOpen = content.style.display === "block";
  //         content.style.display = isOpen ? "none" : "block";
  //         content.style.maxHeight = isOpen ? null : content.scrollHeight + "px";
  //       }
  //     });
  //   });
  // }

  // Swiperの初期化
  if (window.Swiper && document.querySelector(".swiper")) {
    new Swiper(".swiper", {
      loop: true,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      speed: 6000,
      spaceBetween: 10,
     // slidesPerView: 1,

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        500: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1440: {
          slidesPerView: 5,
        },
      },
    });
  }

  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  // トップへ戻るボタンの表示制御

  const topBtn = document.querySelector(".for-top-btn");
  const introElement = document.getElementById("about");

  if (topBtn && introElement) {
    const introTop = introElement.offsetTop; // ページ全体からの絶対位置を取得

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > introTop - 50) {
        topBtn.classList.remove("hidden");
      } else {
        topBtn.classList.add("hidden");
      }
    });
  }


  // FV画像アニメーション
  setTimeout(() => {
    document
      .querySelectorAll(".fv__img--lesson, .fv__img--door, .fv__img--up-piano")
      .forEach((image) => {
        image.classList.add("fv__img--rotate");
      });
  }, 500);

  // 音符の動き
  const notes = document.querySelectorAll(".fv__note");
  notes.forEach((note) => {
    note.classList.add("is-animated");
  });
});
