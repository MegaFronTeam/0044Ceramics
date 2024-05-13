"use strict";

import Swiper from '../libs/swiper/swiper-bundle.min.mjs';
import JSCCommon from "./JSCCommon.js";

const $ = jQuery;

function eventHandler() {
	JSCCommon.init();

	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener(
		"scroll",
		() => {
			JSCCommon.setFixedNav();
		},
		{passive: true}
	);
	window.addEventListener("resize", whenResize, {passive: true});

	whenResize();

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: " .swiper-pagination",
			type: "bullets",
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	};

	new Swiper(".breadcrumb-slider--js", {
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
	});

	const swiper4 = new Swiper(".sBanners__slider--js", {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: "auto",
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	});

	const swiperBricklayers = new Swiper(".sContent__slider--js", {
		...defaultSl,
		slidesPerView: 1,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		// freeModeMomentum: true,
	});
  const swiperTabs = new Swiper('.tabs-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true,
		spaceBetween: 24,
	});

  const swiperFilters = new Swiper('.filters-slider--js', {
		spaceBetween: 8,
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true,
    breakpoints: {
      768: {
        spaceBetween: 0,
      }
    }
	});

  /* nav location mobile */
  const location = document.querySelector('.icon-wrap--mobile')
	const mobileNavLocation = document.querySelector('.mobile-location')
	const navLinks = document.querySelectorAll('.mobile-location a')
	const backDrop = document.querySelector('.backdrop')

  let startY;
  let currentY;

  backDrop.addEventListener('click', () => {
    document.querySelectorAll('.white-bg-modal').forEach((modal) => {
      modal.classList.remove('show')
    })
  })

  document.querySelectorAll('.white-bg-modal').forEach((modal) => {
    modal.addEventListener('touchstart', touchStart);
    modal.addEventListener('touchmove', touchMove);
  })

	function openNavWidow() {
		mobileNavLocation.classList.add('show');
		backDrop.classList.add('show');
	}

	function closeNavWidow() {
		mobileNavLocation.classList.remove('show');
		backDrop.classList.remove('show');
	}

	location.addEventListener('click', openNavWidow);
	backDrop.addEventListener('click', closeNavWidow);
	mobileNavLocation.addEventListener('click', closeNavWidow);
  navLinks.forEach((link) => {
    link.addEventListener('click', closeNavWidow)
  })

  /* search */
  const topNav = document.querySelector('.top-nav__row')
  const phone = document.querySelector('.top-nav__tel')
  const searchBtn = document.querySelector('.icon-wrap .icon-search')
	const navSearch = document.querySelector('.container-search')
  const iconsDesktop = document.querySelectorAll('.top-nav__row .icon-wrap, .top-nav__row .icon')

	function openSearchWidow() {
		navSearch.classList.add('show');

    if (window.innerWidth > 768) {
      iconsDesktop.forEach(icon => {
          icon.classList.add('hidden');
      });
      phone.classList.add('hidden');
    } else {
      topNav.classList.add('d-none');
    }
		backDrop.classList.add('show');
	}

	function closeSearchWidow() {
		navSearch.classList.remove('show');
		topNav.classList.remove('d-none');
    if (window.innerWidth > 768) {
      iconsDesktop.forEach(icon => {
          icon.classList.remove('hidden');
      });
    }
    phone.classList.remove('hidden');
		backDrop.classList.remove('show');
	}

	searchBtn.addEventListener('click', openSearchWidow);
	backDrop.addEventListener('click', closeSearchWidow);

  /* brands mobile */
	const openBrandsBtn = document.querySelectorAll('.open-modal--brands')
	const brands = document.querySelector('#brands')
  const applyBtns = document.querySelectorAll('.btn-apply--js')

	function openBrandsWidow() {
		brands.classList.add('show');
		backDrop.classList.add('show');
	}

  function touchStart(e) {
    startY = e.touches[0].clientY;
    currentY = startY;
  }

  function touchMove(e) {
    currentY = e.touches[0].clientY;
    const distance = currentY - startY;

    if (distance > 10) {
      backDrop.classList.remove('show')
      document.querySelectorAll('.white-bg-modal').forEach((modal) => {
        modal.classList.remove('show')
      })
    }
  }

  openBrandsBtn.forEach((btn) => {
    btn.addEventListener('click', openBrandsWidow);
  })

  applyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('.white-bg-modal').classList.remove('show')
      backDrop.classList.remove('show');
    })
  })


  /* photo filters mobile */
	const openFiltersBtn = document.querySelector('.open-modal--filters--js')
	const filters = document.querySelector('#photo-filters')

	function openFiltersWidow() {
    filters.classList.add('show');
		backDrop.classList.add('show');
	}

  if (openFiltersBtn && filters) {
    openFiltersBtn.addEventListener('click', openFiltersWidow);
  }

  /* video filter mobile */
	const openVideoFilterBtn = document.querySelectorAll('.open-modal--video')
	const videoFilter = document.querySelector('#video-filters')

	function openVideoFiltersWidow() {
		videoFilter.classList.add('show');
		backDrop.classList.add('show');
	}

  if (openVideoFilterBtn && videoFilter) {
    openVideoFilterBtn.forEach((btn) => {
      btn.addEventListener('click', openVideoFiltersWidow);
    })
  }


  const popoverTriggerList = document.querySelectorAll(
		'[data-bs-toggle="popover"]'
	);
	const popoverList = [...popoverTriggerList].map(
		popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl)
	);

  const closeButton = document.querySelector('.btn-close');
  const warningText = document.querySelector('.warning-text');

  if (closeButton) {
    closeButton.addEventListener('click', function() {
      warningText.classList.add('d-none');
    });
  }
  /* catalog */

  const btnOpenModal = document.querySelector('.open-modal-catalog--js')
  if (btnOpenModal) {
    btnOpenModal.addEventListener('click', () => {
      document.querySelector('.modal-catalog--js').classList.add('show')
      backDrop.classList.add('show');
    })
  }


  $('#photo-filters .filter').on('click', function() {
    var title = $(this).find('.filter__title').text();
    setTimeout(function() {
      $('#photo-filters .filters-wrapper__title').text(title);
    }, 200);
  });

  $('.btn-back').on('click', function() {
    $('#photo-filters .filters-wrapper__title').text('Фильтры');
    $('#photo-filters .filter').removeClass('show');
    $(this).addClass('d-none');
  });

  $('#photo-filters .filter__title').on('click', function() {
    if (window.innerWidth < 768) {
      $(this).parent('.filter').addClass('show');
      setTimeout(function() {
        $('.btn-back').removeClass('d-none');
      }, 200);
    } else {
      $(this).parent('.filter').toggleClass('show');
    }
  });

  $('#video-filters .filters-wrapper__title').on('click', function() {
    if (window.innerWidth < 768) {
      $(this).addClass('show');
    } else {
      $(this).toggleClass('show');
    }
  });

  var sectionTitle = document.querySelector(".headerBlock .section-title");
  if (sectionTitle) {
    sectionTitle.classList.add("loaded");
  }

	$(".form-wrap__input-wrap").each(function () {
    let self = $(this);
    let floatLabel;
    // let placeholderName = $(this)[0].querySelector("select").getAttribute('data-placeholder');
    // let floatDiv = '<div class="float-select"><span class="name">' + placeholderName + '</span></div>';
    const tags = self.find("select").data("tags");
    let select = self.find("select").select2({
      dropdownParent: self,
      language: "ru",
    });

    select.one("select2:open", function (e) {
      // console.log(self.find("select")[0].dataset);

      $("input.select2-search__field").prop(
        "placeholder",
        tags === true ? "Поиск или введите свой вариант ответа" : " Поиск"
      );
    });
    // console.log(select2);
  });

  const selectAllBtn = document.querySelector('.btn-select-all--js input');
  const removeBtn = document.querySelector('.btn-remove--js .small');

  // Функция для изменения текста кнопки удаления
  function updateRemoveButtonText() {
      if (selectAllBtn.checked) {
          removeBtn.textContent = "Удалить все";
      } else {
          removeBtn.textContent = "Удалить выбранные";
      }
  }

  if (selectAllBtn) {
    updateRemoveButtonText();
    selectAllBtn.addEventListener('change', updateRemoveButtonText);
  }

  const coordinationElements = document.querySelectorAll('.coordination');
  
  if (coordinationElements) {
    coordinationElements.forEach(function(coordinationElement) {
      const coordinates = coordinationElement.textContent.trim().split(': ')[1];

      coordinationElement.addEventListener('click', function() {
          const textarea = document.createElement('textarea');
          textarea.value = coordinates;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
      })
    });
  }

  const tabs = document.querySelectorAll('.sGallery .tabs__btn')
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const dataContent = tab.getAttribute('data-content');
      if (window.innerWidth >= 768) {
        if (dataContent === "photo") {
          filters.classList.remove('d-md-none');
          videoFilter.classList.add('d-md-none');
        }
        if (dataContent === "video") {
          filters.classList.add('d-md-none');
          videoFilter.classList.remove('d-md-none');
        }
      }
  });
  })

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('#sContentOven .parallax-container').forEach((section, i) => {
    section.bg = section.querySelector(".parallax-bg");
    section.bg.style.backgroundImage = `url("img/card-sq-${i + 1}.png")`;
    if(section.bg) {
      section.bg.style.backgroundPosition = `50% ${innerHeight / 2}px`;

      gsap.to(section.bg, {
        backgroundPosition: `50% ${-innerHeight / 2 + 10}`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: true,
        }
      });
    }

  //   else {
  //     section.bg.style.backgroundPosition = "50% 0px";

  //     gsap.to(section.bg, {
  //       backgroundPosition: `50% ${-innerHeight / 2 + 10}px`,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: section,
  //         start: "top top",
  //         scrub: true
  //       }
  //     });
  // }
  });
  // Setup
  // let scroller = document.querySelector(".scroller"),
  // scrollerGSAP = document.querySelector("body"),
  // tween;

  // let bodyScrollBar = window.Scrollbar;
  // let bodyScrollBarY = 0;
  // const bodyScrollBar = Scrollbar.init(scroller, { damping: 0.1, delegateTo: document, alwaysShowTracks: true });
  // ScrollTrigger.scrollerProxy(".scroller", {
  //   scrollTop(value) {
  //     if (arguments.length) {
  //       bodyScrollBar.scrollTop = value;
  //     }
  //     return bodyScrollBar.scrollTop;
  //   }
  // });
  
  // bodyScrollBar.addListener(ScrollTrigger.update);

  // ScrollTrigger.defaults({ scroller: scroller });

  gsap.utils.toArray('.sBlackList .parallax-container').forEach((section, i) => {
    section.bg = section.querySelector(".parallax-bg");

    if(section.bg) {
      section.bg.style.backgroundPosition = `50% ${innerHeight / 2}px`;

      gsap.to(section.bg, {
        backgroundPosition: `50% ${-innerHeight / 2 + 10}`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: true,
        }
      });
    }

  //   else {
  //     section.bg.style.backgroundPosition = "50% 0px";

  //     gsap.to(section.bg, {
  //       backgroundPosition: `50% ${-innerHeight / 2 + 10}px`,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: section,
  //         start: "top top",
  //         scrub: true
  //       }
  //     });
  // }
  });

  gsap.to('.container-wrapper', {
    opacity: 1,
    x: '-50%',
    duration: 1,
    scrollTrigger: {
      trigger: '.parallax-container',
      start: 'bottom bottom',
      toggleActions: 'play none none reverse',
    }
  });
  // let headerHeight = 100
  // let elem = document.querySelector('.container-wrapper')
  // const trigger = document.querySelector('.parallax-container')

  // gsap.to(trigger, {
  //   scrollTrigger: {
  //     trigger: trigger,
  //     start: "top top", // when the top of the trigger hits the center of the viewport
  //     end: "bottom top", // when the bottom of the trigger hits the center of the viewport
  //     onEnter: () => elem.classList.add("active"), // add class
  //     onLeaveBack: () => elem.classList.remove("active"), // remove class
  //   },
  // });

  
  gsap.utils.toArray('#sContentOven .parallax-container').forEach((container) => {
    const textCenters = container.querySelectorAll('.text-center');
    
    textCenters.forEach((textCenter) => {
      gsap.to(textCenter, {
        opacity: 1,
        x: '-50%',
        duration: 1,
        easy: 'easy-in',
        scrollTrigger: {
          trigger: container,
          start: 'bottom bottom',
          toggleActions: 'play none none reverse',
        }
      });
    });
  });
}
if (document.readyState !== "loading") {
	eventHandler();
} else {
	document.addEventListener("DOMContentLoaded", eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
