const Express = require('express')
const RaspiCam = require('raspicam')

const app = Express()
const port = 3000

app.get('/', (req, res) => {
  const path = Date.now().toString()
  const cam = new RaspiCam({
    mode: 'photo',
    output: `img/${path}.jpg`,
    rot: 180
  })
  cam.start()
  cam.on('read', (err, timestamp, filename) => {
    if (filename[filename.length - 1] !== '~') {
      cam.stop()
      res.json({filename})
    }
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

