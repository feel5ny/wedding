import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { toHiddenFixed, toShowFixed } from "../util";
import {
  IMAGE_PNG_LIST,
  IMAGE_JPG_LIST,
  IMAGE_HERO_URL_LIST,
  IMAGE_HERO_LIST,
} from "./store";

const $loading = document.querySelector("#loading");

export function isLoading(isLoading) {
  if (isLoading) toShowFixed($loading);
  else toHiddenFixed($loading);
}
