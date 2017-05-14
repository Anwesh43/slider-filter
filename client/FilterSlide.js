class FilterSlide {
    constructor(imageSrc) {
        this.imageSrc = imageSrc
        this.screen = new Screen()
    }
    draw() {
      this.context.clearRect(0,0,this.w,this.h)
      this.context.drawImage(this.image,0,0,this.w,this.h)
      this.context.save()
      this.context.translate(this.screen.x,0)
      this.filtes.forEach((filter)=>{
          filter.draw(this.context)
      })
      this.context.restore()
    }
    apply(colors) {
        this.w = window.innerWidth/2
        this.h = window.innerHeight/2
        this.image  = new Image()
        image.src = this.imageSrc
        this.filters = colors.map((color,index)=>(new Filter(index*w,color)))
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.w
        this.canvas.height = this.h
        this.context = this.canvas.getContext('2d')
        this.image.onload = () => {
            this.draw()
        }
    }
}
class Screen {
    constructor() {
        this.x = 0
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
        context.opacity = 0.5
        context.fillRect(0,0,w,h)
        context.restore()
    }
}
