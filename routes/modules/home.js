// 引用Express與Express路由器
const express = require('express')
const router = express.Router()
// 引用Todo model
const Restaurant = require('../../models/restaurant')
// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
// 匯出路由模組
module.exports = router