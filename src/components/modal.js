import {
  addLocationHash,
  handleOverflowHidden,
  removeLocationHash,
  toHidden,
  toSlideIn,
  toModalOut,
  toShow,
  toModalIn,
} from "../util";

const $modal = document.querySelector("#modal");
const $modalDim = document.querySelector(".modal-dim");
const $modalBody = document.querySelector(".modal-body");
const $modalContents = document.querySelector(".modal-contents");
const $modalLoading = document.querySelector(".modal-loading");
const LOCATION_KEY = "modal";

export function initModal() {
  $modalDim.addEventListener("click", function () {
    hiddenModal();
  });
}

export function isLoadingModal(isLoading) {
  if (isLoading) {
    toShow($modalLoading);
  } else {
    toHidden($modalLoading);
  }
}

export function showModal() {
  // toModalIn($modalBody, $modal);
  // isLoadingModal(false);
  // initModalContents();
  // addLocationHash(LOCATION_KEY);
  // handleOverflowHidden();
}

export function hiddenModal() {
  toModalOut($modalBody, $modal);
  isLoadingModal(false);
  initModalContents();

  removeLocationHash();
  handleOverflowHidden();
}

export function initModalContents() {
  $modalContents.textContent = "";
}
