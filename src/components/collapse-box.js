import { showToast } from "./toast";
import copy from "copy-to-clipboard";
const $collapseBoxTitle = document.querySelectorAll(".collapse-box-title");
const $collapseBoxBody = document.querySelectorAll(".collapse-box-body");
const $copyNy = document.querySelector(".nayoung-bank");
const $copyNyParent = document.querySelector(".nayoung-parent-bank");
const $copySh = document.querySelector(".soono-bank");
const $copyShParent = document.querySelector(".soono-parent-bank");

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

  $copySh.addEventListener("click", async function (event) {
    const isCopyButton = event.target.className.includes("button-type-02");
    if (!isCopyButton) return;
    const TEXT = "권순오 신한은행 110-261-023544";
    try {
      if (copy(TEXT)) return showToast("복사가 완료되었습니다.");
      return showToast("복사가 실패하였습니다.");
    } catch (err) {
      alert(JSON.stringify(err.message));
      showToast("복사가 실패하였습니다.");
    }
  });

  $copyShParent.addEventListener("click", async function (event) {
    const isCopyButton = event.target.className.includes("button-type-02");
    if (!isCopyButton) return;
    const TEXT = "이윤서 국민은행 669102-97-102433";
    try {
      if (copy(TEXT)) return showToast("복사가 완료되었습니다.");
      return showToast("복사가 실패하였습니다.");
    } catch (err) {
      alert(JSON.stringify(err.message));
      showToast("복사가 실패하였습니다.");
    }
  });

  $copyNy.addEventListener("click", async function (event) {
    const isCopyButton = event.target.className.includes("button-type-02");
    if (!isCopyButton) return;
    const TEXT = "김나영 국민은행 392802-04-034900";
    try {
      if (copy(TEXT)) return showToast("복사가 완료되었습니다.");
      return showToast("복사가 실패하였습니다.");
    } catch (err) {
      alert(JSON.stringify(err.message));
      showToast("복사가 실패하였습니다.");
    }
  });

  $copyNyParent.addEventListener("click", async function (event) {
    const isCopyButton = event.target.className.includes("button-type-02");
    if (!isCopyButton) return;
    const TEXT = "김영란 국민은행 392801-04-027040";
    try {
      if (copy(TEXT)) return showToast("복사가 완료되었습니다.");
      return showToast("복사가 실패하였습니다.");
    } catch (err) {
      alert(JSON.stringify(err.message));
      showToast("복사가 실패하였습니다.");
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
