import platform from '../img/Frame 1.png'
import background from '../img/wallpaper.png'
import china from '../img/china.png'
import platformSmall from '../img/Frame 2.png'
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

const gravity = 1 //kecepatan gravitasi

class Player {
    constructor() {
        this.speed = 7
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }

        this.width = 30
        this.height = 30
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

       if (this.position.y + this.height +
        this.velocity.y <= canvas.height)
        this.velocity.y += gravity
    }
}

  class Platform {
    constructor({x, y, image}) {
      this.position = {
        x,
        y
      }
      this.image = image
      this.width = image.width
      this.height = image.height
    }

    draw() {
      c.drawImage(this.image, this.position.x, this.position.y)
    }
  }

  class GenericObject {
    constructor({x, y, image}) {
      this.position = {
        x,
        y
      }
      this.image = image
      this.width = image.width
      this.height = image.height
    }

    draw() {
      c.drawImage(this.image, this.position.x, this.position.y)
    }
  }

function createImage(imageSrc) {
const image = new Image()
image.src = imageSrc
return image
}

let platformImage = createImage(platform)
let platformSmallImage = createImage(platformSmall)
let player = new Player()
let platforms = []

let genericObjects = []



 const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
  }   

let scrollOffset = 0

function init() {
platformImage =  new createImage(platform)
player = new Player()
platforms = [
  new Platform({
    x: -1, y: 490, image: platformImage
}), 
new Platform({x:1397 + platformImage.width - platformSmallImage.width, y: 300, image: createImage(platformSmall)}),
  new Platform({x:1397, y: 490, image: platformImage}),
  new Platform({x:2854, y: 490, image: platformImage})
]

genericObjects = [
    new GenericObject({
        x: -1,
        y: -1,
        image: createImage(background)
    }),
    new GenericObject({
      x: -1,
      y: 120,
      image: createImage(china)
  }),
  new GenericObject({
    x: 2400,
    y: 120,
    image: createImage(china)
})
]   

let scrollOffset = 0
console.log(scrollOffset)
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })

    platforms.forEach(platform => {
        platform.draw()
    })

    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if (
      (keys.left.pressed && player.position.x > 100) ||
      (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
    ) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })

            genericObjects.forEach((genericObject) => {
              genericObject.position.x -= player.speed * 0.66
            })
            
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed
            platforms.forEach(platform => {
                platform.position.x += player.speed
            })
            genericObjects.forEach((genericObject) => {
              genericObject.position.x += player.speed * 0.66
            })
            
        }
    }
    platforms.forEach(platform => {
      if ( player.position.y + player.height
        <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
          player.velocity.y = 0
        }
    })
// win condition
    if (scrollOffset > 3000) {
        console.log('You Win!')
    }
// lose condition
    if (player.position.y > canvas.height){
      init()
    }
    }
init()
animate()

addEventListener('keydown', ({ keyCode }) => {
 //console.log(keyCode)
switch (keyCode) {
    case 37:
        console.log('left')
        keys.left.pressed = true
        break

    case 39:
        console.log('right')
        keys.right.pressed = true
        break
        
    case 38:
        console.log('up')
        player.velocity.y -= 20
        break    
    }
  
  })

  addEventListener('keyup', ({ keyCode }) => {
    //console.log(keyCode)
   switch (keyCode) {
       case 37:
           console.log('left')
           keys.left.pressed = false
           break

       case 39:
           console.log('right')
           keys.right.pressed = false
           break
           
           case 38:
            console.log('up')
            break
           
   }
})