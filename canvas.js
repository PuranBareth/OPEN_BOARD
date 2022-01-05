let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem =document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

let penColor = "red";
let eraserColor = "white";
let pencilWidth =pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

let undoRedotracker = []; // Data 
let track = 0; // reprsent  action  from tracker array


let mouseDown = false;


// canvas Api//

let tool  = canvas.getContext("2d"); // API to perform drwaing


/* tool.beginPath(); // new graphic path(line)
tool.moveTo(10,10); // start of a  graphics
tool.lineTo(100,150); // end point of graphics
tool.stroke();  // fills the color in graphics */

tool.strokeStyle = pencilColor;
tool.lineWidth = pencilWidth; 

canvas.addEventListener("mousedown", (e)=>{
    mouseDown = true;
    beginPath({
        x:e.clientX,
        y: e.clientY

    })
    
})
canvas.addEventListener("mousemove", (e)=>{
    if(mouseDown) drawStroke({
       x: e.clientX,
       y: e.clientY,
       color:eraserFlag ? eraserColor : penColor,
       width: eraserFlag ? eraserWidth : pencilWidth

    })
})
canvas.addEventListener("mouseup", (e)=>{
    mouseDown= false;
    let url = canvas.toDataURL();
    undoRedotracker.push(url);
    track = undoRedotracker.length-1;
})
undo.addEventListener("click", (e)=>{
     if(track > 0) track--;
     //  track Action
     let trackObj = {
        trackValue:track,
        undoRedotracker
    }
     undoRedoCanvas(trackObj);

})

redo.addEventListener("click", (e)=>{
    if(track <undoRedotracker.length-1) track++;
         // track Action
    let trackObj = {
        trackValue:track,
        undoRedotracker
    }
    undoRedoCanvas(trackObj);
})
 
function undoRedoCanvas(trackObj){
    track =trackObj.trackValue;
    undoRedotracker = trackObj.undoRedotracker;
    let url = undoRedotracker[track];
    let img = new Image(); // new Image refrence element
    img.src =url;
    img.onload = (e) =>{
        tool.drawImage(img, 0,0, canvas.width, canvas.height);
    }
}

function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}
function drawStroke(strokeObj){
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}
pencilColor.forEach((colorElem) =>{
    colorElem.addEventListener("click", (e)=>{
        let color = colorElem.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
    })
})

pencilWidthElem.addEventListener("change", (e)=>{
    pencilWidth = pencilWidthElem.value;
    tool.lineWidth= pencilWidth;
})
eraserWidthElem.addEventListener("change", (e)=>{
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth= eraserWidth;
})

eraser.addEventListener("click", (e)=>{
    if(eraserFlag){
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    }else{
        tool.strokeStyle = penColor;
        tool.lineWidth = pencilWidth;
    }
})

download.addEventListener("click", (e) =>{
    let url = canvas.toDataURL();
    let a =  document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})

