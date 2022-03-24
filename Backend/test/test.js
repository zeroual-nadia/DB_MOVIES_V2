process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../model/User');
let Movie = require('../model/movie');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

//Our parent block
describe('User', () => {
	beforeEach((done) => { //Before each test we empty the database
		User.remove({}, (err) => { 
		   done();		   
		});		
	});

});
describe('Movie', () => {
   beforeEach((done) => {
      Movie.remove({}, (err)=>{
         done();
      });
   });
});
 /*
  * Test the /POST signup route
  */
 describe('POST /signup', () => {
   
    it('it should POST a user ', (done) => {
        let user = {
           email:"JohnDoe@test.com",
           password:"$2b$10$AXlzfKygsklU5bdQwaYIv.Yix3Kq.OZFrKaRO4r/gUJPQ4AeWd1JS"
        }
          chai.request('http://localhost:3000')
          .post("/dtbMovie/auth/signup")
          .send(user)
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                
            done();
          });
    });
});

/*
  * Test the /GET movie route
  */

 describe('/GET movie', () => {
   it('it should GET all the movies', (done) => {
     chai.request('http://localhost:3000')
         .get('/dtbMovie/movie')
         .end((err, res) => {
               res.should.have.status(200);
            done();
         });
   });
});
/*
  * Test the /GET/:id route
  */
 describe('/GET/:id movie', () => {
   it('it should GET a movie by the given id', (done) => {
       let movie = new Movie({ title: "The Lord of the Rings", 
       synopsis: "synopsis",
       imageURL: "imageURL",
       userId: "1",
       acteaurs: "Liste des acteurs" });
       movie.save((err, movie) => {
           chai.request('http://localhost:3000')
         .get('/dtbMovie/movie/')
         .send(movie)
         .end((err, res) => {
               res.should.have.status(200);
            done();
         });
       });

   });
});