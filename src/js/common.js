;(function () {
  'use strict';

  /* ─── 공통 유틸 ─── */

  // DOM 준비 시 실행: 이미 로드됐으면 즉시, 로딩 중이면 DOMContentLoaded에 바인딩
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /* ─── 1. 모바일 사이드바 드로워 ─── */
  function initDrawer() {
    const menuBtn = document.querySelector('.site-header__menu-btn');
    const drawer = document.getElementById('site-drawer');
    const backdrop = document.querySelector('.site-drawer__backdrop');
    const closeBtn = document.querySelector('.site-drawer__close');

    if (!(menuBtn && drawer && backdrop && closeBtn)) return;

    const openDrawer = () => {
      drawer.setAttribute('aria-hidden', 'false');
      drawer.classList.add('site-drawer--active');
      backdrop.classList.add('site-drawer__backdrop--active');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    const closeDrawer = () => {
      drawer.setAttribute('aria-hidden', 'true');
      drawer.classList.remove('site-drawer--active');
      backdrop.classList.remove('site-drawer__backdrop--active');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuBtn.focus();
    };

    menuBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    // ESC 키로 드로워 닫기 (접근성)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('site-drawer--active')) {
        closeDrawer();
      }
    });
  }

  /* ─── 2. 드로워 언어 선택 드롭다운 ─── */
  function initLangSelect() {
    const langBtn = document.querySelector('.site-drawer__lang-btn');
    const langList = document.getElementById('site-drawer-lang-list');
    const langItems = document.querySelectorAll('.site-drawer__lang-item');
    const langText = document.querySelector('.site-drawer__lang-text');

    if (!(langBtn && langList && langItems.length && langText)) return;

    const closeLangList = () => {
      langBtn.setAttribute('aria-expanded', 'false');
      langList.hidden = true;
    };

    const toggleLangList = (e) => {
      e.stopPropagation();
      const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
      langBtn.setAttribute('aria-expanded', String(!isExpanded));
      langList.hidden = isExpanded;
    };

    const selectItem = (item) => {
      const txt = item.textContent;
      langText.textContent = txt;
      langBtn.setAttribute('aria-label', `언어 선택 (현재 ${txt})`);

      langItems.forEach((i) => {
        i.setAttribute('aria-selected', 'false');
        i.classList.remove('site-drawer__lang-item--selected');
      });
      item.setAttribute('aria-selected', 'true');
      item.classList.add('site-drawer__lang-item--selected');

      closeLangList();
      langBtn.focus();
    };

    langBtn.addEventListener('click', toggleLangList);

    langItems.forEach((item) => {
      item.addEventListener('click', () => selectItem(item));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectItem(item);
        }
      });
    });

    // 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
      if (!langList.hidden && !langList.contains(e.target) && e.target !== langBtn) {
        closeLangList();
      }
    });

    // ESC 키로 언어창만 닫기 (드로워 전체는 유지)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !langList.hidden) {
        closeLangList();
        langBtn.focus();
        e.stopPropagation();
      }
    });
  }

  /* ─── 3. 메인 추천 슬라이더 (Swiper) ─── */
  function initMainSlider() {
    if (typeof Swiper === 'undefined' || !document.querySelector('.main-slider')) return;

    const bgImageTarget = document.querySelector('.main-visual__food-img');

    // 활성 슬라이드의 카드 이미지를 상단 배경으로 동기화
    const syncBackgroundImage = (swiper) => {
      if (!bgImageTarget) return;
      const activeSlide = swiper.slides[swiper.activeIndex];
      const cardImg = activeSlide && activeSlide.querySelector('.main-slider__card-img');
      if (cardImg) {
        bgImageTarget.style.backgroundImage = window.getComputedStyle(cardImg).backgroundImage;
      }
    };

    new Swiper('.main-slider', {
      spaceBetween: 20,
      slidesPerView: 1.5,
      centeredSlides: true,
      loop: true,
      loopedSlides: 3,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.main-slider__nav--next',
        prevEl: '.main-slider__nav--prev',
      },
      on: {
        init: function () { syncBackgroundImage(this); },
        slideChange: function () { syncBackgroundImage(this); },
      },
    });
  }

  /* ─── 4. SVG 제주 지도 지역 선택 인터랙션 ─── */
  function initMapInteraction() {
    const svg = document.querySelector('.main-map-placeholder svg');
    if (!svg) return;

    // 정적 <a class="map-region-link"> 마크업(HTML에 지역별로 작성)에 클릭 인터랙션만 연결
    const links = svg.querySelectorAll('.map-region-link');
    if (!links.length) return;

    // 같은 지역명(data-region)에 속한 모든 조각을 함께 선택 (추자도 등 여러 섬 조각 = 한 지역)
    const selectRegion = (regionName) => {
      if (!regionName) return;
      svg.querySelectorAll('.map-region-path').forEach((p) => p.classList.remove('map-region-path--selected'));
      links.forEach((a) => a.setAttribute('aria-pressed', 'false'));

      const cssName = (window.CSS && CSS.escape) ? CSS.escape(regionName) : regionName;
      svg.querySelectorAll(`.map-region-link[data-region="${cssName}"]`).forEach((a) => {
        a.setAttribute('aria-pressed', 'true');
        a.querySelectorAll('.map-region-path').forEach((p) => p.classList.add('map-region-path--selected'));
      });

      const badge = document.querySelector('.main-map-placeholder__active-region');
      if (badge) badge.textContent = `현재 선택: ${regionName}`;
    };

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        selectRegion(link.getAttribute('data-region'));
      });

      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    });
  }

  /* ─── 5. 지도 접기/펴기 토글 ─── */
  function initMapToggle() {
    const mapBtn = document.querySelector('.map-btn');
    const mainVisualContent = document.querySelector('.main-visual__content');
    if (!(mapBtn && mainVisualContent)) return;

    mapBtn.setAttribute('aria-expanded', 'true');
    mapBtn.setAttribute('aria-label', '지도 접기');

    mapBtn.addEventListener('click', () => {
      const isCollapsed = mainVisualContent.classList.toggle('main-visual__content--collapsed');
      mapBtn.classList.toggle('map-btn--selected', isCollapsed);
      mapBtn.setAttribute('aria-expanded', String(!isCollapsed));
      mapBtn.setAttribute('aria-label', isCollapsed ? '지도 펼치기' : '지도 접기');
    });
  }

  /* ─── 6. 추천 결과 보기 방식(리스트/썸네일) 토글 ─── */
  function initViewToggle() {
    const toggleBtns = document.querySelectorAll('.recommend-result__view-toggles .recommend-result__toggle-btn');
    const listView = document.querySelector('.recommend-result__list');
    const thumView = document.querySelector('.recommend-result__thum');
    if (toggleBtns.length < 2 || !listView || !thumView) return;

    const [listBtn, thumBtn] = toggleBtns;

    // 버튼 활성 상태 + 뷰 노출을 한 번에 설정
    const showView = (showList) => {
      setPressed(listBtn, showList);
      setPressed(thumBtn, !showList);
      listView.style.display = showList ? 'flex' : 'none';
      thumView.style.display = showList ? 'none' : 'flex';
    };

    function setPressed(btn, active) {
      btn.classList.toggle('recommend-result__toggle-btn--active', active);
      btn.setAttribute('aria-pressed', String(active));
    }

    // 초기: 리스트 노출
    showView(true);

    listBtn.addEventListener('click', () => showView(true));
    thumBtn.addEventListener('click', () => showView(false));
  }

  /* ─── 초기화 ─── */
  onReady(() => {
    initDrawer();
    initLangSelect();
    initMainSlider();
    initMapInteraction();
    initMapToggle();
    initViewToggle();
  });
})();
