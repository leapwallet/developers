const G = 9.8

export const frogJump = (image: HTMLImageElement) => {
  // create a new image element with the same src and x,y coords as the clicked image
  const newImage = new window.Image(image.width, image.height)
  newImage.src = image.src
  newImage.style.position = 'fixed'
  newImage.style.top = `${image.offsetTop}px`
  newImage.style.left = `${image.offsetLeft}px`
  // append the new image to the body
  document.body.appendChild(newImage)
  // range - image needs to go out of the screen
  const range =
    (window.innerWidth - image.offsetLeft - image.width / 2 + 50) / 2
  // angle of projection
  const thita = Math.random() * 90
  // convert to radians
  let thitaRad = (thita * Math.PI) / 180
  // calculate initial velocity depending on the angle of projection and range
  const u = Math.sqrt((G * range) / Math.sin(2 * thitaRad))
  // calculate time of flight
  const duration =
    (2 * u * Math.sin(thitaRad)) / G +
    Math.sqrt(
      (2 * (window.innerHeight - image.offsetTop - image.height / 2)) / G
    )
  // random direction
  const direction = Math.random() > 0.5 ? 1 : -1
  // change the angle of projection depending on the direction
  thitaRad = direction === 1 ? thitaRad : Math.PI - thitaRad
  // generate coordinates for the trajectory
  const coords: { x: number; y: number }[] = []
  for (let i = 0; i < duration; i += 1 / 120) {
    const x = u * Math.cos(thitaRad) * i
    const y =
      x * Math.tan(thitaRad) -
      (G * x * x) / (2 * u * u * Math.cos(thitaRad) * Math.cos(thitaRad))
    coords.push({ x, y: -y })
  }
  const animationDuration = duration * 50
  // animate the new image
  image.animate(
    coords.map(({ x, y }) => {
      return {
        transform: `translate(${x}px, ${y}px)`
      }
    }),
    {
      duration: animationDuration, // in ms
      easing: 'ease-in-out'
    }
  )
  // remove the new image from the body after the animation is complete
  setTimeout(() => {
    document.body.removeChild(newImage)
  }, animationDuration)
}
