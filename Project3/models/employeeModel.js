const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, '../data/employees.json');

exports.readEmployees = () => {
  if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, '[]');
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
};

exports.writeEmployees = (data) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};