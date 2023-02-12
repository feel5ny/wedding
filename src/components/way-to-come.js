import { showToast } from "./toast";
import copy from "copy-to-clipboard";

const $wayToComeMapBackButton = document.querySelector(".map-back-button");
const $wayToComeList = document.querySelector(".way-to-come-list");

export function initWayToCome() {
  renderMap();
  renderList();
}

function renderMap() {
  const WEDDING_POS = {
    LATITUDE: 37.56781916736698,
    LONGITUDE: 126.97028233923344,
  };
  const NAVER_LATLNG = new naver.maps.LatLng(
    WEDDING_POS.LATITUDE,
    WEDDING_POS.LONGITUDE
  );
  const mapOptions = {
    center: NAVER_LATLNG,
    zoom: 19,
    scaleControl: false,
    logoControl: false,
    mapDataControl: false,
    zoomControl: true,
    minZoom: 6,
  };
  const map = new naver.maps.Map("map", mapOptions);
  new naver.maps.Marker({
    position: NAVER_LATLNG,
    map,
    animation: naver.maps.Animation.BOUNCE,
  });
  $wayToComeMapBackButton.addEventListener("click", function () {
    map.panTo(NAVER_LATLNG);
  });
}

function renderList() {
  const listData = [
    {
      link: "https://naver.me/x6U34HlG",
      icon: "https://play-lh.googleusercontent.com/yB6ePH3QA0EMU8qTqM5tOPtpZ8bZeIYhb9Oi2RHOy9YvK5fdxIlbN1H46QtdHNC_1g=w240-h480-rw",
      label: "네이버 지도",
      type: "link",
      isVisible: { mobile: true, desktop: true },
    },
    {
      link: "tmap://search?name=프란치스코교육회관",
      icon: "https://play-lh.googleusercontent.com/WcrqQ9atNdC7dp4vG4fWue0kRdMxiDSTKu9E1Zj7EmGcgdQ8j3u9_2Tt8vw-zPvKCkg=w240-h480-rw",
      label: "티맵",
      type: "link",
      isVisible: { mobile: true, desktop: false },
    },
    {
      link: null,
      icon: "https://firebasestorage.googleapis.com/v0/b/wedding-29932.appspot.com/o/icon%2Fcopy.png?alt=media&token=7f80043a-1bf8-4b6f-9b16-3e0d33ee5810",
      label: "주소 복사",
      type: "copy",
      isVisible: { mobile: true, desktop: true },
    },
  ];
  listData.map(({ link, icon, label, type, isVisible }) => {
    const $liTag = document.createElement("li");
    const $buttonTag = document.createElement("button");
    const $ImageTag = document.createElement("img");
    const $pTag = document.createElement("p");
    $liTag.className = "way-to-come-item";
    $ImageTag.className = "way-to-come-icon";
    $ImageTag.src = icon;
    $pTag.textContent = label;

    if (mobileCheck() && !isVisible.mobile)
      return ($liTag.style.display = "none");
    if (!mobileCheck() && !isVisible.desktop)
      return ($liTag.style.display = "none");

    if (link) {
      const $aTag = document.createElement("a");
      $aTag.target = "_blank";
      $aTag.href = link;
      $aTag.append($ImageTag);
      $aTag.append($pTag);
      $buttonTag.appendChild($aTag);
    } else {
      $buttonTag.append($ImageTag);
      $buttonTag.append($pTag);
    }

    if (type === "copy") {
      $liTag.addEventListener("click", async function () {
        const TEXT = "서울시 중구 정동길 9 프란치스코 작은형제회 수도원 성당";
        try {
          if (copy(TEXT)) return showToast("복사가 완료되었습니다.");
          return showToast("복사가 실패하였습니다.");
        } catch (err) {
          alert(JSON.stringify(err.message));
          showToast("복사가 실패하였습니다.");
        }
      });
    }

    $liTag.appendChild($buttonTag);
    $wayToComeList.appendChild($liTag);
  });
}
