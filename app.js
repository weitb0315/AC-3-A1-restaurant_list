const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const usePassport = require('./config/passport')
const methodOverride = require('method-override')
const routes = require('./routes')
const flash = require('connect-flash')

require('./config/mongoose')
// 設定樣板引擎為handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
// 設定每一筆請求都會透過methodOverride進行前置處理
app.use(methodOverride('_method'))
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息

  next()
})
// 將request導入路由器
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listen on localhost:${port}`)
})