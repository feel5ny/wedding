import { hiddenDialog } from "../components/dialog";
import { hiddenPreview } from "../components/preview";
import { hiddenModal } from "../components/modal";

const $modal = document.querySelector("#modal");
const $dialog = document.querySelector("#dialog");
const $preview = document.querySelector("#preview");

export function initLocationHash() {
  window.addEventListener("hashchange", function () {
    const currentHash = window.location.hash.replace("#", "");

    if (handleDialogWithModal(currentHash)) return;
    if (!currentHash && $dialog.className.includes("show")) {
      return hiddenDialog();
    }
    if (!currentHash && $modal.className.includes("show")) {
      return hiddenModal();
    }
    if (!currentHash && $preview.className.includes("show")) {
      return hiddenPreview();
    }
  });
}

function handleDialogWithModal(currentHash) {
  if (currentHash !== "dialog" && $dialog.className.includes("show")) {
    hiddenDialog();
    return true;
  }
  return false;
}
