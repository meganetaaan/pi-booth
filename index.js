const Express = require('express')
const RaspiCam = require('raspicam')

const app = Express()
const port = 3000

function to2digits (num) {
  return ('0' + num).slice(-2)
}

var seq = 0;
function getSeq () {
  return seq++
}
app.get('/', (req, res) => {
  const date = new Date()
  const yyyy = date.getFullYear()
  const MM = to2digits(date.getMonth() + 1)
  const dd = to2digits(date.getDate())
  const seq = to2digits(getSeq())
  const path = `${yyyy + MM + dd}_${seq}.jpg`
  const cam = new RaspiCam({
    mode: 'photo',
    output: `img/${path}`,
    rot: 180
  })
  cam.start()
  cam.on('read', (err, timestamp, filename) => {
    if (err != null) {
      res.status(503).send()
    }
    if (filename[filename.length - 1] !== '~') {
      cam.stop()
      res.json({filename})
    }
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

