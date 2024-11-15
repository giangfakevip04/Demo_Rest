var express = require('express');
var router = express.Router();

// MongoDB
// Cách kết nối, thao tác với MongoDB
// query dữ liệu và hiển thị trên EJS
// Query dữ liệu và trả về json từ MongoDB
// Định nghĩa 1 collection trước
// Schema là khái niệm để định nghĩa 1 collection
// Collection là student

const mongodb = 'mongodb+srv://giangtvph38936:admin123@cluster0.a4j5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const mongoose = require('mongoose')
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to MongoDB")
}).catch(err => {
    console.log(err)
})

const studentSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
})
// Model: là khái niệm để thao tác với Collection là Student
const Student = mongoose.model('Student', studentSchema)
router.get('/getDatabase', function (req, res) {
    Student.find({}).then(result => {
        res.send(result)
    })
})

router.get('/createUser', function (req, res) {
    const random = Math.floor(Math.random() * 1000)
    const student = new Student({
        name: "Hac co lo" + random,
        address: random + "Hanoi, Vietnam",
        phone: "" + random
    })
    student.save().then(result => {
        res.send(result)
    })
})

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', message: 'Create User'});
});

router.get('/deleteUser', function (req, res) {
    const id = req.query.id
    Student.deleteOne({_id: id}).then(result => {
        res.redirect('/displayUsers')
    })
})

router.get('/getAllUser', function (req, res, next) {
    // req: đối tượng chứa các tham số mà phía cilent gửi lên: browser, android, postman
    // res: đối tượng kiểm soát cách dữ liệu được trả về
    // trả về 1 file html, trả về 1 biến, trả về 1 array hay trả về 1 json data
    var jsonData = [{
        id: 1,
        name: "Nguyen Van A",
        age: 20
    },
        {
            id: 2,
            name: "Nguyen Van B",
            age: 20
        },
        {
            id: 3,
            name: "Nguyen Van C",
            age: 20
        }]
    res.send(jsonData);
})
router.get('/getOneUser', function (req, res, next) {
    // req: đối tượng chứa các tham số mà phía cilent gửi lên: browser, android, postman
    // res: đối tượng kiểm soát cách dữ liệu được trả về
    // trả về 1 file html, trả về 1 biến, trả về 1 array hay trả về 1 json data
    var jsonData = {
        id: 1,
        name: "Nguyen Van A",
        age: 20
    }
    res.send(jsonData);
})
router.get('/displayUsers', function (req, res, next) {
    // var jsonData = [{
    //     id: 1,
    //     name: "Nguyen Van A",
    //     age: 20
    // },
    //     {
    //         id: 2,
    //         name: "Nguyen Van B",
    //         age: 20
    //     },
    //     {
    //         id: 3,
    //         name: "Nguyen Van C",
    //         age: 20
    //     }]

    Student.find({}).then(jsonData => {
        res.render("users", {name: "Hac co lo", data: jsonData})
    })
    // trả về 1 file html có tên là users trong thư mục views và truyền vào biến data

})

router.get("/updateUser", function (req, res) {
    const id = req.query.id
    Student.findOne({_id: id}).then(result => {
        console.log(JSON.stringify(result))
        res.render('updateForm', {data: result})
    })
})

router.post('/updateUser', function (req, res) {
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address
    const phone = req.body.phone
    console.log(id)
    Student.updateOne({_id: id},
        {name: name, address: address, phone: phone}).then(result => {
        res.redirect('/displayUsers')
    }).catch(err => {
        console.log(err)
    })
})
router.post('/createUser', function (req, res, next) {
    // thuộc tính sau biến body là thuộc tính trong thẻ input
    // , giá trị của thuộc tính name
    // ví dụ : <input name ="name">, <input name ="age">

//     const user = `{
//     name:"${name}",
//     age:${age}
//     }`
//     res.send(user)
// })
    const name = req.body.name;
    const age = req.body.age;
    const random = Math.floor(Math.random() * 1000)
    const student = new Student({
        name: name,
        address: random + "Hanoi, Vietnam",
        phone: age
    })
    student.save().then(result => {
        // res.send(result)
        // res.render('index', {title: 'Created User', message: "Create user successfully!"})
        res.redirect('/displayUsers')
    })

})

module.exports = router;
