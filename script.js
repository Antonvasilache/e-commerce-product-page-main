import {
  addItemToCart,
  deleteItemFromCart,
  handleClickOutside,
  lightboxDisplay,
  navigateThumbnails,
  thumbnailSelect,
} from "./functions.js";

const cart = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
const cartIcon = document.querySelector(".cart-icon");
const asideContainer = document.querySelector(".aside");
const productImg = document.querySelector(".product-img");
const plusQty = document.querySelector(".article-qty-plus");
const addToCartBtn = document.querySelector(".add-cart-btn");
const minusQty = document.querySelector(".article-qty-minus");
const arrowLeft = asideContainer.querySelector(".arrow-left");
const arrowRight = asideContainer.querySelector(".arrow-right");
const qtyNumber = document.querySelector(".article-qty-number");
const filledCart = document.querySelector(".cart-content-filled");
const thumbnails = document.querySelectorAll(".product-thumbnails-item");

//thumbnail selection and highlight
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", thumbnailSelect);
});

//controlling item quantity
plusQty.addEventListener("click", () => {
  qtyNumber.textContent++;
});
minusQty.addEventListener("click", () => {
  if (qtyNumber.textContent > 0) qtyNumber.textContent--;
});

//adding item to cart
addToCartBtn.addEventListener("click", addItemToCart);

//deleting item from cart
filledCart.addEventListener("click", deleteItemFromCart);

//showing and hiding cart
cartIcon.addEventListener("click", () => {
  cart.classList.toggle("hidden");
});
document.addEventListener("click", handleClickOutside);

//showing and hiding lightbox
overlay.addEventListener("click", (e) => {
  //closing lightbox when clicking outside
  if (
    !e.target.closest(".product-thumbnails-overlay") &&
    !e.target.closest(".arrow-left") &&
    !e.target.closest(".arrow-right")
  ) {
    overlay.classList.add("hidden");
    const asideClone = overlay.querySelector(".aside");
    asideClone.remove();
  }
});
productImg.addEventListener("click", (e) => {
  lightboxDisplay();

  //showing close icon inside lightbox
  const closeIcon = document.querySelector(".close-icon");
  closeIcon.classList.toggle("hidden");

  //left-right arrows navigation
  const arrowLeft = overlay.querySelector(".arrow-left");
  const arrowRight = overlay.querySelector(".arrow-right");
  arrowLeft.classList.remove("hidden");
  arrowRight.classList.remove("hidden");
  arrowLeft.addEventListener("click", (e) => navigateThumbnails(e, overlay));
  arrowRight.addEventListener("click", (e) => navigateThumbnails(e, overlay));
});

//arrows navigation for smaller screens
arrowLeft.addEventListener("click", (e) =>
  navigateThumbnails(e, asideContainer)
);
arrowRight.addEventListener("click", (e) =>
  navigateThumbnails(e, asideContainer)
);

//toggle menu
const menuIcon = document.querySelector(".icon-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const menuCloseBtn = document.querySelector(".menu-img-close");
menuIcon.addEventListener("click", () => {
  overlay.style.display = "block";
  mobileMenu.classList.toggle("hidden");
});

menuCloseBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  mobileMenu.classList.toggle("hidden");
});
