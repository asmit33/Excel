function colorPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

async function isGraphCyclicTracePath(graphComponentmatrix, cycleResponse) {
  let [srcr, srcc] = cycleResponse;
  let visited = [];
  let dfsVisited = [];

  for (let i = 0; i < rows; i++) {
    let visitedRow = [];
    let dfsVisitedRow = [];
    for (let j = 0; j < col; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }

  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < col; j++) {
  //       if (visited[i][j] == false) {
  //         let response = dfsCycleDetectionTracePath(
  //           graphComponentmatrix,
  //           i,
  //           j,
  //           visited,
  //           dfsVisited
  //         );
  //         if (response === true) return true;
  //       }
  //     }
  //   }
  let response = await dfsCycleDetectionTracePath(
    graphComponentmatrix,
    srcr,
    srcc,
    visited,
    dfsVisited
  );
  if (response === true) return Promise.resolve(true);

  return Promise.resolve(false);
}

// Coloring cell for tracking
async function dfsCycleDetectionTracePath(
  graphComponentmatrix,
  srcRow,
  srcCol,
  visited,
  dfsVisited
) {
  visited[srcRow][srcCol] = true;
  dfsVisited[srcRow][srcCol] = true;

  let cell = document.querySelector(`.cell[rid="${srcRow}"][cid="${srcCol}"]`);
  cell.style.backgroundColor = "lightblue";
  await colorPromise(); //1 sec

  for (
    let children = 0;
    children < graphComponentmatrix[srcRow][srcCol].length;
    children++
  ) {
    let [nbrRow, nbrCol] = graphComponentmatrix[srcRow][srcCol][children];
    if (visited[nbrRow][nbrCol] === false) {
      let response = await dfsCycleDetectionTracePath(
        graphComponentmatrix,
        nbrRow,
        nbrCol,
        visited,
        dfsVisited
      );
      if (response === true) {
        cell.style.backgroundColor = "transparent";
        await colorPromise();
        return Promise.resolve(true);
      }
    } else if (
      visited[nbrRow][nbrCol] === true &&
      dfsVisited[nbrRow][nbrCol] === true
    ) {
      let cyclicCell = document.querySelector(
        `.cell[rid="${nbrRow}"][cid="${nbrCol}"]`
      );

      cyclicCell.style.backgroundColor = "lightsalmon";
      await colorPromise();

      cyclicCell.style.backgroundColor = "transparent";
      await colorPromise();
      cell.style.backgroundColor = "transparent";
      await colorPromise();

      return Promise.resolve(true);
    }
  }

  dfsVisited[srcRow][srcCol] = false;
  return Promise.resolve(false);
}
