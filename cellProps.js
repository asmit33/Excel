//storage
let sheetDB = [];

for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < col; j++) {
    let cellProps = {
      bold: false,
      italic: false,
      underline: false,
      alignment: "left",
      fontFamily: "monospace",
      fontSize: "14",
      fontColor: "#000000",
      bgColor: "#000000",
    };
    sheetRow.push(cellProps);
  }
  sheetDB.push(sheetRow);
}

//Selector for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontFamily = document.querySelector(".font-family-prop");
let fontSize = document.querySelector(".font-size-prop");
let fontColor = document.querySelector(".font-color-prop");
let bgColor = document.querySelector(".bgcolor-prop");
let alignment = document.querySelector(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";
//Application of two-way binding
//Attach property listener
bold.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activecell(address);

  //modification
  cellProp.bold = !cellProp.bold; //data change
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //UI change(1)
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp;
});
function activecell(address) {
  let [rid, cid] = DecodeRidCidFromAddress(address);
  //Access cell & storage object
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp];
}
function DecodeRidCidFromAddress(address) {
  let rid = Number(address.slice(1) - 1);
  let cid = Number(address.charCodeAt(0)) - 65;
  return [rid, cid];
}
