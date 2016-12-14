const Express = require('express')

const app = Express()
const port = 8000

app.get('/', (res, req) => {
  req.json({path: '/hoge/hoge'})
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

