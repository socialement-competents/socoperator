'use strict'

var url = process.env.SERVER_URL || '';
var urlSub = process.env.SERVER_URL_SUB || '';

url = '"' + url + '"';
urlSub = '"' + urlSub + '"';

console.log('SERVER_URL:', url);
console.log('SERVER_URL_SUB:', urlSub);

module.exports = {
  NODE_ENV: '"production"',
  SERVER_URL: url,
  SERVER_URL_SUB: urlSub
}
