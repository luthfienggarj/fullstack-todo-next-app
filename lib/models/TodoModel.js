// TodoModel.Js bertujuan untuk memodelisasi dari title dan description pada todo
const { default: mongoose } = require("mongoose");

// Schema adalah object yang dibutuhkan didalam todo app diantaranya Title, Description dan isCompleted.
// Ketiganya harus terhubung dan ditampilkan di collection mongoDB
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // Kemunkinan isCompleted tidak tercantum di collection mongoDB tetapi tetap terhubung
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timeStamp: true
})

const TodoModel = mongoose.models.todo || mongoose.model('todo', Schema);
export default TodoModel;