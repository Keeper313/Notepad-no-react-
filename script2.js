document.addEventListener("DOMContentLoaded", function () {
    fillNote();
});
function fillNote() {
    let newData = JSON.parse(localStorage.getItem('newData'));
    newData.forEach(element => {
        document.querySelector("textarea").textContent = element.text;
        document.querySelector("h1").textContent = element.name;
        document.querySelector("p").textContent = element.date;
    });

    }
let textarea = document.querySelector("textarea")
document.querySelector(".copy").addEventListener("click", function () {
    textarea.select();
    document.execCommand("copy");
})
let edite = document.querySelector("#edite")
edite.addEventListener("click", function () {
    if (textarea.readOnly === true) {
        textarea.readOnly = false;
        edite.className = "edite1"
    }
    else {
        textarea.readOnly = true;
        edite.className = "edite"
    }

})
let copyLink = document.querySelector(".share");
copyLink.addEventListener("click", function (event) {


    let linkToCopy = window.location.href;

    navigator.clipboard.writeText(linkToCopy)
        .then(function () {
            alert("Посилання скопійовано!");
        })
        .catch(function (error) {
            alert("При копіюванні посилання сталася помилка: " + error);
        });
});