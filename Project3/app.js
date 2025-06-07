const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/employees', employeeRoutes);

app.get('/', (req,res) => {
    res.send('Trang chủ')
})

app.listen(PORT, () => {
    console.log(`Server đang chạy ở http://localhost:${PORT}`);
})
