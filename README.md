# 我的餐廳清單

![image](https://github.com/weitb0315/AC-3-A1-restaurant_list/blob/main/public/images/AC%203%20A1-3.PNG)

## 介紹
AC 3 A1作業，重構路由及調整畫面，可列舉餐廳菜單、顯示餐廳詳細資訊、連結至地圖，建立資料庫並匯入餐廳資料的json檔案，可新增餐廳、編輯餐廳資訊、刪除餐廳資料等。新增使用者註冊功能，並限制需要登入之後才能使用網站的功能

## 功能 
- 顯示所有的餐廳列表
- 顯示餐廳分類及評分
- 可搜尋特定餐廳名稱或分類
- 可瀏覽特定餐廳詳細資訊，包含類別、地址、電話、說明等
- 餐廳地址可連結到google地圖
- 新增餐廳
- 編輯餐廳
- 刪除餐廳
- 使用者可註冊帳號
- 使用者可透過Facebook登入

## 開啟專案

1. 先下載專案至本地
2. 安裝node.js及npm
3. 透過終端機進入資料夾並輸入：

  ```bash
  npm run dev
  ```

4. 若看到此訊息則代表順利運行，打開瀏覽器進入到以下網址
  
  ```bash
  Listening on http://localhost:3000
  ```

## 開發工具

- Node.js 18.16.0
- Express 4.16.4
- Express-Handlebars 3.0.0
- Bootstrap 5.1.3
- Font-awesome 6.4.0
- body-parser 1.20.2
- dotenv 8.2.0
- bcryptjs 2.4.3
- connect-flash 0.1.1
- express-session 1.17.1
- method-override 3.0.0
- passport 0.4.1
- passport-facebook 3.0.0
- passport-local 1.0.0"

- MongoDB
- mongoose 5.9.7