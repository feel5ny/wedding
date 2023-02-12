import { getComment } from "../api/get-comment";
import { createComment } from "../api/create-comment";
import { updateComment } from "../api/update-comment";
import { isBride, toHidden } from "../util";
import { renderCommentList } from "./comment-list";
import {
  hiddenModal,
  initModalContents,
  isLoadingModal,
  showModal,
} from "./modal";
import { showToast } from "./toast";
import { hiddenDialog, showDialog } from "./dialog";

const $modalContents = document.querySelector(".modal-contents");
const $inputPassword = document.querySelector(".input-password");

export const BRIDE = {
  thumbnail:
    "https://firebasestorage.googleapis.com/v0/b/wedding-29932.appspot.com/o/button-bride.png?alt=media&token=a8f15bb2-e710-432d-a2ac-f25dbf5dc6b4",
  shortName: "나영",
};
export const GROOM = {
  thumbnail:
    "https://firebasestorage.googleapis.com/v0/b/wedding-29932.appspot.com/o/button-groom.png?alt=media&token=16f842af-a49d-4e88-afc8-e8dea66f90d6",
  shortName: "순오",
};
const MAX_LENGTH = 100;

/**
 *
 * @param {{ isNew: boolean,target: 'bride' | 'groom'; name: string; comment: string }} data
 */
export function renderAddComment(data) {
  initModalContents();
  $modalContents.appendChild(firstRow(data));
  $modalContents.appendChild(secondRow(data));
  $modalContents.appendChild(thirdRow(data));
  addEventListener();
}

function firstRow(data) {
  const isBrideTarget = isBride(data?.target);

  const $wrapper = createCommentEditRow();
  const $userInfo = document.createElement("div");
  $userInfo.className = "user-info";
  const $targetThumbnail = document.createElement("img");
  $targetThumbnail.className = "target-thumbnail";
  $targetThumbnail.src = isBrideTarget ? BRIDE.thumbnail : GROOM.thumbnail;
  $userInfo.appendChild($targetThumbnail);

  const $targetName = document.createElement("span");
  $targetName.textContent = `to ${
    isBrideTarget ? BRIDE.shortName : GROOM.shortName
  }`;
  $userInfo.appendChild($targetName);

  const $inputName = document.createElement("input");
  $inputName.className = "c-input input-name";
  $inputName.placeholder = "이름을 입력해주세요";

  if (!data.isNew) {
    $inputName.disabled = true;
    $inputName.value = data.name;
  }

  $wrapper.appendChild($userInfo);
  $wrapper.appendChild($inputName);
  return $wrapper;
}

function secondRow({ isNew, comment }) {
  const $wrapper = createCommentEditRow("col");
  const $textArea = document.createElement("textarea");
  const $validateMessage = document.createElement("p");
  $validateMessage.className = "validate-message";

  $textArea.className = "c-input comment-textarea";
  $textArea.placeholder = "내용을 입력해주세요";
  $textArea.rows = "5";
  $textArea.maxLength = MAX_LENGTH;
  if (comment) $textArea.value = comment;
  if (!isNew) {
    $textArea.disabled = true;
  }
  $wrapper.appendChild($textArea);
  $wrapper.appendChild($validateMessage);
  return $wrapper;
}

function thirdRow({ isNew, comment }) {
  const $wrapper = createCommentEditRow();
  const $checkWorld = document.createElement("div");
  $checkWorld.className = "check-world";

  const $worldCount = document.createElement("span");
  $worldCount.className = "world-count";

  $checkWorld.appendChild($worldCount);
  $wrapper.appendChild($checkWorld);

  if (isNew) {
    $worldCount.textContent = `0/${MAX_LENGTH}`;
    const $submitButton = document.createElement("button");
    $submitButton.className = "button-type-02 submit-comment";

    $submitButton.textContent = "제출하기";
    $submitButton.disabled = true;
    $wrapper.appendChild($submitButton);
  } else {
    $worldCount.textContent = `${comment.length}/${MAX_LENGTH}`;
    const $buttonWrapper = document.createElement("div");
    const $editButton = document.createElement("button");
    $editButton.className = "button-type-02 edit-comment";
    $editButton.textContent = "수정하기";

    const $deleteButton = document.createElement("button");
    $deleteButton.className = "normal-button delete-comment";
    $deleteButton.textContent = "삭제하기";
    // const $inputPassword = document.createElement("input");
    // $inputPassword.className = "c-input input-password";
    // $inputPassword.placeholder = "비밀번호 입력해주세요";
    // $inputPassword.type = "password";
    // $inputWrapper.appendChild($inputPassword);

    $buttonWrapper.appendChild($deleteButton);
    $buttonWrapper.appendChild($editButton);
    $wrapper.appendChild($buttonWrapper);
  }

  return $wrapper;
}

