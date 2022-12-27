let count = 0;

const countEl = document.getElementById("sheep-count");
const saveEl  = document.getElementById("count-el");

function increment() {
    count++;
    countEl.textContent = count;
}

function save() {
    saveEl.textContent += count + " - ";
    countEl.textContent = 0;
    count = 0;
}