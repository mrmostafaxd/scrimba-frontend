/* ========================
 *     Global variables
   ======================== */
let myLeads = [];

const leadInput = document.getElementById("url-input");
const saveBtn = document.getElementById("save-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const leadList = document.getElementById("lead-list");


/* ========================
 *         Functions
   ======================== */
// check if the user just clicked save link without adding links
function checkEmptyString(str) {
    return str != "" || str.trim() != ""
}

// add "https://" if the user didn't include it to convert the url to absolute link
function addHref(link) {
    if (link.toLowerCase().includes("http://") || link.toLowerCase().includes("https://")) {
        return link;
    } else {
        return "https://" + link;
    }
}

// render the saved links to the extenstion page
function render(lead) {
    // add all lead links as a string then parse that string
    //   as an html only once to increase performance
    let htmlString = "";
    lead.forEach(function(element) {
        htmlString += `
            <li>
                <a href="${addHref(element)}" target="_blank">
                    ${addHref(element)}
                </a>
            </li>`;
    });

    // clear and redraw 
    leadList.innerHTML = htmlString;
}


/* ========================
 *      Loading Links
   ======================== */
const addLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// load the links to the extension if the local storage already contains the links
if (addLocalStorage) {
    myLeads = addLocalStorage;
    render(myLeads);
}


/* ========================
 *      Event Handling
   ======================== */
saveBtn.addEventListener("click", function() {
    // add the link to the lead links if it is not an empty string
    //   then add it to chrome local storage
    if (checkEmptyString(leadInput.value)) {
        myLeads.push(leadInput.value);
        leadInput.value = "";

        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    }
    console.log(myLeads);
});

tabBtn.addEventListener("click", function() {
    // add the current active tab in the current window
    //     to the leads and the local storage
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);

        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
})

deleteBtn.addEventListener("dblclick", function() {
    // clear chrome local storage
    localStorage.clear()
    myLeads = [];
    render(myLeads);
    console.log(myLeads);
})
