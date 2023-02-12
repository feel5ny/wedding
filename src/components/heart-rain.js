const $wrapper = document.querySelector("#wrapper");

export function initHeartRain() {
  setInterval(createHeart, 1000);
}

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";

  heart.innerText = "❤️";

  $wrapper?.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}
