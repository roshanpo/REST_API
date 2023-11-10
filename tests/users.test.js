const request = require("supertest");
const pool = require('../db/quries');
const app = require('../app');

describe('/api/users/', ()=>{
    test('should return all the users', async()=>{
        const res = await request(app).get('/api/users/')
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
    });

    test('should return one user', async()=>{
        const res = await request(app).get('/api/users/7aad5a49-4c07-4964-8dba-d30f624d4686')
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    })
})