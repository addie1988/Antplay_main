// header_top
const header = document.getElementById('header');
const spacer = document.getElementById('spacer');

window.addEventListener('scroll', () => {
  if (window.scrollY > 90) {
    header.classList.add('fixed');
    spacer.classList.add('active'); // 防止內容跳動
  } else {
    header.classList.remove('fixed');
    spacer.classList.remove('active');
  }
});

// ----------------------------------------------------------------------------------------

// menu 漢堡選單
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Close hamburger menu when clicking outside
window.addEventListener('click', (event) => {
  if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
    navMenu.classList.remove('show');
  }
});

// ----------------------------------------------------------------------------------------

// 錨點 scroll
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', (e) => {
    // 可自訂：GA 追蹤、動畫、console log 等
    console.log(`前往 ${link.getAttribute('href')}`);
  });
});

// ----------------------------------------------------------------------------------------

// 動態效果
const container = document.getElementById('carousel');
const totalImages = 36; // 更新為 36 張圖片
const boxHeight = 10;
const maxOffset = 20; // 最大偏移距離

// 固定圖片 ID 陣列，使用不同的圖片，現在有 36 張圖片
const imageIds = [
  1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039,
  1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055
];

// 建立圖片與初始狀態
const imageData = [];

for (let i = 0; i < totalImages; i++) {
  const imgBox = document.createElement('div');
  imgBox.className = 'image_container_box';

  const img = document.createElement('img');
  img.src = `./images/dynamic_img/${imageIds[i]}.png`; // 使用本地圖片
  img.alt = `img${i + 1}`;

  imgBox.appendChild(img);
  container.appendChild(imgBox);

  imageData.push({
    el: img,
    offset: 0,
    direction: (i % 2 === 0) ? 1 : -1 // 偶數往下、奇數往上
  });
}

// 動畫主迴圈
function imageAnimate() {
  imageData.forEach(data => {
    data.offset += data.direction * 0.5; // 移動速度

    // 到達上下邊界就反轉方向
    if (data.offset > maxOffset) {
      data.offset = maxOffset;
      data.direction = -1;
    } else if (data.offset < -maxOffset) {
      data.offset = -maxOffset;
      data.direction = 1;
    }

    data.el.style.transform = `translateY(${data.offset}px)`;
  });

  requestAnimationFrame(imageAnimate);
}

imageAnimate(); // 啟動動畫

// ----------------------------------------------------------------------------------------

// language 語系
function toggleDropdown(event) {
  event.preventDefault();
  const menu = document.getElementById("dropdownMenu");
  menu.classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.closest('.dropdown-toggle')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }
  }
}

