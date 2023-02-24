// global variables //
const modal = document.getElementById('modal');
const modalInner = document.getElementById('modal-inner');
const modalForm = document.getElementById('modal-form');
const modalText = document.getElementById('modal-text');
const modalDeclineBtn = document.getElementById('modal-decline-btn');

// main //
setTimeout(() => modal.style.display = 'inline', 1500);

modalForm.addEventListener('submit', evt => {
    evt.preventDefault();

    const modalFormData = new FormData(modalForm);
    const fullName = modalFormData.get("userFullName");

    modalForm.style.display = 'none';
    
    modalText.innerHTML = `
    <div class="modal-loading">
        <img class="modal-loading-img" src='./images/loading.svg' alt='animated loading'>
        <p id="modal-loading-text">Uploading your data to the dark web...</p>
    </div>
    `;
    setTimeout(() => {
        document.getElementById('modal-loading-text').textContent = "Making the sale...";
    }, 1500);

    setTimeout(() => {
        modalInner.innerHTML = `
        <h2>Thanks <span class="modal-inner-name">${fullName}</span>, you Sucker!</h2>
        <p>We just sold the rights to your eternal soul.</p>
        <div class="idiot-gif-container">
            <img class="idiot-gif" src="./images/pirate.gif" alt="a pirate laughing">
            
        </div>
        `;     
    }, 3000);

});

// event handling //
modalDeclineBtn.addEventListener('mouseenter', () => {
    modalDeclineBtn.parentElement.classList.toggle('modal-form-btns-reverse');
});