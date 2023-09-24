// 引用Express與Express路由器
const express = require('express')
const router = express.Router()
// 準備引入路由模組

// 引入home模組程式碼
const home = require('./modules/home')
// 將網址結構符合/字串的request導向home
router.use('/', home)

// 引入restaurants模組程式碼
const restaurants = require('./modules/restaurants')
// 將網址結構符合/restaurants字串開頭的request導向restaurants模組
router.use('/restaurants', restaurants)

const search = require('./modules/search')
router.use('/search', search)

// 引入sort模組程式碼
const sort = require('./modules/sort')
router.use('/sort', sort)

const users = require('./modules/users')
router.use('/users', users)

// 匯出路由器
module.exports = router