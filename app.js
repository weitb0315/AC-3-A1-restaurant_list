const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
// 載入method-override
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')
require('./config/mongoose')

app.use(express.static('public'))
// 設定每一筆請求都會透過methodOverride進行前置處理
app.use(methodOverride('_method'))
// 將request導入路由器
app.use(routes)

// 設定樣板引擎為handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.listen(port, () => {
  console.log(`Express is listen on localhost:${port}`)
})