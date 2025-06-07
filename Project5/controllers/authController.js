const bcrypt = require('bcrypt');
const { readUsers, writeUsers } = require('../models/userModel');

exports.getRegister = (req, res) => res.render('register');
exports.getLogin = (req, res) => res.render('login');
exports.getDashboard = (req, res) => {
  if (!req.session.username) return res.redirect('/login');
  res.render('dashboard', { user: req.session.username });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.send('User đã tồn tại');
  }
  const hash = await bcrypt.hash(password, 10);
  users.push({ username, password: hash });
  writeUsers(users);
  res.send(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <title></title>
    </head>
    <body>
      <p>Bạn đã đăng kí thành công</p>
      <a href="/login">Đi tới trang đăng nhập</a>
    </body>
    </html>
  `);
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.send('Sai thông tin hoặc người dùng không tồn tại');
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send('Sai mật khẩu');
  req.session.username = username;
  res.redirect('/dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};
