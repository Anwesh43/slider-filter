class FilterSlide {
    constructor(imageSrc,filters) {
        this.imageSrc = imageSrc
        this.filters = filters
        this.screen = new Screen()
    }
    create() {
        const w = window.innerWidth/2, h = window.innerHeight/2
        const image  = new Image()
        image.src = this.imageSrc
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const context = canvas.getContext('2d')
        image.onload = () => {
            context.clearRect(0,0,w,h)
            context.drawImage(image,0,0,w,h)
            context.save()
            context.translate(this.screen.x,0)
            context.restore()
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
