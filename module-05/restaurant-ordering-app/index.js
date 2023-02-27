import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


/* global variables */

const paymentForm = document.getElementById('payment-form');
const modal = document.getElementById('modal');

const selectedItems = [];
let isModalOpened = false;


/* main functions */

renderMenu();

function renderMenu() {
    document.getElementById('food-items').innerHTML = getMenuHtml();
}

function getMenuHtml() {
    let menuHtml = "";
    menuArray.forEach(item => {
        menuHtml += `
        <div class="food-item">
            <span class="food-icon">${item.emoji}</span>
            <div>
                <p class="fs-28 m-0 font-smythe-normal">${item.name}</p>
                <p class="ingredient font-smythe-normal">${item.ingredients.join(', ')}</p>
                <p class="price m-0 font-smythe-normal">$${item.price}</p>
            </div>
            <button id="item-btn-${item.id}" class="add-food-btn" data-id="${item.id}">+</button>
        </div>
        `;
    });

    return menuHtml;
}

/* Event Handling */

paymentForm.addEventListener('submit', evt => {
    evt.preventDefault();

    toggleModal(false);
    selectedItems.splice(0, selectedItems.length);

    const paymentFormData = new FormData(paymentForm);
    const customerName = paymentFormData.get('customer-name');
    renderThanks(customerName);
})

document.addEventListener('click', evt => {
    if(evt.target.id.includes('item-btn-', 0)) {
        addItemToTab(evt.target.dataset.id);
    } else if (evt.target.id.includes('remove-btn-', 0)) {
        removeItemFromTab(evt.target.dataset.remove);
    } else if (evt.target.id === "complete-order-btn") {
        toggleModal(true);
    } else if (evt.target.dataset.star) {
        addRating(evt.target.dataset.star);
    } else if (isModalOpened && !modal.contains(evt.target)) {
        // close payment modal if user clicked outside the modal
        toggleModal(false);
    }
});


function toggleModal(openModal) {
    if (openModal) {
        modal.style.display = "block";
        isModalOpened = true;
    } else {
        modal.style.display = "none";
        isModalOpened = false;
    }
}

function renderThanks(customerName) {
    let thanksHtml = `
    <div class="thanks-container">
        <p class="thanks mb-0 font-smythe-normal">Thanks, ${customerName}! Your order is on its way!</p>
        <p class="fs-28 m-0 font-smythe-normal">Rate our service:</p>
        <div class="rating">
            <span id="1-star" class="fa fa-star" data-star="1"></span>
            <span id="2-star" class="fa fa-star" data-star="2"></span>
            <span id="3-star" class="fa fa-star" data-star="3"></span>
            <span id="4-star" class="fa fa-star" data-star="4"></span>
            <span id="5-star" class="fa fa-star" data-star="5"></span>
        </div>
    </div>
    `;

    renderFinalContainer(thanksHtml);
}

// display the thanks and rating or the tab
function renderFinalContainer(html) {
    const finalContainer = document.getElementById('final-container');
    
    finalContainer.style.display = "none";
    finalContainer.innerHTML = html;
    finalContainer.style.display = "block";
}

function addItemToTab(itemId) {
    const foodItemObj = menuArray.filter(item => item.id.toString() === itemId)[0];
    selectedItems.push({
        name:foodItemObj.name,
        price:foodItemObj.price,
        uuid: uuidv4()
    });
    renderFinalContainer(getTabHtml());
}

function removeItemFromTab(itemUUID) {
    const tabItemIndex = selectedItems.findIndex(tabItem => tabItem.uuid === itemUUID);
    selectedItems.splice(tabItemIndex, 1);
    renderFinalContainer(getTabHtml());
}

function getTabHtml() {
    // if there are no selected items, remove the tab
    if (!selectedItems.length) return '';

    // prepare the selected items for the tab
    let selectedHtml = '';
    let totalPrice = 0;
    selectedItems.forEach(item => {
        totalPrice += item.price;
        selectedHtml += `
        <div class="selected-item">
            <p class="fs-28 m-0 font-smythe-normal">${item.name}</p>
            <button id="remove-btn-${item.uuid}" class="remove-item-btn" data-remove="${item.uuid}">remove</button>
            <p class="tab-price m-0 font-smythe-normal">$${item.price}</p>
        </div>
        `;
    });
   
    // prepare the tab html
    let tabHtml = `
    <h2 class="tab-header fs-28 font-smythe-normal">Your order</h2>
    <div id="selected-items" class="selected-items">
        ${selectedHtml}
    </div>
    <div class="total-price-container">
        <p class="fs-28 m-0 font-smythe-normal">Total price:</p>
        <p class="tab-price m-0 font-smythe-normal">$${totalPrice}</p>
    </div>
    <button id="complete-order-btn" class="light-button complete-btn">Complete order</button>
    `;
    return tabHtml;    
}

function addRating(rating) {
    // clear the previous rating
    const stars = document.querySelectorAll(".fa-star");
    stars.forEach(star => star.classList.remove("checked"));

    // add stars till the rating
    stars.forEach(star => {
        if (+star.dataset.star <= +rating) {
            star.classList.add("checked");
        }
    });
}