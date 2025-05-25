const express = require('express')
const app = express();
const path = require('path')

app.use(express.json())
app.use(express.static('public'))

let comments = [];

// Get tất cả bình luận
app.get('/api/comments', (req,res) => { 
    res.json(comments)
})

// Thêm bình luận mới
app.post('/api/comments', (req,res) => {
    const {name,message} = req.body
    if(!name || !message) {
        return res.status(400).json({message: "Thiếu tên hoặc nội dung comment"})
    }
    const newComment = {
        id: comments.length + 1,
        name,
        message,
        createdAt: new Date().toISOString()
    }
    comments.push(newComment)
    res.status(201).json(newComment)
})

// DELETE: Xóa bình luận theo ID
app.delete('/api/comments/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const index = comments.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({message: 'Không tìm thấy bình luận'});
    }
    comments.splice(index,1)
    res.status(204).end()
})

//Chạy server
app.listen(3000, () => {
  console.log('Comment API đang chạy tại http://localhost:3000');
});


