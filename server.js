const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/sequelize');
const routes = require('./routes/index.route');
const redisClient = require('./config/redisClient');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối MySQL
(async () => {
  try {
    // Kết nối MySQL
    await sequelize.authenticate();
    console.log('✅ Kết nối MySQL thành công!');

    // Kết nối Redis
    await redisClient.connect();
    console.log('✅ Redis đã kết nối thành công!');

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Lỗi khi kết nối MySQL hoặc Redis:', err);
  }
})();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://www.taobro.click',
  credentials: true, // Cho phép gửi cookie qua trình duyệt
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static file cho ảnh upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use('/api', routes);

// Route test
app.get('/', (req, res) => {
  res.send('🚀 Welcome to my AppleStore API');
});
