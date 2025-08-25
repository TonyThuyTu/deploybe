const { createClient } = require('redis');

const redisClient = createClient({
  // url: 'redis://redis:6379', // ✅ sửa lại IP localhost
   url: process.env.REDIS_URL, // sử dụng biến môi trường
});

redisClient.on('error', (err) => console.error('❌ Redis Client Error', err));

module.exports = redisClient;
