for (let i = 0; i < rows; i++) {
  for (let j = 0; j < col; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activeCell, cellProp] = getCellAndCellProp(address);

      let enteredData = activeCell.innerText;

      if (enteredData === cellProp.value) return;

      cellProp.value = enteredData;
      //if data modifies remove P-C relation ,formula empty,update children with new value
      removeChildFromParent(cellProp.formula);
      cellProp.formula = "";
      updateChildrenCells(address);
    });
  }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
  let inputFormula = formulaBar.value;
  //condition if key is enter and formula bar is not empty
  if (e.key === "Enter" && inputFormula) {
    // if change in formula ,break old parent-child relation,evaluate new formula, add new P-C relation
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    if (inputFormula !== cellProp.formula) {
      removeChildFromParent(cellProp.formula);
    }

    let evaluatedValue = evaluateFormula(inputFormula);
    //to update UI and cellProp in DB
    setCellUIAndCellProp(evaluatedValue, inputFormula, address);
    addChildToParent(inputFormula);

    console.log(sheetDB);
    updateChildrenCells(address);
  }
});

function addChildToParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciivalue = encodedFormula[i].charCodeAt(0);
    if (asciivalue >= 65 && asciivalue <= 90) {
      let [ParentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
      parentCellProp.children.push(childAddress);
    }
  }
}

function removeChildFromParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciivalue = encodedFormula[i].charCodeAt(0);
    if (asciivalue >= 65 && asciivalue <= 90) {
      let [ParentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);

      let idx = parentCellProp.children.indexOf(childAddress);
      parentCellProp.children.splice(idx, 1);
    }
  }
}

function updateChildrenCells(parentAddress) {
  let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
  let children = parentCellProp.children;

  for (let i = 0; i < children.length; i++) {
    let childAddress = children[i];
    let [childCell, childCellProp] = getCellAndCellProp(childAddress);
    let childFormula = childCellProp.formula;
    let evaluatedValue = evaluateFormula(childFormula);
    setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);
    updateChildrenCells(childAddress);
  }
}

function evaluateFormula(formula) {
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciivalue = encodedFormula[i].charCodeAt(0);
    if (asciivalue >= 65 && asciivalue <= 90) {
      let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }
  let decodedFormula = encodedFormula.join(" ");

  return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula, address) {
  let [cell, cellProp] = getCellAndCellProp(address);

  //UI update
  cell.innerText = evaluatedValue;

  //DB update
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
}
