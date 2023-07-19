const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 設定db
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(express.static('public'))

// 設定樣板引擎為handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// create頁面路由設定
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// 資料庫新增餐廳資料
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const location = req.body.location
  const google_map = req.body.google_map
  return Restaurant.create({
    name,
    name_en,
    location,
    google_map
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// index頁面路由設定，顯示全餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// detail頁面路由設定，顯示特定餐廳
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.error(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(keyword.toLowerCase())) || (restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listen on localhos:${port}`)
})