// const express = require('express')

// const redisClient = require("redis").createClient

// var client = redisClient(6379, 'localhost');


// (async () => {
//     await client.connect();
// })();

// client.on('connect', () => console.log('Redis Client Connected'));
// client.on('error', (err) => console.log('Redis Client Connection Error', err));


// Moving to upstash
const redis = require("redis");
// var client = redis.createClient({
//     url : "rediss://default:Ab0JAAIncDFjOTYxMThhZWZiZTk0MzcyYTQzNDA5YzA1Njg2MTZhMnAxNDgzOTM@ethical-hawk-48393.upstash.io:6379"
// });

var client = redis.createClient(6379, 'localhost');

(async () => {
    await client.connect();
})();

client.on('connect', ()=>console.log("Redis connected"))

client.on("error", function (err) {
    throw err;
  });
  
module.exports = client