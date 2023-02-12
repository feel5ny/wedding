import { showToast } from "./toast";
import copy from "copy-to-clipboard";
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
        await navigator.clipboard.writeText("권순오 신한은행 110-261-023544");
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
        if (copyText(text)) return showToast("복사가 완료되었습니다.");
        return showToast("복사가 실패하였습니다.");
      } catch (err) {
        showToast("복사가 실패하였습니다.");
      }
    }
  });
}

async function copyText(text) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  if (copy(text)) return true;
  return false;
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
