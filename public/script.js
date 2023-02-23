let toolscont = document.querySelector(".tools-container");
let optionscont = document.querySelector(".options-container");
let opflag = true;
let penciltoolcont = document.querySelector(".pencil-tool-container");
let erasertoolcont = document.querySelector(".eraser-tool-container");

let pencil = document.querySelector(".fa-pencil");
let eraser = document.querySelector(".fa-eraser");
let pencilflag = false;
let eraserflag = false;

let sticky = document.querySelector(".fa-sticky-note");
let images = document.querySelector(".fa-images");



//true-bar icon   ,false-cross icon
optionscont.addEventListener("click", (e) => {
  opflag = !opflag;

  if (opflag) barshow();
  else crossshow();
})

function barshow() {
  let icon = optionscont.children[0];
  icon.classList.remove("fa-times");
  icon.classList.add("fa-bars");
  toolscont.style.display = "flex";
}
function crossshow() {
  let icon = optionscont.children[0];
  icon.classList.remove("fa-bars");
  icon.classList.add("fa-times");
  toolscont.style.display = "none";

  penciltoolcont.style.display = "none";
  erasertoolcont.style.display = "none";
}

pencil.addEventListener("click", (e) => {
  pencilflag = !pencilflag;
  if (pencilflag) penciltoolcont.style.display = "block";
  else penciltoolcont.style.display = "none";
})
eraser.addEventListener("click", (e) => {
  eraserflag = !eraserflag;
  if (eraserflag) erasertoolcont.style.display = "flex";
  else erasertoolcont.style.display = "none";
})

images.addEventListener("click", (e) => {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let files = input.files[0];
    let url = URL.createObjectURL(files);

    let stickytemplate = `
        <div class="header-container">
        <div class="minimize"></div>
        <div class="remove"></div>
        </div>
        <div class="note-container">
        <img src='${url}'/> 
        </div>
        `;
    createsticky(stickytemplate);
  })
})


sticky.addEventListener("click", (e) => {
  let stickytemplate = `  
      <div class="header-container"> 
     <div class="minimize"></div> 
     <div class="remove"></div>
     </div>
     <div class="note-container">   
     <textarea ></textarea>
     </div>
     `;
  createsticky(stickytemplate);
});

function createsticky(stickytemplate) {
  let stickynote = document.createElement("div");
  stickynote.setAttribute("class", "stickycontainer");
  stickynote.innerHTML = stickytemplate;
  document.body.appendChild(stickynote);

  let minimize = stickynote.querySelector(".minimize");
  let remove = stickynote.querySelector(".remove");
  noteaction(minimize, remove, stickynote);

  stickynote.onmousedown = function (event) {
    draganddrop(stickynote, event);
  };

  stickynote.ondragstart = function () {
    return false;
  };
}

function noteaction(minimize, remove, stickynote) {
  remove.addEventListener("click", (e) => {
    stickynote.remove();
  })
  minimize.addEventListener("click", (e) => {
    let note = stickynote.querySelector(".note-container");
    let display = getComputedStyle(note).getPropertyValue("display");

    if (display === "none") note.style.display = "block";
    else note.style.display = "none";
  })
}

function draganddrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = 'absolute';
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    element.onmouseup = null;
  };
}

