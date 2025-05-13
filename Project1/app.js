const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const USERS_FILE = 'users.json';
const SECRET_KEY = 'my-secret-key'; // KEY của SERVER

// Load users từ file
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

// Lưu users vào file
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Mã hóa mật khẩu bằng SHA-256
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Middleware xác thực JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Đăng ký
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Thiếu username hoặc password' });
  }

  const users = loadUsers();
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'Username đã tồn tại' });
  }

  users.push({ username, password: hashPassword(password) });
  saveUsers(users);
  res.status(201).json({ message: 'Đăng ký thành công' });
});

// Đăng nhập
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username);

  if (!user || user.password !== hashPassword(password)) {
    return res.status(401).json({ message: 'Sai thông tin đăng nhập' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Đăng nhập thành công', token });
});

// Route cần xác thực
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Xin chào ${req.user.username}, bạn đã xác thực thành công` });
});

// Trang chủ
app.get('/', (req, res) => {
  res.send('Trang chủ');
});

// Khởi động server
app.listen(3000, () => {
  console.log('Server đang chạy tại http://localhost:3000');
});
