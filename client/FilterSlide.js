class FilterSlide {
    constructor(imageSrc) {
        this.imageSrc = imageSrc
        this.screen = new Screen(window.innerWidth/2)
    }
    draw() {
      this.context.clearRect(0,0,this.w,this.h)
      this.context.drawImage(this.image,0,0,this.w,this.h)
      this.context.save()
      this.context.translate(this.screen.x,0)
      this.filters.forEach((filter)=>{
          filter.draw(this.context,this.w,this.h)
      })
      this.context.restore()
      this.img.src = this.canvas.toDataURL()
    }
    animateWhileSliding() {
        const interval = setInterval(()=>{
            this.screen.translate()
            this.draw()
            if(this.screen.stopTranslation()) {
                clearInterval(interval)
            }
        },100)
    }
    apply(colors) {
        this.img = document.createElement('img')
        document.body.appendChild(this.img)
        this.img.style.position = 'absolute'
        this.w = window.innerWidth/2
        this.h = window.innerHeight/2
        this.screen.setTotalX(-this.w*(colors.length-1))
        this.img.style.left = this.w*0.5
        this.image  = new Image()
        this.image.src = this.imageSrc
        this.filters = colors.map((color,index)=>(new Filter(index*this.w,color)))
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.w
        this.canvas.height = this.h
        this.context = this.canvas.getContext('2d')
        this.image.onload = () => {
            this.draw()
        }
        window.onkeydown = (event)=>{
            var dir = 0
            if(event.keyCode == 37) {
                dir = -1
            }
            else if(event.keyCode == 39) {
                dir = 1
            }
            if(Math.abs(dir) == 1) {
                this.screen.startTranslation(dir)
                this.animateWhileSliding()
            }
        }
    }
}
class Screen {
    constructor(maxDiff) {
        this.x = 0
        this.initX = this.x
        this.maxDiff = maxDiff
        this.dir = 0
        this.totalX = -10*window.innerWidth
    }
    setTotalX(totalX) {
        this.totalX = totalX
    }
    translate() {
        if((this.dir == -1 && this.x >= 0) || (this.dir == 1 && this.x <= this.totalX)) {
           this.dir = 0
        }
        this.x -= ((this.maxDiff/5)*this.dir)
        if(Math.abs(this.x - this.initX) >= this.maxDiff) {
            this.initX = this.x
            this.dir = 0
        }
    }
    startTranslation(dir) {
        this.dir = dir
    }
    stopTranslation() {
        return this.dir == 0
    }
}
class Filter {
    constructor(x,color) {
        this.x = x
        this.color = color
    }
    draw(context,w,h) {
        context.save()
        context.translate(this.x,0)
        context.fillStyle = this.color
        context.globalAlpha = 0.6
        context.fillRect(0,0,w,h)
        context.restore()
    }
}
