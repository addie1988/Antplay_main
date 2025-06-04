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
  navMenu.classList.toggle('show');Popular_Games_1
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
  img.src = `./images/dynamic_img/${imageIds[i]}.jpg`; // 使用本地圖片
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
    langCode === 'zh-CN' ? '2' :
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
    currentLang === 'zh-CN' ? '2' :
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
const counters = document.querySelectorAll('.eciprocal h1');

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
const imagePaths = [
  './images/popular_1.webp',
  './images/popular_2.webp',
  './images/popular_3.webp',
  './images/popular_4.webp',
  './images/popular_5.webp',
  './images/popular_6.webp',
  './images/popular_7.webp',
  './images/popular_8.webp',
];

const carouselStage = document.getElementById("carouselStage_mk1");
const carouselRoot = document.getElementById("carouselRoot_rz0");

const slideCount = imagePaths.length;
const angleBetweenSlides = 360 / slideCount;
const slideWidth = 200;
const radius = (slideWidth / 2) / Math.tan(Math.PI / slideCount);

let currentRotationIndex = 0;
let autoRotateTimer = null;
let isPlaying = false;  // 添加播放状态变量

function createSlides() {
  carouselStage.innerHTML = '';
  imagePaths.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide-op8';
    slide.innerHTML = `<img src="${src}" alt="slide-${i}">`;
    const angle = i * angleBetweenSlides;
    slide.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    carouselStage.appendChild(slide);
  });
}

function rotateCarousel() {
  const rotateDeg = currentRotationIndex * angleBetweenSlides;
  carouselStage.style.transition = 'transform 0.5s ease';
  carouselStage.style.transform = `rotateY(${rotateDeg}deg)`;
}

function startAutoRotate() {
  clearInterval(autoRotateTimer);
  autoRotateTimer = setInterval(() => {
    currentRotationIndex++;
    rotateCarousel();
  }, 3000);
}

// 初始化
createSlides();
rotateCarousel();
startAutoRotate();


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

// data_advantage
const listItems = document.querySelectorAll('#data_advantage_ul li');
let currentState = false; // false = 飛出狀態, true = 飛入狀態

window.addEventListener('scroll', () => {
  if (window.scrollY >= 600 && !currentState) {
    currentState = true;
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate');
      }, index * 200);
    });
  }

  if (window.scrollY < 600 && currentState) {
    currentState = false;
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.remove('animate');
      }, index * 200);
    });
  }
});