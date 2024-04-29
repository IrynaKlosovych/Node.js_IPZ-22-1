const express = require("express")
require('../db/mongoose')
const userRouter = require("./routers/user.js")
const taskRouter = require("./routers/task.js")
const PORT = Number(process.env.PORT);
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})

// const someUser = new User({name: 'Iryna', age: 18, email: 'abracadabra@gmail.com', password: '12345678'})
// someUser.save()
//     .then(() => console.log(someUser))
//     .catch((error) => console.error(error));

// const newTask = new Task({
//     title:'Second Title',
//     description: 'Build a RESTful API with Node.js and MongoDB',
//     completed: false
// });
// newTask.save()
//     .then(task => {
//         console.log('Task saved successfully:', task);
//     })
//     .catch(error => {
//         console.error('Error saving task:', error);
//     });
