import './style.css'

const app = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;
const canvas = document.createElement("canvas") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
const angleSlider = document.getElementById("angle") as HTMLInputElement;
const levelSlider = document.getElementById("max-level") as HTMLInputElement;

const color = "#FFF"

let angle = Math.PI * 0.5;

let length = window.innerHeight/3;
let pos = [window.innerWidth/2, window.innerHeight];
let level = 0;

let redraw = true;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;




function drawBranch(pos:number[], angle:number, length: number, level:number){
  const deltaAngle = Math.PI * Number(angleSlider.value);
  const shrink = 0.7;
  const maxLevel = Number(levelSlider.value);

  let delta = [ Number((length * Math.cos( angle )).toFixed(2)), Number((length * Math.sin( angle )).toFixed(2)) ];
  let next = [ pos[0] + delta[0], pos[1] - delta[1] ];

  drawLine(pos, next);
  let newAngle = angle + deltaAngle;
  let newLength = Number((length * shrink).toFixed(2));
  let teta = angle - deltaAngle;
  let newLevel = level+1;
  console.log(newLevel)
  if(level < maxLevel){
     drawBranch(next, newAngle, newLength, newLevel)
     drawBranch(next, teta, newLength, newLevel)
  }
  return
}


function drawLine(from: number[], to: number[]){
  ctx.strokeStyle = color
  ctx.beginPath();
  ctx.moveTo( from[0], from[1] )
  ctx.lineTo( to[0], to[1] )
  ctx.stroke();
}


window.onresize = ()=>{
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  ctx.clearRect(0,0, window.innerWidth*2, window.innerHeight)
  ctx.fillStyle = "#000"
  ctx.fillRect(0,0, window.innerWidth, window.innerHeight)
  length = window.innerHeight/3;
  pos = [window.innerWidth/2, window.innerHeight]
  redraw = true;
}

requestAnimationFrame(animate)
function animate(){
  if(redraw){
    ctx.clearRect(0,0, window.innerWidth*2, window.innerHeight)
    ctx.fillStyle = "#000"
    ctx.fillRect(0,0, window.innerWidth, window.innerHeight)
    drawBranch(pos, angle, length, level)
    redraw = false;
  }
  requestAnimationFrame(animate)
}

angleSlider.oninput = ()=>{
  redraw = true;
}
levelSlider.onchange = ()=>{
  redraw = true;
}

app.append(canvas)
