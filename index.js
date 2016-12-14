const Express = require('express')
const RaspiCam = require('raspicam')

const app = Express()
const port = 8000

app.get('/', (req, res) => {
  const path = Date.now().toString()
  const cam = new RaspiCam({
    mode: 'photo',
    output: `img/${path}.jpg`
  })
  cam.start()
  cam.on('read', (err, timestamp, filename) => {
    cam.stop()
    if (err != null) {
      res.status(500).json(err)
    } else {
      res.json({filename})
    }
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

