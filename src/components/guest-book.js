import { renderAddComment } from "./comment";
import { showModal } from "./modal";

const $groomButton = document.querySelector("button.groom");
const $brideButton = document.querySelector("button.bride");

export function initGuestBook() {
  $groomButton.addEventListener("click", function (event) {
    showModal();
    renderAddComment({
      isNew: true,
      target: "groom",
    });
  });
  $brideButton.addEventListener("click", function (event) {
    showModal();
    renderAddComment({
      isNew: true,
      target: "bride",
    });
  });
}
