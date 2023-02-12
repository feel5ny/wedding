import { IMAGE_HERO_URL_LIST } from "../controller/store";
import { createRandomNumber } from "../util";

const $heroSection = document.querySelector(".hero");
const $heroImageSection = document.querySelector(".hero-image");
const $heroArrow = document.querySelector(".hero-arrow");
const $introDirectCalendar = document.querySelector(".intro-direct-calendar");

export function initHero() {
  initHeroImage();
  addEventListener();
}

function initHeroImage() {
  const randomIndex = createRandomNumber(0, 2);
  $heroImageSection.dataset.index = randomIndex;
  $heroImageSection.style.backgroundImage = `url('${IMAGE_HERO_URL_LIST[randomIndex]}')`;
}

function addEventListener() {
  $heroImageSection?.addEventListener("click", handleClickHero);
  $heroArrow?.addEventListener("click", function () {
    window.scrollTo({
      top: $heroSection.clientHeight,
      left: 100,
      behavior: "smooth",
    });
  });
  $introDirectCalendar.addEventListener("click", function () {
    window.location.href =
      "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20230430T123000/20230430T133000&text=%EB%82%98%EC%98%81-%EC%88%9C%EC%98%A4+%EA%B2%B0%ED%98%BC%EC%8B%9D+%F0%9F%92%8D&location=%EC%B2%9C%EC%A3%BC%EA%B5%90%EC%84%B1%ED%94%84%EB%9E%80%EC%B9%98%EC%8A%A4%EC%BD%94%ED%9A%8C%EC%88%98%EB%8F%84%EC%9B%90%EA%B5%90%EC%9C%A1%ED%9A%8C%EA%B4%80&details=www.naver.com";
  });
}

function handleClickHero() {
  IMAGE_HERO_URL_LIST.every((imageName, index) => {
    const isLast = IMAGE_HERO_URL_LIST.length - 1 === index;
    const nextIndex = isLast ? 0 : index + 1;
    if ($heroImageSection.dataset.index === index.toString()) {
      $heroImageSection.dataset.index = nextIndex;
      $heroImageSection.style.backgroundImage = `url('${IMAGE_HERO_URL_LIST[nextIndex]}')`;
      return false;
    }
    return true;
  });
}
