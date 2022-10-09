/* eslint-disable */
const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../server');
const Tag = require('../models/tagModel');

//npm run start:test tag.test.js

let token;
beforeAll(async () => {
  const res = await request(server)
    .post('/http/api/users/login')
    .send({
      email: process.env.TEST_ACCOUNT_ADMIN_EMAIL,
      password: process.env.TEST_ACCOUNT_ADMIN_PASSWORD,
    })
    .set('Accept', 'application/json');
  token = res.body.token;
}, 5000);

describe('Tags', () => {
  describe('/GET Tags', () => {
    test('It should GET all the tags on the database', async () => {
      await request(server)
        .get('/http/api/tags')
        .expect(200)
        .then((res) => {
          expect(res.type).toEqual('application/json');
          expect(typeof res.body === 'object').toBeTruthy();
          expect(res.body.status).toEqual('success');
          expect(Array.isArray(res.body.data.tags)).toBeTruthy();
        });
    });
  });

  describe('/GET Tag', () => {
    test('It should GET a tag on the database based on the given id', async () => {
      const tagId = '630446f28492077f82c19d86';
      const res = await request(server).get(`/http/api/tags/${tagId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.type).toEqual('application/json');
      expect(typeof res.body === 'object').toBeTruthy();
      expect(res.body.status).toEqual('success');
      expect(res.body.data.tag._id).toEqual(tagId);
    });

    test('It should PUSH AN ERROR when GET a tag that not existing on the database based on the given id', async () => {
      const tagId = '630446f28492077f82c19d8b';
      await request(server)
        .get(`/http/api/tags/${tagId}`)
        .expect(404)
        .then((res) => {
          expect(res.type).toEqual('application/json');
          expect(typeof res._body === 'object').toBeTruthy();
          expect(res._body.status).toEqual('fail');
          expect(res._body.message).toEqual('No tag found with that ID');
        });
    });
  });

  describe('/POST Tag', () => {
    test('It should POST a new tag to the database', async () => {
      const tag = {
        name: 'UnitTest Create',
        group: 'theme',
        description: 'UnitTest Create',
      };
      await request(server)
        .post('/http/api/tags')
        .set({ Authorization: `Bearer ${token}` })
        .send(tag)
        .expect(201)
        .then(async (res) => {
          expect(res.type).toEqual('application/json');
          expect(typeof res.body === 'object').toBeTruthy();
          expect(typeof res.body.data.tag === 'object').toBeTruthy();
          expect(res.body.status).toEqual('success');
          expect(res.body.data.tag.name).toEqual(`${tag.name}`);
          expect(res.body.data.tag.group).toEqual(`${tag.group}`);
          expect(res.body.data.tag.description).toEqual(`${tag.description}`);

          const newTag = await Tag.findOne({
            _id: res.body.data.tag._id,
          });
          expect(newTag).toBeTruthy();
          expect(newTag.name).toEqual(`${tag.name}`);
          expect(newTag.group).toEqual(`${tag.group}`);
          expect(newTag.description).toEqual(`${tag.description}`);

          await Tag.findByIdAndDelete(res.body.data.tag._id);
        });
    });

    test('It should PUSH AN ERROR when POST a new tag that have the same name with another one existing on the database', async () => {
      const tagOne = await Tag.create({
        name: 'UnitTest Tag One',
        group: 'theme',
        description: 'UnitTest Tag One',
      });
      const tagTwo = {
        name: 'UnitTest Tag One',
        group: 'theme',
        description: 'UnitTest Tag One',
      };
      await request(server)
        .post('/http/api/tags')
        .set({ Authorization: `Bearer ${token}` })
        .send(tagTwo)
        .expect(409)
        .then(async (res) => {
          expect(res.type).toEqual('application/json');
          expect(typeof res._body === 'object').toBeTruthy();
          expect(res._body.status).toEqual('fail');
          expect(res._body.message).toEqual('Tag is already exists!');

          await Tag.findByIdAndDelete(tagOne._id);
        });
    });

    test('It should PUSH AN ERROR when POST a new tag but have not defined one required field', async () => {
      const tag = {
        name: 'UnitTest Create Null',
        description: 'UnitTest Create Null',
      };
      await request(server)
        .post('/http/api/tags')
        .set({ Authorization: `Bearer ${token}` })
        .send(tag)
        .expect(400)
        .then((res) => {
          expect(res.type).toEqual('application/json');
          expect(typeof res._body === 'object').toBeTruthy();
          expect(res._body.status).toEqual('fail');
          expect(res._body.message).toEqual(
            'Invalid input data. Tag Group is required'
          );
        });
    });
  });

  describe('/PATCH Tag', () => {
    test('It should PATCH an existing tag on the database', async () => {
      const tag = await Tag.create({
        name: 'UnitTest Patch',
        group: 'theme',
        description: 'UnitTest Patch',
      });
      const newTagData = {
        name: 'UnitTest Patch Success',
        group: 'genre',
        description: 'UnitTest Patch Success',
      };
      await request(server)
        .patch(`/http/api/tags/${tag._id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(newTagData)
        .expect(200)
        .then(async (res) => {
          expect(res.type).toEqual('application/json');
          expect(typeof res.body === 'object').toBeTruthy();
          expect(typeof res.body.data.tagUpdated === 'object').toBeTruthy();
          expect(res.body.status).toEqual('success');
          expect(res.body.data.tagUpdated.name).toEqual(`${newTagData.name}`);
          expect(res.body.data.tagUpdated.group).toEqual(`${newTagData.group}`);
          expect(res.body.data.tagUpdated.description).toEqual(
            `${newTagData.description}`
          );

          const patchTag = await Tag.findOne({
            _id: res.body.data.tagUpdated._id,
          });
          expect(patchTag).toBeTruthy();
          expect(patchTag.name).toEqual(`${newTagData.name}`);
          expect(patchTag.group).toEqual(`${newTagData.group}`);
          expect(patchTag.description).toEqual(`${newTagData.description}`);

          await Tag.findByIdAndDelete(res.body.data.tagUpdated._id);
        });
    });

    test('It should PUSH AN ERROR when PATCH a tag with the name are the same name with another one existing on the database', async () => {
      const tag = await Tag.create({
        name: 'UnitTest Patch Duplicate Name',
        group: 'theme',
        description: 'UnitTest Patch Duplicate Name',
      });
      const newTagData = {
        name: 'UnitTest Patch Duplicate Name',
        group: 'genre',
        description: 'UnitTest Patch Duplicate Name',
      };
      await request(server)
        .patch(`/http/api/tags/${tag._id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(newTagData)
        .expect(409)
        .then(async (res) => {
          expect(res.type).toEqual('application/json');
          expect(typeof res._body === 'object').toBeTruthy();
          expect(res._body.status).toEqual('fail');
          expect(res._body.message).toEqual(
            'That tag name is already used by another tag'
          );
          await Tag.findByIdAndDelete(tag._id);
        });
    });

    test('It should PUSH AN ERROR when PATCH a tag that not existing on the database based on the given id', async () => {
      const tagId = '63424bb1409a441fb1d17459';
      const newTagData = {
        name: 'UnitTest Patch Not Exists',
        group: 'genre',
        description: 'UnitTest Not Exists',
      };
      await request(server)
        .patch(`/http/api/tags/${tagId}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(newTagData)
        .expect(404)
        .then((res) => {
          expect(res.type).toEqual('application/json');
          expect(typeof res._body === 'object').toBeTruthy();
          expect(res._body.status).toEqual('fail');
          expect(res._body.message).toEqual('No tag found with that ID');
        });
    });
  });

  describe('/DELETE Tag', () => {
    test('It should DELETE an existing tag on the database', async () => {
      const tag = await Tag.create({
        name: 'UnitTest Delete',
        group: 'theme',
        description: 'UnitTest Delete',
      });

      await request(server)
        .delete(`/http/api/tags/${tag._id}`)
        .set({ Authorization: `Bearer ${token}` })
        .expect(204);
    });

    test('It should PUSH AN ERROR when DELETE a tag that not existing on the database based on the given id', async () => {
      const tagId = '630446f28492077f82c19d8b';

      await request(server)
        .delete(`/http/api/tags/${tagId}`)
        .set({ Authorization: `Bearer ${token}` })
        .expect(404)
        .then((res) => {
          expect(res.type).toEqual('application/json');
          expect(typeof res._body === 'object').toBeTruthy();
          expect(res._body.status).toEqual('fail');
          expect(res._body.message).toEqual('No tag found with that ID');
        });
    });
  });

  afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
  });
});
