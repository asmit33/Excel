let sheetFolderCont = document.querySelector(".sheets-folder-cont");
let addSheetBtn = document.querySelector(".sheet-add-icon");
addSheetBtn.addEventListener("click", (e) => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");

  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  sheet.setAttribute("id", allSheetFolders.length);

  sheet.innerHTML = `<div class="sheet-content">Sheet-${
    allSheetFolders.length + 1
  }</div>`;

  sheetFolderCont.appendChild(sheet);
  createSheetDB();
  createGraphComponentMatrix();
  handleSheetActiveness(sheet);
  sheet.click();
});

function handleSheetDB(sheetidx) {
  sheetDB = collectedSheetDB[sheetidx];
  graphComponentmatrix = collectedGraphComponent[sheetidx];
}

function handleSheetProperties() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      cell.click();
    }
  }
  let firstCell = document.querySelector(".cell");
  firstCell.click();
}

function handleSheetUI(sheet) {
  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].style.backgroundColor = "transparent";
  }
  sheet.style.backgroundColor = "#ced6e0";
}

function handleSheetActiveness(sheet) {
  sheet.addEventListener("click", (e) => {
    let sheetidx = sheet.getAttribute("id");
    handleSheetDB(sheetidx);
    handleSheetProperties();
    handleSheetUI(sheet);
  });
}

function createSheetDB() {
  let sheetDB = [];
  for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < col; j++) {
      let cellProp = {
        bold: false,
        italic: false,
        underline: false,
        alignment: "left",
        fontFamily: "sans-serif",
        fontSize: "14",
        fontColor: "#000000",
        BGcolor: "#000000",
        value: "",
        formula: "",
        children: [],
      };
      sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
  }
  collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix() {
  let graphComponentmatrix = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < col; j++) {
      // why Array -> because there will be more than 1 children to store
      row.push([]);
    }
    graphComponentmatrix.push(row);
  }
  collectedGraphComponent.push(graphComponentmatrix);
}