function addEventListener() {
  const $worldCount = document.querySelector(".world-count");
  const $validateMessage = document.querySelector(".validate-message");

  const $inputName = document.querySelector(".input-name");
  const $textArea = document.querySelector(".comment-textarea");
  const $createComment = document.querySelector(".submit-comment");
  const $editComment = document.querySelector(".edit-comment");
  const $deleteComment = document.querySelector(".delete-comment");
  const $submitButton = document.querySelector(".submit-comment");
  const $checkPasswordButton = document.querySelector(".check-password-button");

  $inputName.focus();
  $textArea.addEventListener("input", function ({ target }) {
    const currentLength = target.value.length;
    if (currentLength > 0 && $inputName.value.length > 0) {
      $submitButton.disabled = false;
    } else {
      $submitButton.disabled = true;
    }
    if (currentLength > MAX_LENGTH) return;
    $worldCount.textContent = `${currentLength}/${MAX_LENGTH}`;
  });

  $inputName.addEventListener("input", function ({ target }) {
    const currentLength = target.value.length;
    if (currentLength > 0 && $textArea.value.length > 0) {
      $submitButton.disabled = false;
    } else {
      $submitButton.disabled = true;
    }
  });

  $createComment?.addEventListener("click", function () {
    if (
      !validateRequired(
        { inputNode: $inputName, textAreaNode: $textArea },
        $validateMessage
      )
    )
      return;
    handleCreate();
  });

  $editComment?.addEventListener("click", function ({ target }) {
    const CLASS_NAME = "editing";
    if (target.className.includes(CLASS_NAME)) {
      if (
        !validateRequired({ inputNode: $inputName, textAreaNode: $textArea })
      ) {
        return;
      }
      $editComment.disabled = false;
      return openCheckPasswordDialog();
    }
    $inputName.disabled = false;
    $textArea.disabled = false;
    $textArea.focus();
    toHidden($deleteComment);
    $editComment.classList.add(CLASS_NAME);
  });

  $checkPasswordButton?.addEventListener("click", function () {
    /**
     * 1. 비밂번호 체크
     * 2. 성공시
     * 2-1. dialog 닫기
     * 2-2. modal 없데이트 (수정모드 이전)
     * 2-3. list 업데이트
     */
    hiddenDialog(true);
  });
}

function validateRequired({ inputNode, textAreaNode }) {
  if (!(inputNode.value.length && textAreaNode.value.length)) {
    return false;
  }
  return true;
}

export async function handleGetComment(id) {
  showModal();
  isLoadingModal(true);
  try {
    const commentItem = await getComment(id);
    renderAddComment({ isNew: false, ...commentItem });
  } catch (err) {
    hiddenModal();
    showToast("오류가 발생하였습니다.");
    console.log(err);
  } finally {
    isLoadingModal(false);
  }
}

async function handleCreate() {
  try {
    isLoadingModal(true);
    await createComment();
    renderCommentList();
    hiddenModal();
  } catch (err) {
    showToast("오류가 발생하였습니다.");
  } finally {
    isLoadingModal(false);
  }
}

function openCheckPasswordDialog() {
  $inputPassword.value = "";
  showDialog();
  $inputPassword.focus();
}

async function handleCheckPassword() {
  try {
    isLoadingModal(true);
    handleUpdate();
  } catch (err) {
    showToast("오류가 발생하였습니다.");
  } finally {
    isLoadingModal(false);
  }
}

async function handleUpdate() {
  try {
    isLoadingModal(true);
    await updateComment();
    renderCommentList();
    hiddenModal();
  } catch (err) {
    showToast("오류가 발생하였습니다.");
  } finally {
    isLoadingModal(false);
  }
}

function createCommentEditRow(flexType) {
  const $result = document.createElement("div");
  $result.className = `comment-edit-row${flexType ? ` ${flexType}` : ""}`;
  return $result;
}
