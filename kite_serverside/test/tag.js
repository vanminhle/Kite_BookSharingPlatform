/* eslint-disable */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Tag = require('../models/tagModel');

chai.use(chaiHttp);
chai.should();

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjVjZjBkZDJhOWI4YTJkMmYwZDI1NiIsImlhdCI6MTY2NTA1OTk3MywiZXhwIjoxNjY1NjY0NzczfQ.1n5iHPsDYdlEHq-XIenIfusZrQH3jDpSfMItv-wb9TY';

before(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log('------------------------------------------');
});

describe('/GET tags', () => {
  it('TAGS - It should GET all the tags on the database', (done) => {
    chai
      .request(server)
      .get('/http/api/tags')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('object');
        res.body.status.should.be.eql('success');
        res.body.data.tags.should.be.a('array');
        done();
      });
  });
});

describe('/GET/:id tag', () => {
  it('TAGS - It should GET a tag on the database based on the given id', (done) => {
    const tagId = '630446f28492077f82c19d86';
    chai
      .request(server)
      .get(`/http/api/tags/${tagId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('object');
        res.body.data.tag.should.be.a('object');
        res.body.status.should.be.eql('success');
        res.body.data.tag._id.should.be.eql(tagId);
        done();
      });
  });
});

describe('/POST book', () => {
  it('TAGS - it should POST a new tag to the database', (done) => {
    let tag = {
      name: 'UnitTest Create',
      group: 'theme',
      description: 'UnitTest Create',
    };
    chai
      .request(server)
      .post('/http/api/tags')
      .set({ Authorization: `Bearer ${token}` })
      .send(tag)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.tag.should.be.a('object');
        res.body.status.should.be.eql('success');
        res.body.data.tag.name.should.be.eql(`${tag.name}`);
        res.body.data.tag.group.should.be.eql(`${tag.group}`);
        res.body.data.tag.description.should.be.eql(`${tag.description}`);
        done();
      });
  });
});

describe('/PATCH tag', () => {
  it('TAGS - it should PATCH an existing tag on the database', (done) => {
    const tag = new Tag({
      name: 'UnitTest Patch',
      group: 'theme',
      description: 'UnitTest Patch',
    });
    let newTagData = {
      name: 'UnitTest Patch Success',
      group: 'genre',
      description: 'UnitTest Patch Success',
    };

    tag.save((err, tag) => {
      chai
        .request(server)
        .patch(`/http/api/tags/${tag._id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(newTagData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.tagUpdated.should.be.a('object');
          res.body.status.should.be.eql('success');
          res.body.data.tagUpdated.name.should.be.eql(`${newTagData.name}`);
          res.body.data.tagUpdated.group.should.be.eql(`${newTagData.group}`);
          res.body.data.tagUpdated.description.should.be.eql(
            `${newTagData.description}`
          );
          done();
        });
    });
  });
});

describe('/DELETE tag', () => {
  it('TAGS - it should DELETE an existing tag on the database', (done) => {
    const tag = new Tag({
      name: 'UnitTest Patch',
      group: 'theme',
      description: 'UnitTest Patch',
    });

    tag.save((err, tag) => {
      chai
        .request(server)
        .delete(`/http/api/tags/${tag._id}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});

// //failed case
// describe('/GET/:id tag (NO TAG FOUND CASE)', () => {
//   it('TAGS - It should PUSH AN ERROR when GET a tag that not existing on the database based on the given id', (done) => {
//     const tagId = '630446f28492077f82c19d8b';
//     chai
//       .request(server)
//       .get(`/http/api/tags/${tagId}`)
//       .end((err, res) => {
//         console.log(res.body);
//         // res.should.have.status(404);
//         // res.body.should.be.a('object');
//         // res.body.error.should.be.a('object');
//         // res.body.status.should.be.eql('fail');
//         // res.body.error.statusCode.should.be.eql(404);
//         // res.body.error.status.should.be.eql('fail');
//         // res.body.message.should.be.eql('No tag found with that ID');
//         done();
//       });
//   });
// });