function changeLanguage(langCode) {
  // 關閉下拉選單
  document.getElementById('dropdownMenu').classList.remove('show');

  // 更新頂部圖示
  const topIcon = document.querySelector('.dropdown-toggle img');
  const newIconSrc = `./images/icon_${langCode === 'en' ? '1' :
    langCode === 'zh-TW' ? '2' :
      langCode === 'ja' ? '3' :
        langCode === 'pt' ? '4' : '1'
    }.svg`;

  if (topIcon) {
    topIcon.src = newIconSrc;
    topIcon.alt = `icon_${langCode}`;
  }

  // 設置 cookie
  document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.host}`;
  document.cookie = `googtrans=/en/${langCode}; path=/`;

  // 重新加載翻譯
  location.reload();
}

// 檢查當前語言並設置對應圖示
function setLanguageIcon() {
  const topIcon = document.querySelector('.dropdown-toggle img');
  if (!topIcon) return;

  // 從 cookie 獲取當前語言
  const cookie = document.cookie.split(';').find(c => c.trim().startsWith('googtrans='));
  let currentLang = 'en'; // 默認英文

  if (cookie) {
    const langCode = cookie.split('/')[2];
    currentLang = langCode;
  }

  // 設置對應圖示
  const newIconSrc = `./images/icon_${currentLang === 'en' ? '1' :
    currentLang === 'zh-TW' ? '2' :
      currentLang === 'ja' ? '3' :
        currentLang === 'pt' ? '4' : '1'
    }.svg`;

  topIcon.src = newIconSrc;
  topIcon.alt = `icon_${currentLang}`;
}

// 頁面加載時執行
window.addEventListener('load', setLanguageIcon);


// Close dropdown menus when clicking outside
document.addEventListener('click', (event) => {
  // Close language dropdown
  const dropdownMenu = document.getElementById('dropdownMenu');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  if (dropdownMenu && !dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.classList.remove('show');
  }

  // Close hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu && !hamburger.contains(event.target) && !navMenu.contains(event.target)) {
    navMenu.classList.remove('show');
  }
});


// ----------------------------------------------------------------------------------------

// 數據報告 倒數
const counters = document.querySelectorAll('.data_report_ul_content h1');

function startCountAnimation() {
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // Animation duration in milliseconds
    const steps = 50; // Number of steps in the animation
    const stepValue = target / steps;
    let current = 0;

    const updateCounter = () => {
      current += stepValue;
      if (current < target) {
        counter.textContent = Math.round(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

let isInView = false;

// Scroll event listener to trigger animation when scrolling past 600px
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition >= 300) {
    if (!isInView) {
      isInView = true;
      startCountAnimation();
    }
  } else {
    if (isInView) {
      isInView = false;
      // Reset the counter text to 0 when scrolling back up
      counters.forEach(counter => {
        counter.textContent = '0';
      });
    }
  }
});

// ----------------------------------------------------------------------------------------

// 熱門推播
const imagesList_tq3 = [
  '../images/Popular_Games_1.png',
  '../images/Popular_Games_2.png',
  '../images/Popular_Games_3.png',
  '../images/Popular_Games_4.png',
  '../images/Popular_Games_5.png',
  '../images/Popular_Games_6.jpg',
  '../images/Popular_Games_7.png',
  '../images/Popular_Games_8.png',
];

const stageNode_mk1 = document.getElementById("carouselStage_mk1");
const totalItems_nx7 = imagesList_tq3.length;
let currentIndex_lp5 = 0;
let autoRotate_qe6 = null;

function create3DSlides() {
  const anglePerSlide_ef2 = 360 / totalItems_nx7;
  const radius_pz9 = (stageNode_mk1.offsetWidth / 2) / Math.tan(Math.PI / totalItems_nx7);

  imagesList_tq3.forEach((src, i) => {
    const slideNode_ko4 = document.createElement('div');
    slideNode_ko4.className = 'carousel-slide-op8';
    slideNode_ko4.innerHTML = `<img src="${src}" alt="image-${i}">`;

    const angleDeg = i * anglePerSlide_ef2;
    slideNode_ko4.style.transform = `rotateY(${angleDeg}deg) translateZ(${radius_pz9}px)`;

    // 點擊圖片 → 如果未播放，啟動自動輪播
    slideNode_ko4.addEventListener('click', () => {
      if (!autoRotate_qe6) {
        startAuto3DRotate();
      }
    });

    stageNode_mk1.appendChild(slideNode_ko4);
  });
}

function rotate3DCarousel() {
  const rotationDeg = currentIndex_lp5 * -360 / totalItems_nx7;
  stageNode_mk1.style.transform = `rotateY(${rotationDeg}deg)`;
}

function startAuto3DRotate() {
  clearInterval(autoRotate_qe6);
  autoRotate_qe6 = setInterval(() => {
    currentIndex_lp5 = (currentIndex_lp5 + 1) % totalItems_nx7;
    rotate3DCarousel();
  }, 3000);
}

// 初始化
create3DSlides();
rotate3DCarousel();
startAuto3DRotate(); // ✅ 頁面載入立即播放

// 拖曳功能（滑鼠拖動會暫停輪播）
let dragStartX_bg8 = 0;
let draggingActive_bu9 = false;

const rootShell_rz0 = document.getElementById("carouselRoot_rz0");

rootShell_rz0.addEventListener('mousedown', (e) => {
  draggingActive_bu9 = true;
  dragStartX_bg8 = e.clientX;
  clearInterval(autoRotate_qe6); // 暫停輪播
  autoRotate_qe6 = null;
});

rootShell_rz0.addEventListener('mousemove', (e) => {
  if (!draggingActive_bu9) return;
  const deltaX = e.clientX - dragStartX_bg8;
  if (Math.abs(deltaX) > 50) {
    currentIndex_lp5 += deltaX > 0 ? -1 : 1;
    currentIndex_lp5 = (currentIndex_lp5 + totalItems_nx7) % totalItems_nx7;
    rotate3DCarousel();
    dragStartX_bg8 = e.clientX;
  }
});

rootShell_rz0.addEventListener('mouseup', () => {
  draggingActive_bu9 = false;
});

rootShell_rz0.addEventListener('mouseleave', () => {
  draggingActive_bu9 = false;
});

// ----------------------------------------------------------------------------------------


// report_li_4 輪播
const boxes = document.querySelectorAll('.img-box');
let currentIndex = 0;
let intervalId;

function showImage(index) {
  boxes.forEach((box, i) => {
    if (i === index) {
      box.classList.add('active');
    } else {
      box.classList.remove('active');
    }
  });
}

function startCarousel() {
  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % boxes.length;
    showImage(currentIndex);
  }, 3000);
}

function stopCarousel() {
  clearInterval(intervalId);
}

// 初始化第一張
showImage(currentIndex);
startCarousel();

// 滑鼠移入暫停輪播
boxes.forEach((box, index) => {
  box.addEventListener('mouseenter', () => {
    stopCarousel();
    currentIndex = index;
    showImage(currentIndex);
  });

  box.addEventListener('mouseleave', () => {
    startCarousel();
  });

  // 如需支援點擊切換，也可加入以下：
  // box.addEventListener('click', () => {
  //   stopCarousel();
  //   currentIndex = index;
  //   showImage(currentIndex);
  // });
});

// ----------------------------------------------------------------------------------------

// report_li_5 硬幣輪播
const coinImages = [
  './images/coin_1.svg',
  './images/coin_2.svg',
  './images/coin_3.svg'
];

const track = document.getElementById('carouselTrack');

// 複製三組圖片做無縫輪播 (前中後)
[...coinImages, ...coinImages, ...coinImages].forEach((src, i) => {
  const item = document.createElement('div');
  item.className = 'carousel-item';
  item.innerHTML = `<img src="${src}" alt="carousel image" />`;
  item.style.opacity = '0.3';
  item.style.flex = '0 0 33.33%';
  item.style.padding = '0';
  item.style.margin = '0';
  track.appendChild(item);
});

const items = track.children;
const total = coinImages.length;
let index = total - 1;

// 設置 track 的樣式
track.style.display = 'flex';
track.style.width = '300%';
track.style.gap = '0';
track.style.padding = '0';
track.style.margin = '0';
track.style.justifyContent = 'flex-start';
track.style.transition = 'transform 0.5s ease';

// 設置每個輪播項的樣式
Array.from(items).forEach(item => {
  item.style.margin = '0';
  item.style.padding = '0';
  item.style.width = '33.33%';
  item.style.flex = '0 0 33.33%';
  item.style.transition = 'all 0.5s ease';
});

function updateCarousel() {
  // 重置所有項目的透明度和active狀態
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('active');
    items[i].style.opacity = '0.3';
    items[i].style.transform = 'scale(0.8)';
  }

  // 設置當前項目及其相鄰項目
  const prevIndex = (index - 1 + items.length) % items.length;
  const nextIndex = (index + 1) % items.length;

  // 設置三個可見項目的狀態
  items[prevIndex].style.opacity = '0.3';
  items[prevIndex].classList.add('active');
  items[prevIndex].style.transform = 'scale(0.8)';

  items[index].style.opacity = '1';
  items[index].classList.add('active');
  items[index].style.transform = 'scale(1)';

  items[nextIndex].style.opacity = '0.3';
  items[nextIndex].classList.add('active');
  items[nextIndex].style.transform = 'scale(0.8)';

  const itemWidth = items[0].offsetWidth;
  const offset = itemWidth * (index - Math.floor(total / 2));
  track.style.transform = `translateX(${-offset}px)`;

  // 當滑到最後一組的最後一張時，瞬間跳回中間組的最後一張
  if (index >= total * 2) {
    setTimeout(() => {
      track.style.transition = 'none';
      index = total;
      const resetOffset = itemWidth * (index - Math.floor(total / 2));
      track.style.transform = `translateX(${-resetOffset}px)`;
      track.offsetHeight; // 強制重繪
      track.style.transition = 'transform 0.5s ease';
      updateCarousel();
    }, 500);
  }
  // 當滑到第一組的第一張時，瞬間跳回中間組的第一張
  else if (index < total) {
    setTimeout(() => {
      track.style.transition = 'none';
      index = total * 2 - 1;
      const resetOffset = itemWidth * (index - Math.floor(total / 2));
      track.style.transform = `translateX(${-resetOffset}px)`;
      track.offsetHeight; // 強制重繪
      track.style.transition = 'transform 0.5s ease';
      updateCarousel();
    }, 500);
  }
}

function autoSlide() {
  index++;
  updateCarousel();
}

// 初始化
track.style.transition = 'transform 0.5s ease';
updateCarousel();
setInterval(autoSlide, 2500);

window.addEventListener('resize', updateCarousel);

// ----------------------------------------------------------------------------------------

// report_li_6_title 內容輪播
const slides = document.querySelectorAll(".report_li_6_text_carousel .slide");
const controls = document.querySelector(".controls");
let current = 0;

// Create navigation dots
const dots = Array.from(slides).map((_, i) => {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => {
    current = i;
    showSlide(current);
    clearInterval(interval);
    interval = setInterval(nextSlide, 3000);
  });
  controls.appendChild(dot);
  return dot;
});

// Initialize first dot as active
dots[0].classList.add("active");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

// Start automatic slideshow
let interval = setInterval(nextSlide, 3000);

// Pause slideshow on hover
const carousel = document.querySelector(".report_li_6_text_carousel");
carousel.addEventListener("mouseenter", () => clearInterval(interval));
carousel.addEventListener("mouseleave", () => {
  interval = setInterval(nextSlide, 3000);
});

// ----------------------------------------------------------------------------------------

// report_li_7_ul 系統
const imageList = [
  './images/data_img/android.webp',
  './images/data_img/html-5.webp',
  './images/data_img/mac-os-logo.webp',
  './images/data_img/macos.webp',
  './images/data_img/windows.webp',
];

const sliderTrack = document.getElementById('sliderTrack');

// 設置 sliderTrack 的樣式
sliderTrack.style.display = 'flex';
sliderTrack.style.flexWrap = 'wrap';
sliderTrack.style.justifyContent = 'center';
sliderTrack.style.gap = '20px';
sliderTrack.style.padding = '20px';

// 創建所有圖片元素
imageList.forEach(src => {
  const slide = document.createElement('div');
  slide.className = 'slideItem';
  slide.style.width = '80px';
  slide.style.height = '80px';
  slide.style.display = 'flex';
  slide.style.alignItems = 'center';
  slide.style.justifyContent = 'center';

  const img = document.createElement('img');
  img.src = src;
  img.alt = 'system image';
  img.style.width = '80%';
  img.style.height = '80%';
  img.style.objectFit = 'contain';
  img.style.transition = 'opacity 0.3s ease';

  slide.appendChild(img);
  sliderTrack.appendChild(slide);
});

const systemSlides = sliderTrack.querySelectorAll('.slideItem');

function randomBlink() {
  // 隨機選擇1-3個圖片進行閃爍
  const blinkCount = Math.floor(Math.random() * 3) + 1;
  const selectedSlides = new Set();

  while (selectedSlides.size < blinkCount) {
    const randomIndex = Math.floor(Math.random() * systemSlides.length);
    selectedSlides.add(randomIndex);
  }

  // 重置所有圖片的透明度
  systemSlides.forEach(slide => {
    const img = slide.querySelector('img');
    img.style.opacity = '1';
  });

  // 對選中的圖片進行閃爍
  selectedSlides.forEach(index => {
    const img = systemSlides[index].querySelector('img');
    img.style.opacity = '0.3';
    setTimeout(() => {
      img.style.opacity = '1';
    }, 300);
  });
}

// 初始化時立即執行一次閃爍
randomBlink();

// 每2秒執行一次閃爍
setInterval(randomBlink, 2000);

// ----------------------------------------------------------------------------------------

// report_li_8_t 國旗輪播
const iconTrack = document.getElementById("iconTrack");
const iconItems = document.querySelectorAll(".icon-item");
const itemHeight = iconItems[0].offsetHeight;
const totalItems = iconItems.length;

let activeSlideIndex = 0;

setInterval(() => {
  activeSlideIndex++;
  if (activeSlideIndex > totalItems - 3) {
    iconTrack.style.transition = "none";
    iconTrack.style.transform = "translateY(0)";
    activeSlideIndex = 1;

    setTimeout(() => {
      iconTrack.style.transition = "transform 0.5s ease-in-out";
      iconTrack.style.transform = `translateY(-${itemHeight * activeSlideIndex}px)`;
    }, 50);
  } else {
    iconTrack.style.transform = `translateY(-${itemHeight * activeSlideIndex}px)`;
  }
}, 2000);

// ----------------------------------------------------------------------------------------

// 交錯移動
const animatedEntryBlocks = document.querySelectorAll('.module-block-animated-entry');

const visibilityTransitionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const elementIndex = [...animatedEntryBlocks].indexOf(entry.target);
    const isInLeftColumn = elementIndex % 2 === 0;

    if (entry.isIntersecting) {
      if (isInLeftColumn) {
        entry.target.classList.add('module-visible-from-top-left');
      } else {
        entry.target.classList.add('module-visible-from-bottom-right');
      }
    } else {
      entry.target.classList.remove('module-visible-from-top-left', 'module-visible-from-bottom-right');
    }
  });
}, {
  threshold: 0.2
});

animatedEntryBlocks.forEach(block => visibilityTransitionObserver.observe(block));

// ----------------------------------------------------------------------------------------


