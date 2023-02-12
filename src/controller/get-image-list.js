import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { toHiddenFixed, toShow, toShowFixed } from "../util";
import {
  IMAGE_PNG_LIST,
  IMAGE_JPG_LIST,
  IMAGE_HERO_URL_LIST,
  IMAGE_HERO_LIST,
} from "./store";

const $loading = document.querySelector("#loading");
const storage = getStorage();

export async function getImageList() {
  const heroImages = await getHeroImage();
  const [jpg, png] = await getWeddingImageList();
  IMAGE_PNG_LIST.push(...png);
  IMAGE_JPG_LIST.push(...jpg);
  IMAGE_HERO_URL_LIST.push(...heroImages);
  isLoading(false);
}

async function getWeddingImageList(rootPath) {
  const rootRef = storageRef(storage, rootPath);
  const { prefixes } = await listAll(rootRef);

  const imageList = prefixes.map(async ({ _location }) => {
    const rootPath = _location.path_;
    if (!rootPath) return;
    const sourceRef = storageRef(storage, rootPath);
    const { items } = await listAll(sourceRef);

    return await Promise.all(
      items.map(async ({ _location }) => {
        const imagePath = _location.path_;
        return await getWeddingImage(imagePath);
      })
    );
  });
  return await Promise.all(imageList);
}

async function getWeddingImage(imagePath) {
  const imageRef = storageRef(storage, imagePath);
  return await getDownloadURL(imageRef);
}

async function getHeroImage() {
  return await Promise.all(
    IMAGE_HERO_LIST.map(async (imagePath) => {
      return await getWeddingImage(imagePath);
    })
  );
}

function isLoading(isLoading) {
  if (isLoading) toShowFixed($loading);
  else toHiddenFixed($loading);
}
