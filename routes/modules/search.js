const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const restaurantList = require('../../restaurant.json')

// 搜尋餐廳功能，可用名字或分類搜尋
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(keyword.toLowerCase())) || (restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})
// 匯出路由模組
module.exports = router