window.addEventListener('keydown',(e)=>{
   obj = {
      'Enter': start, 
   }[e.key]
   obj?.(e.key)  
   if(canvas == false){
      obj = {
         'Escape': escape,
         '1': one,
         '2': two,
         '3': three,
         '4': four,
         'ArrowLeft': left,
         'ArrowRight': right,
      }[e.key]
      obj?.(e.key)  
   }
})
let canvas = true
let iteration = false
let timer = 0
let mm = 0
let ss = 0
class Start {
   static canvas = document.createElement("canvas")
   static start = () => {
      document.querySelector('.button-start').remove()
      document.querySelector('.input-name').remove()
      this.canvas.height = 600
      this.canvas.width = 800
      this.ctx = this.canvas.getContext('2d')
      document.body.insertBefore(this.canvas, document.body.childNodes[0])
      this.timerStart()
  }
  static timerStart = () =>{
     timerStart(this.ctx)
  }
}
function timerStart(ctx){
  if(iteration == false){
         timerStop =  setInterval(()=>{
         timer += 1
         counters = true
         fillTimer(ctx)
      }, 1000)
  }
}
function fillTimer(ctx){
   if(timer >= 60){
      mm +=1
      ss = 0
      timer = 0
      ctx.clearRect(770, 10, 100, 20)
      ctx.fillText(mm + ' : ' + ss, 770, 20)
   }else{
      ss += 1
      ctx.clearRect(770, 10, 100, 20)
      ctx.fillText(mm + ' : ' + ss, 770, 20)
   }
}
function escape(){
   if(counters == false){
      counters = true
      Start.timerStart()
      console.log('game start')
   }else{
      counters = false
      clearInterval(timerStop)
      console.log('game stop') 
   }
}
document.querySelector('.button-start')
.addEventListener('click', start)

function start(){
   if(canvas == true){
    canvas = false
    Start.start()
   }
   return
}
function one(e){
   console.log(e)
}
function two(e){
   console.log(e)
}
function three(e){
   console.log(e)
}
function four(e){
   console.log(e)
}
function left(e){
   console.log(e)
}
function right(e){
   console.log(e)
}