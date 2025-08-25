const { createClient } = require('redis');

const redisClient = createClient({
  // url: 'redis://redis:6379', // ✅ sửa lại IP localhost
   url: process.env.REDIS_URL || 'redis://default:ctznwrNlh0fAQ5rppPuqEuyKUgD8xTrn@redis-17355.c270.us-east-1-3.ec2.redns.redis-cloud.com:17355', // sử dụng biến môi trường
});

redisClient.on('error', (err) => console.error('❌ Redis Client Error', err));

module.exports = redisClient;
