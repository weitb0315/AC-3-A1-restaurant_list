const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json')

const SEED_USER1 = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  ownRestaurants: [1, 2, 3]
}
const SEED_USER2 = {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
  ownRestaurants: [4, 5, 6]
}
db.once('open', () => {
  // user1種子資料製作
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER1.password, salt))
    .then(hash => User.create({
      name: SEED_USER1.name,
      email: SEED_USER1.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: SEED_USER1.ownRestaurants.length },
        (_, i) => {
          Restaurant.create({
            id: restaurantList.results[i].id,
            name: restaurantList.results[i].name,
            name_en: restaurantList.results[i].name_en,
            category: restaurantList.results[i].category,
            image: restaurantList.results[i].image,
            location: restaurantList.results[i].location,
            phone: restaurantList.results[i].phone,
            google_map: restaurantList.results[i].google_map,
            rating: restaurantList.results[i].rating,
            description: restaurantList.results[i].description,
            userId
          })
        }
      ))
    })
    .then(() => {
      console.log('user1 is done.')
    .catch((error) => console.log(error))
    })
  // user2種子資料製作
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER2.password, salt))
    .then(hash => User.create({
      name: SEED_USER2.name,
      email: SEED_USER2.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: SEED_USER2.ownRestaurants.length },
        (_, i) => {
          Restaurant.create({
            id: restaurantList.results[i + 3].id,
            name: restaurantList.results[i + 3].name,
            name_en: restaurantList.results[i + 3].name_en,
            category: restaurantList.results[i + 3].category,
            image: restaurantList.results[i + 3].image,
            location: restaurantList.results[i + 3].location,
            phone: restaurantList.results[i + 3].phone,
            google_map: restaurantList.results[i + 3].google_map,
            rating: restaurantList.results[i + 3].rating,
            description: restaurantList.results[i + 3].description,
            userId
          })
        }
      ))
    })
    .then(() => {
      console.log('user2 is done.')
      process.exit()
    })
    .catch((error) => console.log(error))
})