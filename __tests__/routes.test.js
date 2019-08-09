// routes.test.js
const request = require('supertest');
const server = require('../app.js');
const project = require('../controller/projectController');

const Project1 = {
  name: 'asdzd',
  version: 'v1.1.0',
  date: '2019-06-01T16:03:21+02:00',
};

const Project2 = {
  name: 'Coucou !',
  version: 'v1.5.0',
  date: '2019-06-01T16:03:21+02:00',
};

beforeEach(async () => {
  project.deleteAll();
});
// close the server after each test

afterAll(() => {
  server.close();
  project.deleteAll();
});

describe('basic route tests', () => {
  test('get home route GET /', async () => {
    const response = await request(server).get('/v1/');
    expect(response.status).toEqual(200);
    expect(response.body.name).toContain('ApiNoIdea');
    expect(response.body.version).toContain('v1.0.0');
    expect(response.body.status).toContain('everything is ok !');
  });

  test('Create 1 project', async () => {
    const response1 = await request(server)
        .post('/v1/projects/create').send(Project1);

    expect(response1.status).toEqual(200);
    expect(response1.body.name).toEqual('asdzd');

    const response = await request(server).get('/v1/projects');
    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
  });

  test('Delete a project', async () => {
    const response1 = await request(server)
        .post('/v1/projects/create').send(Project1);

    expect(response1.status).toEqual(200);
    expect(response1.body.name).toEqual('asdzd');

    const idProject = response1.body._id;

    const response2 = await request(server)
        .delete(`/v1/project/${idProject}`);

    expect(response2.status).toEqual(200);
  });

  test('Update a project', async () => {
    const response1 = await request(server)
        .post('/v1/projects/create').send(Project1);

    expect(response1.status).toEqual(200);
    expect(response1.body.name).toEqual('asdzd');

    const update = response1.body;
    const idProject = response1.body._id;

    update.name = await 'CEMONPROJET';

    const responseUpdate = await request(server)
        .put(`/v1/projects/${idProject}`).send(update);

    expect(responseUpdate.status).toEqual(200);
    expect(responseUpdate.body.name).toEqual('CEMONPROJET');
  });

  test('Get a project by id', async () => {
    const response1 = await request(server)
        .post('/v1/projects/create').send(Project1);

    expect(response1.status).toEqual(200);
    expect(response1.body.name).toEqual('asdzd');

    const idProject = response1.body._id;
    const result = await request(server)
        .get(`/v1/projects/${idProject}`);

    expect(result.status).toEqual(200);
  });
});
