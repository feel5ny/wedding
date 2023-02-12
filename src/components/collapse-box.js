import { showToast } from "./toast";

const $collapseBoxTitle = document.querySelectorAll(".collapse-box-title");
const $collapseBoxBody = document.querySelectorAll(".collapse-box-body");
const $copyNY = document.querySelector(".nayoung-bank");
const $copySH = document.querySelector(".soono-bank");

export function initCollapseBox() {
  addEventListener();
  renderList();
}

function addEventListener() {
  const titles = [...$collapseBoxTitle];
  const bodys = [...$collapseBoxBody];
  titles.forEach((title, index) => {
    title.addEventListener("click", function (event) {
      const isFold = [...event.target.classList].includes("fold");
      if (isFold) return toUnFold([title, bodys[index]]);
      toFold([title, bodys[index]]);
    });
  });

  $copySH.addEventListener("click", async function (event) {
    const isCopyButton = event.target.className.includes("button-type-02");
    if (isCopyButton) {
      try {
        await navigator.clipboard.writeText("권순오 국민은행 392802-04-034900");
        showToast("복사가 완료되었습니다.");
      } catch (err) {
        showToast("복사가 실패하였습니다.");
      }
    }
  });

  $copyNY.addEventListener("click", async function (event) {
    const isCopyButton = event.target.className.includes("button-type-02");
    if (isCopyButton) {
      try {
        await navigator.clipboard.writeText("김나영 국민은행 392802-04-034900");
        showToast("복사가 완료되었습니다.");
      } catch (err) {
        showToast("복사가 실패하였습니다.");
      }
    }
  });
}

function renderList() {}

function toFold(nodes) {
  nodes.forEach((node) => {
    node.className = node.className.replace("unfold", "fold");
  });
}

function toUnFold(nodes) {
  nodes.forEach((node) => {
    node.className = node.className.replace("fold", "unfold");
  });
}
