const $toast = document.querySelector("#toast");
const $toastMessage = document.querySelector("#toast-message");
let timer;
const SHOW_CLASS_NAME = "toast-show";
const HIDDEN_CLASS_NAME = "toast-hidden";

export function initToast() {
  addEventListener();
}

function addEventListener() {
  $toast.addEventListener("click", function () {
    $toast.className = $toast.className.replace(
      SHOW_CLASS_NAME,
      HIDDEN_CLASS_NAME
    );
    if (timer) clearTimeout(timer);
  });
}

export function showToast(textContent) {
  const shouldShow = $toast.className.includes(HIDDEN_CLASS_NAME);

  if (!shouldShow) return;

  $toastMessage.textContent = textContent;
  $toast.className = $toast.className.replace(
    HIDDEN_CLASS_NAME,
    SHOW_CLASS_NAME
  );

  timer = setTimeout(function () {
    $toast.className = $toast.className.replace(
      SHOW_CLASS_NAME,
      HIDDEN_CLASS_NAME
    );
  }, 3000);
}
