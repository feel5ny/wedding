import { IMAGE_PNG_LIST } from "../controller/store";
import { addLocationHash, toShowFixed } from "../util";

const $gallerySection = document.querySelector(".gallery");
const $preview = document.querySelector("#preview");
const $previewItem = document.querySelector(".preview-item");
const $previewPage = document.querySelector(".preview-page");
const LOCATION_KEY = "preview";

export function initGallery() {
  addEventListener();
  renderGallery();
}

function addEventListener() {
  $gallerySection?.addEventListener("click", function (event) {
    const index = Number(event.target.dataset.index);
    if (isNaN(index)) return;
    toShowFixed($preview);
    $previewItem.src = IMAGE_PNG_LIST[index];
    $previewItem.dataset.index = index;
    $previewPage.textContent = `${index + 1}/${IMAGE_PNG_LIST.length}`;
    addLocationHash(LOCATION_KEY);
  });
}

function renderGallery(imageList = IMAGE_PNG_LIST) {
  const $list = document.createElement("ul");
  $list.className = "gallery-list snap-x";

  imageList.map((imageUrl, index) => {
    const $card = document.createElement("li");
    $card.className = "snap-center gallery-card c-image";
    $card.dataset.src = imageUrl;
    $card.dataset.index = index;
    $card.style.backgroundImage = `url(${imageUrl})`;
    $card.style.backgroundColor = "#FED363";
    $list.appendChild($card);
  });

  $gallerySection.appendChild($list);
}
