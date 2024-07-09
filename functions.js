export function deleteItemFromCart(e) {
  const emptyCart = document.querySelector(".cart-content-empty");
  const filledCart = document.querySelector(".cart-content-filled");
  const cartItemsNumber = document.querySelector(".cart-items-number");
  const deleteBtn = e.target.closest("button.delete-btn");

  if (deleteBtn) {
    const cartItem = deleteBtn.closest(".cart-content-item");
    if (cartItem) {
      cartItem.remove();

      const remainingCartItems =
        filledCart.querySelectorAll(".cart-content-item");

      if (remainingCartItems.length === 0) {
        filledCart.classList.toggle("hidden");
        emptyCart.classList.toggle("hidden");
        cartItemsNumber.classList.toggle("hidden");
      }
    }
  }
}

export function handleClickOutside(e) {
  const cart = document.querySelector(".cart");
  const cartIcon = document.querySelector(".cart-icon");

  if (
    !cart.contains(e.target) &&
    e.target !== cartIcon &&
    !e.target.closest(".delete-btn") &&
    !e.target.closest(".add-cart-btn")
  ) {
    cart.classList.add("hidden");
  }
}

export function addItemToCart() {
  let itemExists = false;
  const unitPrice = document.querySelector(
    ".article-price-discount-number"
  ).textContent;
  const cart = document.querySelector(".cart");
  const emptyCart = document.querySelector(".cart-content-empty");
  const filledCart = document.querySelector(".cart-content-filled");
  const cartItemsNumber = document.querySelector(".cart-items-number");
  const itemName = document.querySelector(".article-header").textContent;
  const existingCartItems = document.querySelectorAll(".cart-content-item");
  const thumbnailImg = document.querySelector(".product-thumbnails-img").src;
  let unitQty = document.querySelector(".article-qty-number").textContent;
  const totalPrice = Number(unitPrice.slice(1)) * Number(unitQty);

  //if item exists, quantity and total price will be updated
  existingCartItems.forEach((item) => {
    const addedItemName = item.querySelector(".item-text-title").textContent;
    if (addedItemName === itemName) {
      itemExists = true;
      const existingQty = item.querySelector(".item-text-price-qty");
      const currentTotalPrice = item.querySelector(".item-text-price-total");

      existingQty.textContent =
        Number(existingQty.textContent) + Number(unitQty);
      const newPrice = Number(unitPrice.slice(1)) * existingQty.textContent;
      currentTotalPrice.textContent = `$${newPrice.toFixed(2)}`;
    }
  });

  //if item doesn't exist, new item will be added to cart
  if (!itemExists && unitQty > 0) {
    filledCart.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="cart-content-item">
                <img
                  src="${thumbnailImg}"
                  alt="Product thumbnail"
                  class="thumbnail-cart-img"
                />
                <div class="item-text">
                  <p class="item-text-title">${itemName}</p>
                  <p class="item-text-price">
                    <span class="item-text-price-unit">${unitPrice}</span> x
                    <span class="item-text-price-qty">${unitQty}</span>
                    <span class="item-text-price-total">$${totalPrice.toFixed(
                      2
                    )}</span>
                  </p>
                </div>
                <button class="delete-btn">
                <svg
                  width="14"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <path
                      d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                      id="a"
                    />
                  </defs>
                  <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
                </svg>
                </button>
              </div>
              `
    );

    filledCart.classList.remove("hidden");
    emptyCart.classList.add("hidden");
  }

  if (unitQty > 0) cart.classList.remove("hidden");

  //showing number of items popover
  let totalItemsNumber = 0;
  document.querySelectorAll(".item-text-price-qty").forEach((item) => {
    totalItemsNumber = totalItemsNumber + Number(item.textContent);
  });

  if (totalItemsNumber) {
    cartItemsNumber.textContent = totalItemsNumber;
    cartItemsNumber.classList.remove("hidden");
  }
}

export function thumbnailSelect(e) {
  const clickedThumbnail = e.currentTarget;
  const overlays = document.querySelectorAll(".product-thumbnails-overlay");
  const productImg = document.querySelector(".product-img");

  overlays.forEach((overlay) => overlay.classList.remove("active"));

  clickedThumbnail
    .querySelector(".product-thumbnails-overlay")
    .classList.add("active");

  const thumbnailId = clickedThumbnail.dataset.thumbnailId;
  productImg.src = `/images/image-product-${thumbnailId}.jpg`;
}

export function navigateThumbnails(e) {
  const overlay = document.querySelector(".overlay");
  //   const arrowLeft = overlay.querySelector(".arrow-left");
  //   const arrowRight = overlay.querySelector(".arrow-right");
  const productImg = overlay.querySelector(".product-img");
  const arrowLeft = e.target.closest(".arrow-left");
  console.log(arrowLeft);

  const currentThumbnail = overlay.querySelector(
    ".product-thumbnails-overlay.active"
  )?.parentElement;

  let thumbnailId = currentThumbnail ? currentThumbnail.dataset.thumbnailId : 1;

  if (thumbnailId > 1) {
    thumbnailId = thumbnailId - 1;
    productImg.src = `/images/image-product-${thumbnailId}.jpg`;
    console.log(productImg);
  }

  console.log(thumbnailId);

  //!!NEED TO CHANGE ACTIVE THUMBNAIL
}

export function lightboxDisplay() {
  const overlay = document.querySelector(".overlay");
  const aside = document.querySelector(".aside");
  const asideClone = aside.cloneNode(true);
  overlay.classList.toggle("hidden");

  const productImg = asideClone.querySelector(".product-img");
  productImg.style.width = "100%";
  productImg.style.maxWidth = "550px";
  productImg.style.height = "100%";
  productImg.style.maxHeight = "550px";

  overlay.insertAdjacentElement("afterbegin", asideClone);

  const thumbnails = asideClone.querySelectorAll(".product-thumbnails-item");
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", thumbnailSelect);
  });
}
