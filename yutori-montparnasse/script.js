"use strict";
// スマートフォンのメニュー開閉を担当します。
// 文章や画像の変更だけなら、このファイルを編集する必要はありません。
// 650px は style.css のスマートフォン用設定とそろえています。

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
const mobile = window.matchMedia("(max-width: 650px)");

// メニューを開く・閉じる処理
function setOpen(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.hidden = !open;
}

// 画面幅に合わせて、メニューの表示を切り替えます。
function syncMenu() {
  menuButton.hidden = !mobile.matches;
  setOpen(!mobile.matches);
}

// メニューボタンを押したとき
menuButton.addEventListener("click", () => {
  setOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

// リンクを押したら、スマートフォンのメニューを閉じます。
navigation.addEventListener("click", (event) => {
  if (mobile.matches && event.target.closest("a")) {
    setOpen(false);
  }
});

// Escapeキーでも閉じられるようにします。
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobile.matches && !navigation.hidden) {
    setOpen(false);
    menuButton.focus();
  }
});

// 画面幅が変わったときと、最初に開いたときの設定
mobile.addEventListener("change", syncMenu);
syncMenu();
