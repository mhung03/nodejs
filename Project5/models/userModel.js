const fs = require('fs')
const path = './users.json';

function readUsers() {
    if(!fs.existsSync(path)) fs.writeFileSync(path,'[]');
    const data = fs.readFileSync(path);
    return JSON.parse(data)
}

function writeUsers(users) {
    fs.writeFileSync(path, JSON.stringify(users, null, 2));
}

module.exports = {readUsers,writeUsers};