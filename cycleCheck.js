let graphComponentmatrix = [];

for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < col; j++) {
    // why Array -> because there will be more than 1 children to store
    row.push([]);
  }
  graphComponentmatrix.push(row);
}

function isGraphCyclic(graphComponentmatrix) {
  //    dependency->visited,dfsVisited(2D array)

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

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      if (visited[i][j] == false) {
        let response = dfsCycleDetection(
          graphComponentmatrix,
          i,
          j,
          visited,
          dfsVisited
        );
        if (response === true) return [i, j];
      }
    }
  }
  return null;
}

// start->visted(true),dfsVisited(true)
//end-> dfsVisited(false)
//if visted[i][j]->already explored path ,so go back
//cycle detection condition-> if(vis[i][j]==true && dfsVis[i][j]==true) ->cycle detected
// return true/false

function dfsCycleDetection(
  graphComponentmatrix,
  srcRow,
  srcCol,
  visited,
  dfsVisited
) {
  visited[srcRow][srcCol] = true;
  dfsVisited[srcRow][srcCol] = true;

  for (
    let children = 0;
    children < graphComponentmatrix[srcRow][srcCol].length;
    children++
  ) {
    let [nbrRow, nbrCol] = graphComponentmatrix[srcRow][srcCol][children];
    if (visited[nbrRow][nbrCol] === false) {
      let response = dfsCycleDetection(
        graphComponentmatrix,
        nbrRow,
        nbrCol,
        visited,
        dfsVisited
      );
      if (response === true) {
        return true;
      }
    } else if (
      visited[nbrRow][nbrCol] === true &&
      dfsVisited[nbrRow][nbrCol] === true
    ) {
      return true;
    }
  }

  dfsVisited[srcRow][srcCol] = false;
  return false;
}
