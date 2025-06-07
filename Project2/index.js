const express = require('express')
const app = express()

app.use(express.json()) //Đọc body JSON

// Demo lưu công việc
let todos = [
    {id:1, task:'Thức dậy', done:false},
    {id:2, task: 'Ăn sáng', done :false}
]

// GET - Lấy danh sách công việc
app.get('/todos', (req,res) => {
    res.json(todos)
})

// POST /todos - Thêm công việc
app.post('/todos', (req,res) => {
    const {task} = req.body;
    if(!task) {
        return res.status(400).json({error: 'Task là bắt buộc'})
    }
    const newTodo = {
        id: todos.length + 1,
        task,
        done: false
    }
    todos.push(newTodo)
    res.status(201).json({message: 'Tạo thành công'})
})

// DELETE /todos/:id - Xóa công việc theo id
app.delete('/todos/:id', (req,res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !==id)
    res.status(200).json({message:'Xóa thành công'})
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy ở http://localhost: ${PORT}`)
})