import { catsArray } from "./data.js";

///////////////////////////////////
/*       Global Variables        */
///////////////////////////////////

// for closing the modal by clicking outside it
let isModalOpened = false;
let modalOpenedOneTime = true;

const radioContainer = document.getElementById('radio-container');
const emotionRadios = document.getElementsByClassName('radio');
const getImageBtn = document.getElementById('get-image-btn');
const gifOnly = document.getElementById('gif-only');
const modal = document.getElementById('modal');
const modalInner = document.getElementById('modal-inner');
const modalCloseBtn = document.getElementById('modal-close-btn');

///////////////////////////////////
/*         Main Functions        */
///////////////////////////////////

renderEmotionRadios(catsArray);

/* for rendering the emotion radio buttons on loading the page */
function renderEmotionRadios(cats) {
    const emotions = getEmotionsArray(cats);
    let htmlString = "";
    for (const emotion of emotions) {
        htmlString += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" id="${emotion}" value="${emotion}" name="emotion-radios">
        </div>
        `;
    }

    radioContainer.innerHTML = htmlString;
}

function getEmotionsArray(cats) {
    // get the selected cats
    const emotions = []
    for (const cat of cats) {
        for (const emotion of cat.emotionTags) {
            if (!emotions.includes(emotion)) {
                emotions.push(emotion)
            }
        }
    }

    return emotions;
}


///////////////////////////////////
/*         Event Handling        */
///////////////////////////////////

radioContainer.addEventListener('change', highlightSelectedEmotion);

getImageBtn.addEventListener('click', renderCat);

modalCloseBtn.addEventListener('click', closeModal);

onClickOutsideModal(modal, closeModal, isModalOpened);


/* for highlighting selected radio */
function highlightSelectedEmotion(evt) {
    // remove previously selected emotion radio
    for (const radio of emotionRadios) {
        radio.classList.remove('highlight');
    }

    // highlight selected emotion radio
    evt.target.parentElement.classList.add('highlight');
}

/* for rendering cat in the modal */
function renderCat(evt) {
    const cat = getSingleMatchingCat(catsArray);
    if(!cat) {
        return;
    }

    modal.classList.add('modal-display');
    isModalOpened = true;

    modalInner.innerHTML = `
    <img class="cat-img" src="./images/${cat.image}" alt="${cat.alt}">
    `;
}

function getSingleMatchingCat(cats) {
    const matchingCats = getMatchingCatsArray(cats);
    if (!matchingCats) {
        return null;
    }

    if(matchingCats.length === 1) {
        return matchingCats[0];
    } else {
        const randomIndex = Math.floor(Math.random() * matchingCats.length);
        return matchingCats[randomIndex];
    }
}

function getMatchingCatsArray(cats) {
    const selectedEmotion = document.querySelector('input[type="radio"]:checked');
    if (!selectedEmotion) {
        return null;
    }

    const isGifOnly = gifOnly.checked;
    const matchingCats = cats.filter(cat => {
        if (isGifOnly) {
            return cat.emotionTags.includes(selectedEmotion.value) && cat.isGif;
        } else {
            return cat.emotionTags.includes(selectedEmotion.value);
        }
    }); 

    return matchingCats;
}

/* for closing Modal */
function closeModal() {
    modal.classList.remove('modal-display');
    isModalOpened = false;
    modalOpenedOneTime = true;
}

/* for closing Modal by clicking outside it */
function onClickOutsideModal(elem, callback) {
    document.addEventListener('click', evt => {
        // if Modal is opend and the click is outside Modal
        //    then close Modal
        if (isModalOpened && !elem.contains(evt.target)) { 
            // Stop the function from closing Modal when 
            //    clicking on the SHOW IMAGE button
            if (!modalOpenedOneTime) {
                callback();
            } else {
                modalOpenedOneTime = false;
            }
        }
    });
}
