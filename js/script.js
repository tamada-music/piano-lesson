document.addEventListener("DOMContentLoaded", () => {
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

  // アコーディオン
  const accordionTitles = document.querySelectorAll(".js-accordion__title");
  if (accordionTitles.length > 0) {
    const firstAccordionTitle = accordionTitles[0];
    const firstAccordionContent = firstAccordionTitle.nextElementSibling;

    if (firstAccordionContent) {
      firstAccordionTitle.classList.add("is-open");
      firstAccordionContent.style.display = "block";
      firstAccordionContent.style.maxHeight = firstAccordionContent.scrollHeight + "px";
    }

    accordionTitles.forEach((title) => {
      title.addEventListener("click", function () {
        this.classList.toggle("is-open");
        const content = this.nextElementSibling;
        if (content) {
          const isOpen = content.style.display === "block";
          content.style.display = isOpen ? "none" : "block";
          content.style.maxHeight = isOpen ? null : content.scrollHeight + "px";
        }
      });
    });
  }

  // Swiperの初期化
  const swiperInstance = new Swiper(".swiper", {
    loop: true,
    allowTouchMove: false, 
    autoplay: { 
      delay: 0, 
      disableOnInteraction: false },
      speed: 1500,
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

  // トップへ戻るボタンの表示制御

  const topBtn = document.querySelector(".for-top-btn");
  const introElement = document.getElementById("introduction");

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
