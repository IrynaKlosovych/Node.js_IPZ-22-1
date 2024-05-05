process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
require('../../Lab3_4_5_TaskApp/db/mongoose')
require('dotenv').config({ path: '../../Lab3_4_5_TaskApp/.env' });
let User = require('../../Lab3_4_5_TaskApp/models/user');
let Task = require('../../Lab3_4_5_TaskApp/models/task');

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
let server = require('../../Lab3_4_5_TaskApp/src/app');
let should = chai.should();


chai.use(chaiHttp);

describe('Users and Tasks', () => {

    let user1Id;
    let user2Id;
    let AuthTokenUser;
    let user1Task1Id;
    let user1Task2Id;
    let user2Task1Id;

    before(async () => {
        try {
            await User.deleteMany({});
            await Task.deleteMany({});
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
    it('1. it should not POST a user without data(validation error)', (done) => {
        let user = {}
        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400);//код 400 описує зазвичай помилку валідації
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                expect(res.body).to.have.property('name').to.equal('ValidationError');
                done();
            });
    });
    it('2. should register User1 without errors', (done) => {
        let user = {
            name: "Iryna",
            password: "1234567890",
            age: 19,
            email: "iryna@gmail.com"
        }
        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                user1Id = res.body._id;
                done();
            });
    });

    it('3. should register User2 without errors', (done) => {
        let user = {
            name: "Taras",
            password: "1234567890",
            age: 19,
            email: "taras@gmail.com"
        }
        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                user2Id = res.body._id;
                done();
            });
    });

    it('4. should login User1 with correct credentials', (done) => {
        let user = {
            "password": "1234567890",
            "email": "iryna@gmail.com"
        }
        chai.request(server)
            .post('/users/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('success');
                AuthTokenUser = res.body.token
                done();
            });
    });

    it('5. should add Task1 for User1 without errors', (done) => {
        let task = {
            title: "Iryna's task 1",
            description: "Iryna's task 1"
        }
        chai.request(server)
            .post('/tasks')
            .set('Authorization', 'Bearer ' + AuthTokenUser)
            .send(task)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                user1Task1Id = res.body._id;
                done();
            });
    });

    it('6. should add Task2 for User1 without errors', (done) => {
        let task = {
            title: "Iryna's task 2",
            description: "Iryna's task 2"
        }
        chai.request(server)
            .post('/tasks')
            .set('Authorization', 'Bearer ' + AuthTokenUser)
            .send(task)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                user1Task2Id = res.body._id;
                done();
            });
    });
    it('7. it should GET all the tasks User1', (done) => {
        chai.request(server)
            .get('/tasks')
            .set('Authorization', 'Bearer ' + AuthTokenUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                res.body.should.have.lengthOf(2);
                done();
            });
    });
    it('8. it should GET Task1 for User1 by id', (done) => {
        chai.request(server)
            .get(`/tasks/${user1Task1Id}`)
            .set('Authorization', 'Bearer ' + AuthTokenUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('title').eql("Iryna's task 1");
                res.body.should.have.property('completed');
                done();
            });
    });
    it('9. should logout User1 successfully', (done) => {
        chai.request(server)
            .post('/users/logout')
            .set('Authorization', 'Bearer ' + AuthTokenUser)
            .end((err, res) => {
                res.text.should.equal('logout success');
                AuthTokenUser = undefined
                done();
            });
    });
    it('10. should login User2 with correct credentials', (done) => {
        let user = {
            "password": "1234567890",
            "email": "taras@gmail.com"
        }
        chai.request(server)
            .post('/users/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('success');
                AuthTokenUser = res.body.token
                done();
            });
    });
    it('11. should add Task3 for User2 without errors', (done) => {
        let task = {
            title: "Task3 created by Taras",
            description: "Task3 created by Taras"
        }
        chai.request(server)
            .post('/tasks')
            .set('Authorization', 'Bearer ' + AuthTokenUser)
            .send(task)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                user2Task1Id = res.body._id;
                done();
            });
    });
    it('12. it should GET all the tasks User2', (done) => {
        chai.request(server)
            .get('/tasks')
            .set('Authorization', 'Bearer ' + AuthTokenUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                res.body.should.have.lengthOf(1);
                done();
            });
    });
    it('13. it shouldn\'t GET Task1 for User2 by id', (done) => {
        chai.request(server)
            .get(`/tasks/${user1Task1Id}`)
            .set('Authorization', 'Bearer ' + AuthTokenUser)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('error').eql('IdError');
                res.body.should.have.property('message').eql('Not Found');
                done();
            });
    });
    it('14. should logout User2 successfully', (done) => {
        chai.request(server)
            .post('/users/logout')
            .set('Authorization', 'Bearer ' + AuthTokenUser)
            .end((err, res) => {
                res.text.should.equal('logout success');
                AuthTokenUser = undefined
                done();
            });
    });
    it('15. it shouldn\'t GET Task1 for unauthorization user by id', (done) => {
        chai.request(server)
            .get(`/tasks/${user1Task1Id}`)
            // .set('Authorization', 'Bearer ' + AuthTokenUser)
            .end((err, res) => {
                res.should.have.status(403);//хоча 401 - неавтентифікований теж могло б підійти
                res.text.should.equal('Forbidden Access');
                done();
            });
    });
});