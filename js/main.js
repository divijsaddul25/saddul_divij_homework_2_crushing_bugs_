//variables are always first
const theButtons = document.querySelectorAll("#buttonHolder img");
const puzzleBoard = document.querySelector(".puzzle-board");
const puzzlePieces = document.querySelectorAll(".puzzle-pieces img");
const puzzlePiecesDiv = document.querySelector(".puzzle-pieces")
const dropZones = document.querySelectorAll(".drop-zone"); 


let draggedPieces;

function changeBGImage() {
    
    puzzleBoard.style.backgroundImage = `url(images/backGround${this.id}.jpg)`

    // bug fix 2  :
   
    dropZones.forEach((zone) => {
        if (zone.firstChild) {
          const piece = zone.firstChild;
          puzzlePiecesDiv.appendChild(piece);
          piece.classList.remove("dropped");
        }
      });
    
   
      for (let i = 0; i < puzzlePieces.length; i++) {
        const piece = puzzlePieces[i];
        const originalPieceImage = piece.getAttribute('src');
        const newPieceImage = originalPieceImage.replace(/\d/g, this.id);
        piece.src = newPieceImage;
    }
}

function handleDragOver(e) {
    e.preventDefault();
    console.log("draded over me");
}

function handleStartDrag() {
    console.log("Started dragging this piece:", this)
    draggedPieces = this
}

function handleDrop (e) {
    e.preventDefault();
    console.log("dorpped something on me");
    
    if(this.children.length >= 1){
        return;
      }
    this.appendChild(draggedPieces);
}

function resetPuzzle() {
    
    puzzlePieces.forEach((piece) => {
      piece.classList.remove("dropped");
      piece.parentNode.removeChild(piece);
      puzzlePiecesDiv.appendChild(piece);
    });
  }

theButtons.forEach(button => button.addEventListener("click", changeBGImage)); 

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));

dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));

//   reset button  fixed
const resetButton = document.getElementById("resetBut");
resetButton.addEventListener("click", resetPuzzle);