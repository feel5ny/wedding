import queryString from "query-string";
const $body = document.querySelector("body");

export function toShow(node) {
  // node.removeEventListener("animationend", handleHidden(node));
  if (node.className.includes("none")) {
    node.className = node.className.replace("none", "show");
  } else {
    node.classList.add("show");
  }
}

export function toSlideIn(node) {
  if (node.className.includes("none")) {
    node.className = node.className.replace("none", "show");
  } else {
    node.classList.add("show");
  }
  node.classList.add("modalIn");
}

export function toSlideOut(node) {
  if (node.className.includes("modalIn")) {
    node.className = node.className.replace("modalIn", "modalOut");
  } else node.classList.add("modalOut");

  node.addEventListener("animationend", handleHidden(node));
}

export function toHidden(node) {
  if (node.className.includes("show")) {
    node.className = node.className
      .replace("show", "none")
      .replace("fadeOut", "");
  } else {
    node.classList.add("none");
  }
}
const handleHidden = (node) => () => {
  toHidden(node);
};

export function toFadeOut(node) {
  if (node.className.includes("fadeIn")) {
    node.className = node.className.replace("fadeIn", "fadeOut");
  } else node.classList.add("fadeOut");

  node.addEventListener("animationend", handleHidden(node));
}

export function createRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function replaceNodeClassName(node, { prevClass, currentClass }) {
  node.className = node.className.replace(prevClass, currentClass);
}

const OVERFLOW_HIDDEN_CLASSNAME = "overflow-hidden";

export function handleOverflowHidden(option, node = $body) {
  if (option?.shouldOverflowHidden !== undefined) {
    if (option?.shouldOverflowHidden) {
      return node.classList.add(OVERFLOW_HIDDEN_CLASSNAME);
    } else {
      return (node.className = node.className.replace(
        OVERFLOW_HIDDEN_CLASSNAME,
        ""
      ));
    }
  }
  if (node.className.includes(OVERFLOW_HIDDEN_CLASSNAME)) {
    node.className = node.className.replace(OVERFLOW_HIDDEN_CLASSNAME, "");
    return;
  }
  node.classList.add(OVERFLOW_HIDDEN_CLASSNAME);
}

export function toShowFixed(node) {
  toShow(node);
  handleOverflowHidden();
}

export function toHiddenFixed(node) {
  toFadeOut(node);
  handleOverflowHidden();
}

export function toModalIn(node, root) {
  toShow(root);
  toSlideIn(node);
  handleOverflowHidden();
}

export function toModalOut(node, root) {
  toSlideOut(node);
  node.addEventListener("animationend", handleHidden(root));
  handleOverflowHidden();
}

export function isBride(type) {
  return type === "bride";
}

export function addLocationHash(hash) {
  window.location.hash = `#${hash}`;
}

export function removeLocationHash() {
  const noHashURL = window.location.href.replace(/#.*$/, "");
  window.history.replaceState("", document.title, noHashURL);
}

export function removeQueryParameter(key) {
  const currentSearch = queryString.parse(
    window.location.search.replace("?", "")
  );
  delete currentSearch[key];
  window.history.replaceState(
    null,
    null,
    `?${queryString.stringify(currentSearch)}`
  );
}

export function addQueryParameter(newQueryObject) {
  const currentSearch = queryString.parse(
    window.location.search.replace("?", "")
  );

  window.history.replaceState(
    null,
    null,
    `?${queryString.stringify({
      ...currentSearch,
      ...newQueryObject,
    })}`
  );
}
