let canvas=document.querySelector("canvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

let pencilcolor=document.querySelectorAll(".pencil-color");
let pencilwidth=document.querySelector(".pencil-width");
let eraserwidth=document.querySelector(".eraser-width");
let download=document.querySelector(".fa-download");

let pencolor="red";
let erasercolor="white";
let penwidth=pencilwidth.value;
let ewidth=eraserwidth.value;

let mousedown=false;

tool=canvas.getContext("2d");

tool.strokeStyle=pencolor;
tool.lineWidth=penwidth;

canvas.addEventListener("mousedown",(e)=>{
    mousedown=true;
    let data={
        x:e.clientX,
        y:e.clientY
    }
    socket.emit("beginpath",data);
})
canvas.addEventListener("mousemove",(e)=>{
if(mousedown){
    let data={
        x:e.clientX,
        y:e.clientY,
        color:eraserflag?erasercolor:pencolor,
        width:eraserflag?ewidth:penwidth
    }
    socket.emit("drawstroke",data);
} 
})
canvas.addEventListener("mouseup",(e)=>{
   mousedown=false;
})

function beginpath(strokeob){
    tool.beginPath();
    tool.moveTo(strokeob.x,strokeob.y);
}
function drawstroke(strokeob){
        tool.strokeStyle=strokeob.color;
        tool.lineWidth=strokeob.width;
        tool.lineTo(strokeob.x,strokeob.y);
        tool.stroke();
}


pencilcolor.forEach((colorElem)=>{
 colorElem.addEventListener("click",(e)=>{
     let color=colorElem.classList[0];
     pencolor=color;
     tool.strokeStyle=pencolor;
 })
})

pencilwidth.addEventListener("change",(e)=>{
penwidth=pencilwidth.value;
tool.lineWidth=penwidth;
})
eraserwidth.addEventListener("change",(e)=>{
ewidth=eraserwidth.value;
tool.lineWidth=ewidth;
})

eraser.addEventListener("click",(e)=>{
    if(eraserflag){
     tool.strokeStyle=erasercolor;
     tool.lineWidth=ewidth;
    }else{
    tool.strokeStyle=pencolor;
    tool.lineWidth=penwidth;
    }
})

download.addEventListener("click",(e)=>{
    let url=canvas.toDataURL();
    let a=document.createElement("a");
    a.href=url;
    a.download="board.jpg";
    a.click();
})

socket.on("beginpath",(data)=>{
    beginpath(data);
})
socket.on("drawstroke",(data)=>{
    drawstroke(data);
})