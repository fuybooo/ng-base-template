const fs = require('fs');
const c = new Date();
const lines = fs.readFileSync('src/index.html', 'utf-8');
const t = (str) => ('0' + str).slice(-2);
const time = `##${c.getFullYear()}-${t(c.getMonth() + 1)}-${t(c.getDate())} ${t(c.getHours())}:${t(c.getMinutes())}:${t(c.getSeconds())}##`;
fs.writeFileSync('src/index.html', lines.replace(/##[\s\S]*##/), time);
