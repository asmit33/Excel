let activeSheetColor = "#ced6e0";

let sheetsFolderCont = document.querySelector(".sheets-folder-cont");
let addSheetBtn = document.querySelector(".sheet-add-icon");
addSheetBtn.addEventListener("click", (e) => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");

  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  sheet.setAttribute("id", allSheetFolders.length);

  sheet.innerHTML = `<div class="sheet-content">Sheet ${
    allSheetFolders.length + 1
  }</div>`;

  sheetsFolderCont.appendChild(sheet);
  sheet.scrollIntoView();

  createSheetDB();
  createGraphComponentMatrix();
  handleSheetActiveness(sheet);
  handleSheetRemoval(sheet);
  sheet.click();
});

function handleSheetRemoval(sheet) {
  sheet.addEventListener("mousedown", (e) => {
    // if(e.button===0) ->left click   if(e.button===1)-> scroll  if(e.button===2)->right click
    // we have to add remove for right click
    if (e.button !== 2) return;

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    if (allSheetFolders.length === 1) {
      alert("You need to have atleast 1 Sheet");
      return;
    }
    let response = confirm(
      "Your sheet will be deleted permanently, are you sure?"
    );
    if (response === false) return;

    let sheetidx = Number(sheet.getAttribute("id"));
    //DB
    collectedSheetDB.splice(sheetidx, 1);
    collectedGraphComponent.splice(sheetidx, 1);

    // UI
    handleSheetUIRemoval(sheet);
    //by default active sheet 1;
    sheetDB = collectedSheetDB[0];
    graphComponentmatrix = collectedGraphComponent[0];
    handleSheetProperties();
  });
}
function handleSheetUIRemoval(sheet) {
  sheet.remove();
  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].setAttribute("id", i);
    let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
    sheetContent.innerText = `Sheet ${i + 1}`;
    allSheetFolders[i].style.backgroundColor = "transparent";
  }
  allSheetFolders[0].style.backgroundColor = "#ced6e0";
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
  sheet.style.backgroundColor = activeSheetColor;
}

function handleSheetActiveness(sheet) {
  sheet.addEventListener("click", (e) => {
    let sheetidx = Number(sheet.getAttribute("id"));
    handleSheetDB(sheetidx);
    handleSheetProperties();
    handleSheetUI(sheet);
  });
}

function handleSheetDB(sheetidx) {
  sheetDB = collectedSheetDB[sheetidx];
  graphComponentmatrix = collectedGraphComponent[sheetidx];
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
