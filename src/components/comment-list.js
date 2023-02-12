import { getCommentList } from "../api/get-comment-list";
import { isBride } from "../util";
import { BRIDE, GROOM, handleGetComment, renderAddComment } from "./comment";
import { hiddenModal, isLoadingModal, showModal } from "./modal";
import { showToast } from "./toast";

const $guestCommentList = document.querySelector(".guest-comment-list");

export async function initCommentList() {
  $guestCommentList.addEventListener("click", async function (event) {
    handleGetComment(event.target.closest("li").dataset.id);
  });
  renderCommentList();
}

export async function renderCommentList() {
  const data = await getCommentList();
  renderList(data);
}

function renderList(commentList) {
  commentList.forEach(({ id, name, date, target, comment }) => {
    const $li = document.createElement("li");
    $li.dataset.id = id;
    const $article = document.createElement("article");
    $article.className = "guest-comment";

    const $firstSection = createGuestCommentRow();
    const $guestCommentBody = document.createElement("div");
    $guestCommentBody.className = "guest-comment-body";
    const $commentName = document.createElement("p");
    $commentName.className = "comment-name";
    $commentName.textContent = name;
    $guestCommentBody.appendChild($commentName);
    const $commentBody = document.createElement("p");
    $commentBody.className = "comment-body";
    $commentBody.textContent = comment;
    $guestCommentBody.appendChild($commentBody);

    const $guestCommentTarget = document.createElement("div");
    const $targetThumbnail = document.createElement("img");
    $targetThumbnail.className = "target-thumbnail";
    $targetThumbnail.src = isBride(target) ? BRIDE.thumbnail : GROOM.thumbnail;
    $guestCommentTarget.appendChild($targetThumbnail);

    $firstSection.appendChild($guestCommentBody);
    $firstSection.appendChild($guestCommentTarget);

    const $secondSection = createGuestCommentRow();
    $secondSection.classList.add("date");
    $secondSection.textContent = date;

    $article.appendChild($firstSection);
    $article.appendChild($secondSection);
    $li.appendChild($article);
    $guestCommentList.appendChild($li);
  });
}

function createGuestCommentRow() {
  const $section = document.createElement("section");
  $section.className = "guest-comment-row";
  return $section;
}
