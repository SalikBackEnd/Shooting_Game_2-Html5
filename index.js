const canvas=document.querySelector("canvas");
canvas.width=innerWidth
canvas.height=innerHeight

const c=canvas.getContext("2d")

const pattern=[ ["5-red","5-blue"],
                ["5-red","5-blue"],
                ["5-red","5-blue"]]

                const x=canvas.width/2;
                const y=canvas.height-30;

//classes Region
class Bubble{
    constructor(x,y,radius,color,velocity){
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity=velocity
    }
    draw(){
        c.beginPath()
        
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
      
        c.fillStyle=this.color
        c.fill()
    }
    update(){
        this.draw()
        this.x=this.x+this.velocity.x
        this.y=this.y+this.velocity.y
    }
}
class Shooter{
    constructor(x,y,radius,color,angle){
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.angle=angle

    }
    draw(){
        

        // save the untranslated c
        c.save();
        c.beginPath();
        // move the rotation point to the center of the player
        c.translate(this.x, this.y);
        c.rotate(this.angle);

        c.fillStyle = "white";
        // note that coordinates are translated, 
        // so 0 is player.x and -10 is player.y - 10
        c.fillRect(0, - 10, 50, 20);
        // restore the c to its untranslated state
        c.restore();
        c.beginPath()
    
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,true)
        
        c.fillStyle = "white";
   
        c.fill();
    }
}
//End classes Region

let shootedbubble=[]
let tobeshoot=[]
//Init
let shooter=new Shooter(innerWidth/2+30,innerHeight-30,30,"white",0)
function Init(){
    shooter.draw()
}

let mousemoveX
let mousemoveY

addEventListener("mousemove",(event)=>{
    mousemoveX=event.clientX
    mousemoveY=event.clientY
    
  //  console.log("X: "+mousemoveX+", Y: "+mousemoveY)
})
let color=`hsl(${Math.random()*360},50%,50%)`
let nextBubble=new Bubble(x,y,15,color,null)

addEventListener("click",(event)=>{
    const angle=Math.atan2(event.clientY-y,event.clientX-x)
    const velocity={
        x:Math.cos(angle)*7,
        y:Math.sin(angle)*7
    }
    
    shootedbubble.push(new Bubble(x,y,15,color,velocity))
    color=`hsl(${Math.random()*360},50%,50%)`
    nextBubble=new Bubble(x,y,15,color,null)
    console.log(shootedbubble)
})
var animateId
function animate(){
        setTimeout(()=>{
            animationId=requestAnimationFrame(animate)
            
        c.fillStyle='rgba(0,0,0,0.1)'
        c.fillRect(0,0,canvas.width,canvas.height)
       
        const angle=Math.atan2(mousemoveY-y,mousemoveX-x)
        shooter=new Shooter(x,y,30,"white",angle)
        shooter.draw()
        
        nextBubble.draw()
   
        shootedbubble.forEach((bubble,index)=>{
            bubble.update()
            if(bubble.x<0||bubble.x>canvas.width||bubble.y<0){
                shootedbubble.splice(index,1)
            }
        })
        },0)
}


animate()
 