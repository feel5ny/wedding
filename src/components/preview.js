import { IMAGE_PNG_LIST } from "../controller/store";
import {
  handleOverflowHidden,
  removeLocationHash,
  toHiddenFixed,
} from "../util";
const $previewContainer = document.querySelector(".preview-container");

const $preview = document.querySelector("#preview");
const $previewItem = document.querySelector(".preview-item");
const $previewArrowLeft = document.querySelector(".preview-arrow-left");
const $previewArrowRight = document.querySelector(".preview-arrow-right");
const $previewPage = document.querySelector(".preview-page");
const $previewClose = document.querySelector(".preview-close");

let currentIndex = 0;
const isFirst = (index) => index === 0;
const isLast = (index) => IMAGE_PNG_LIST.length - 1 === index;

export function initPreview() {
  addEventListener();
}

function toRight() {
  const nextIndex = isLast(currentIndex)
    ? 0
    : Number($previewItem.dataset.index) + 1;
  $previewItem.src = IMAGE_PNG_LIST[nextIndex];
  $previewItem.dataset.index = nextIndex;
  currentIndex = nextIndex;
  $previewPage.textContent = `${nextIndex + 1}/${IMAGE_PNG_LIST.length}`;
}

function toLeft() {
  const nextIndex = isFirst(currentIndex)
    ? IMAGE_PNG_LIST.length - 1
    : Number($previewItem.dataset.index) - 1;

  $previewItem.src = IMAGE_PNG_LIST[nextIndex];
  $previewItem.dataset.index = nextIndex;

  currentIndex = nextIndex;
  $previewPage.textContent = `${nextIndex + 1}/${IMAGE_PNG_LIST.length}`;
}

function addEventListener() {
  $previewArrowRight.addEventListener("click", toRight);
  $previewArrowLeft.addEventListener("click", toLeft);

  $previewContainer.addEventListener("swiped-left", toRight);
  $previewContainer.addEventListener("swiped-right", toLeft);

  $previewClose.addEventListener("click", function () {
    window.history.back();
  });
}

export function hiddenPreview() {
  toHiddenFixed($preview);
  removeLocationHash();
  handleOverflowHidden({ shouldOverflowHidden: false });
  $previewItem.src = "";
}
