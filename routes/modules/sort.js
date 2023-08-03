const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const sort = req.query.sort
  let restaurantSort = Restaurant.find().lean()
  if (sort === "A > Z") {
    restaurantSort = restaurantSort.sort({ name_en: 'asc' })
  } else if (sort === "Z > A") {
    restaurantSort = restaurantSort.sort({ name_en: 'desc' })
  } else if (sort === "category") {
    restaurantSort = restaurantSort.sort({ category: 'asc' })
  } else if (sort === "location") {
    restaurantSort = restaurantSort.sort({ location: 'asc' })
  }
  restaurantSort
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

module.exports = router