class FilterSlide {
    constructor(imageSrc,filters) {
        this.imageSrc = imageSrc
        this.filters = filters
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
            context.restore()
        }
    }
}
