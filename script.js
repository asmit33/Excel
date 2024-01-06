let rows = 100;
let col = 26;

let addressColCont = document.querySelector(".address-col-cont");

for (let i = 0; i < rows; i++) {
  let addressCol = document.createElement("div");
  addressCol.setAttribute("class", "address-col");
  addressCol.innerText = i + 1;

  addressColCont.appendChild(addressCol);
}

let addressRowCont = document.querySelector(".address-row-cont");
for (let i = 0; i < col; i++) {
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");
  addressRow.innerText = String.fromCharCode(65 + i);
  addressRowCont.appendChild(addressRow);
}

let cellCont = document.querySelector(".cell-cont");

for (let i = 0; i < rows; i++) {
  let rowCont = document.createElement("div");
  rowCont.setAttribute("class", "row-cont");
  for (let j = 0; j < col; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("contenteditable", "true");
    cell.setAttribute("spellcheck", "false");
    //Attribute for cell and storage identification
    cell.setAttribute("rid", i);
    cell.setAttribute("cid", j);
    rowCont.appendChild(cell);

    addListenerForAddressDisplay(cell, i, j);
  }
  cellCont.appendChild(rowCont);
}

let addressBar = document.querySelector(".address-bar");

function addListenerForAddressDisplay(cell, i, j) {
  cell.addEventListener("click", (e) => {
    let rowID = i + 1;
    let colID = String.fromCharCode(65 + j);
    addressBar.value = `${colID}${rowID}`;
  });
}

//By default click on first cell

// let firstCell = document.querySelector(".cell");
// firstCell.click();
