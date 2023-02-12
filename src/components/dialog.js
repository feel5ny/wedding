import {
  addLocationHash,
  handleOverflowHidden,
  removeLocationHash,
  toHidden,
  toShow,
} from "../util";

const $dialog = document.querySelector("#dialog");
const $dialogBody = document.querySelector(".dialog-body");
const $dialogDim = document.querySelector(".dialog-dim");
const LOCATION_KEY = "dialog";

export function initDialog() {
  $dialogDim.addEventListener("click", function () {
    hiddenDialog();
  });
}

export function showDialog() {
  toShow($dialog);
  addLocationHash(LOCATION_KEY);
  handleOverflowHidden({ shouldOverflowHidden: true });
}

export function hiddenDialog(
  shouldRemoveHash = false,
  replaceHash = "modal",
  shouldOverflowHidden = true
) {
  toHidden($dialog);
  if (shouldRemoveHash) removeLocationHash();
  if (replaceHash) addLocationHash(replaceHash);
  handleOverflowHidden({ shouldOverflowHidden });
}

export function initDialogContents() {
  $dialogBody.textContent = "";
}
