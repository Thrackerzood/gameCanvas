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
class Start {
   static canvas = document.createElement("canvas")
   static start = ()=>{
      
      document.querySelector('.button-start').remove()
      this.canvas.height = 600
      this.canvas.width = 800
      this.context = this.canvas.getContext('2d')
      document.body.insertBefore(this.canvas, document.body.childNodes[0])
      timerStart()
  } 
}
function timerStart(){
  if(iteration == false){
      timerStop =  setInterval(()=>{
      timer += 1
      counters = true
      console.log(timer)
  }, 1000)
  }

}
function escape(){
   if(counters ==false){
      counters = true
      timerStart()
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