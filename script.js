const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext('2d')
canvas.height = 600
canvas.width = 800
let background = new Image()
background.src = '8bit-vremya-sutki-polden-more.jpg'
let gameLoop
let player

let borders = []

// кнопки
let one = false
let two = false
let three = false
let four = false
let space = false
let left = false
let right = false
let down = false


class Border{
   constructor(x,y,width,height,type){
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.type = type
   }
   draw = () => {
      if(this.type === 1){
         ctx.fillStyle = 'blue'
      }else if(this.type === 2){
         ctx.fillStyle = 'red'
      }
      ctx.fillRect(this.x,this.y, this.width, this.height)
   }
}
class Player{
   constructor(x,y){
      this.x = x
      this.y = y
      this.xSpeed = 0
      this.ySpeed = 0
      this.friction = 0.6
      this.maxSpeed = 10
      this.width = 30
      this.height = 30
      this.active = true
   }
   step = ()=>{
      if(this.active){
         if(!left && !right || left && right){
            this.xSpeed *= this.friction
         }else if(right){
            this.xSpeed ++
         }else if(left){
            this.xSpeed --
         }
         if(space){
            this.ySpeed -=15
         }
         this.ySpeed +=5
         if(this.xSpeed > this.maxSpeed){
            this.xSpeed = this.maxSpeed
         }else if(this.xSpeed < -this.maxSpeed){
            this.xSpeed = -this.maxSpeed
         }
         if(this.ySpeed > this.maxSpeed){
            this.ySpeed = this.maxSpeed
         }else if(this.ySpeed < -this.maxSpeed){
            this.ySpeed = -this.maxSpeed
         }
         //горизонталь 
         if(this.xSpeed > 0){
            this.xSpeed = Math.floor(this.xSpeed) //округление к меньшему
         }else{
            this.xSpeed = Math.ceil(this.xSpeed) // округление к большему
         }
         //вертикаль
         if(this.ySpeed > 0){
            this.ySpeed = Math.floor(this.ySpeed)
         }else{
            this.ySpeed = Math.ceil(this.ySpeed)
         }
         let horizontalRect = {
            x: this.x + this.xSpeed,
            y: this.y,
            width: this.width,
            height: this.height
         }
         let verticalRect = {
            x: this.x,
            y: this.y + this.ySpeed,
            width: this.width,
            height: this.height
         }
         // check intersections
         for(let i = 0; i < borders.length; i ++){
            let borderRect = {
               x: borders[i].x,
               y: borders[i].y,
               width: borders[i].width,
               height: borders[i].height
            }
            if(checkIntersection(horizontalRect, borderRect)){
               while(checkIntersection(horizontalRect,borderRect)){
                  horizontalRect.x -= Math.sign(this.xSpeed)  
               }
               this.x = horizontalRect.x
               this.xSpeed = 0
            }
            if(checkIntersection(verticalRect, borderRect)){
               while(checkIntersection(verticalRect,borderRect)){
                 verticalRect.y -= Math.sign(this.ySpeed)  
               }
               this.y = verticalRect.y
               this.ySpeed = 0
            }
         }
         this.x += this.xSpeed
         this.y += this.ySpeed
      }
   }
   draw = ()=>{
      ctx.fillStyle = 'green'
      ctx.fillRect(this.x,this.y,this.width,this.height)
   }
}
for(let i = 0; i < 6; i++){
   borders.push(new Border(0 + 100* i, 500, 100 ,100,1))
}
for(let i = 0; i < 3; i ++){
   borders.push(new Border(550, 250 + 100 * i, 50 ,20,2))
}
console.log(borders)
player = new Player(100,400)

gameLoop = setInterval(step, 1000/60)

function step(){
   player.step()
   draw()
}
function draw(){
   player.draw()
   ctx.fillRect(0,0,800,600)
   ctx.drawImage(background,0,0,800,600)
   player.draw()
   for(let i = 0; i < borders.length; i ++){
      borders[i].draw()
   }
}

setupInputs()

function setupInputs(){
   window.addEventListener('keydown',(e)=>{
      obj = {
         '1': oneFT,
         '2': twoFT,
         '3': threeFT,
         '4': fourFT,
         'ArrowLeft': leftFT,
         'ArrowRight': rightFT,
         ' ': spaceFT,
      }[e.key]
      obj?.(e.key)
   })
   window.addEventListener('keyup',(e)=>{
      obj = {
         '1': oneFF,
         '2': twoFF,
         '3': threeFF,
         '4': fourFF,
         'ArrowLeft': leftFF,
         'ArrowRight': rightFF,
         ' ': spaceFF,
      }[e.key]
      obj?.(e.key)
   })
}

function oneFT(){
   one = true
}
function twoFT(){
   two = true
}
function threeFT(){
   three = true
}
function fourFT(){
   four = true
}
function leftFT(){
   left = true
}
function rightFT(){
   right = true
}
function spaceFT(){
   space = true
}

function oneFF(){
   one = false
}
function twoFF(){
   two = false
}
function threeFF(){
   three = false 
}
function fourFF(){
   four = false
}
function leftFF(){
   left = false
}
function rightFF(){
   right = false
}
function spaceFF(){
   space = false
}

function checkIntersection(r1,r2){
   if(r1.x > r2.x + r2.width){
      return false
   }else if(r1.x + r1.width <= r2.x){
      return false
   }else if(r1.y >= r2.y + r2.height){
      return false
   }else if(r1.y + r1.height <= r2.y){
      return false
   }else{
      return true
   }
}