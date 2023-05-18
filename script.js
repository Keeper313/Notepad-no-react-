document.querySelector(".submit").addEventListener("click", introduction);

function introduction() {
  let name = document.querySelector(".name");
  let text = document.querySelector(".text");
  if (name.value !== "" && text.value !== "") {
    let date1 = date();
    let information = {
      id: JSON.parse(localStorage.getItem("info")).length + 1,
      name: name.value,
      text: text.value,
      date: date1,
    };
    let savedInfo = localStorage.getItem("info");
    let info = [];

    if (savedInfo) {
      info = JSON.parse(savedInfo);
    }
    info.push(information);
    localStorage.setItem("info", JSON.stringify(info));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  creatingNote();
  closed();
  detailNote();
});

function creatingNote() {
  let info = JSON.parse(localStorage.getItem("info"));

  if (!info) {
    info = localStorage.setItem("info", JSON.stringify([]));
  }

  info.forEach((item) => {
    let div = document.querySelector(".notes");
    let divConteinerNotes = document.createElement("div");
    divConteinerNotes.className = "conteiner__notes";
    divConteinerNotes.dataset.name = item.id;

    let divblock = document.createElement("div");
    divblock.className = "block";
    let h2 = document.createElement("h2");
    let closeBtn = document.createElement("button");
    closeBtn.className = "closed";
    closeBtn.textContent = "X"
    closeBtn.dataset.name = item.id;

    let p = document.createElement("p");
    p.className = "par";
    let divDate = document.createElement("div");
    divDate.className = "date";

    let divLinks = document.createElement("div");
    divLinks.className = "links";

    let a = document.createElement("a");
    a.href = "https://twitter.com";
    a.target = "_blank";
    let image = document.createElement("img");
    image.src = "./img/twitter.png";
    image.alt = "twitter";

    let a2 = document.createElement("a");
    a2.href = "https://www.facebook.com";
    a2.target = "_blank";
    let image2 = document.createElement("img");
    image2.src = "./img/facebook.png";
    image2.alt = "facebook";

    a.appendChild(image);
    divLinks.appendChild(a);
    a2.appendChild(image2);
    divLinks.appendChild(a2);

    divblock.appendChild(h2);
    divblock.appendChild(closeBtn);

    h2.innerText = item.name;
    p.innerText = item.text;
    divDate.innerText = item.date;

    divConteinerNotes.append(divblock);
    divConteinerNotes.append(p);
    divConteinerNotes.append(divDate);
    divConteinerNotes.append(divLinks);
    div.append(divConteinerNotes);
  });
}

function date() {
  var date = new Date();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var formattedDate = day + " " + months[month] + " " + year;
  return formattedDate;
}

document.querySelector(".clear").addEventListener("click", function () {
  let name = document.querySelector(".name");
  let text = document.querySelector(".text");
  name.value = "";
  text.value = "";
});

function closed() {
  let closed = document.querySelectorAll(".closed");
  closed.forEach((element) => {
    element.addEventListener("click", (event) => {
      let clickedImage = event.target;
      let index = clickedImage.dataset.name;

      let block = document.querySelectorAll("[data-name]");
      block.forEach((item) => {
        if (item.dataset.name === index) {
          item.remove();
        }
      })

      let data = JSON.parse(localStorage.getItem('info'));
      let x = -1;
      for (let i = 0; i < data.length; i++) {
        if (Number(data[i].id) === Number(index)) {
          x = i;
          break;
        }
      }
      if (x !== -1) {
        data.splice(x, 1);
        localStorage.setItem('info', JSON.stringify(data));
      }
    })
  })
}

function detailNote() {
  document.querySelectorAll(".par").forEach((item) => {
    item.addEventListener("click", function (event) {
      let clickedImage = event.target;
      let index = clickedImage.parentElement.dataset.name;

      let info = JSON.parse(localStorage.getItem('info'));

      let elementToCopy = info.find(function (item) {
        return Number(item.id) === Number(index);
      });
      if (elementToCopy) {
        let newData = [elementToCopy];
        localStorage.setItem('newData', JSON.stringify(newData));
      }
      window.location.href = "./index2.html";
    });
  })
}

