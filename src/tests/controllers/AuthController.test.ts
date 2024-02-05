import request from 'supertest';
import app from '../../app';
import UserService from '../../services/UserService';
import CustomError from '../../utils/CustomError';
import CryptoHelper from '../../utils/CryptoHelper';
import AuthService from '../../services/AuthService';
import UserRepository from '../../repositories/UserRepository';
import http from "http"


describe('Auth Controller', () => {
    let server: http.Server;

    beforeAll((done) => {
        server = http.createServer(app.callback());
        done()
    });

    afterAll((done) => {
        server.close();
        done();
    });



    describe('SIGN UP', () => {

        it('should return 400 as signup validation fails', async () => {
            const response = await request(server).post('/auth/signup').send({ name: "abc", email: "asdf@mail.com" });
            expect(response.status).toBe(400);
        });

        it('should return 200 as user creation is successful', async () => {
            const mockData = {
                name: 'test',
                email: 'test@example.com',
                password: 'password123',
                phone: "1234567890"
            };

            const resolvedValue = {
                id: 1,
                name: 'test',
            }
            jest.spyOn(UserService, 'createUser').mockResolvedValue(resolvedValue);

            const response = await request(server)
                .post('/auth/signup')
                .send(mockData);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(resolvedValue);
        })

        it('should return 400 as user already exists', async () => {
            const mockData = {
                name: 'test',
                email: 'test@example.com',
                password: 'password123',
                phone: "1234567890"
            };

            jest.spyOn(UserService, 'createUser').mockRejectedValueOnce(
                new CustomError(400, 'RESOURCE_EXISTS', 'User already registered')
            );

            const response = await request(server)
                .post('/auth/signup')
                .send(mockData);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ "error": "User already registered", "errorCode": "RESOURCE_EXISTS" });
        })
    })

    describe('SIGN IN', () => {

        it('should return 400 as password is missing', async () => {
            const response = await request(server).post('/auth/signin').send({ email: "asdf@mail.com" });
            expect(response.status).toBe(400);
        });

        it('should return 401 as user credentials dont match', async () => {
            const mockData = {
                email: 'test@mail.com',
                password: 'password123',
            };

            const resolvedValue = {
                errorCode: 'UNAUTHORIZED', error: 'Invalid Credentials'
            }
            jest.spyOn(UserRepository,'getUserByEmail').mockResolvedValue(mockData)
            jest.spyOn(CryptoHelper,'createPasswordHash').mockReturnValue('111')

            const response = await request(server)
                .post('/auth/signin')
                .send(mockData);
            expect(response.status).toBe(401);
            expect(response.body).toEqual(resolvedValue);
        })

        it('should return 200 with token as signup is successful', async () => {
            const mockData = {
                email: 'test@example.com',
                password: 'password123',
            };

            const resolvedValue = {
                token: 'token'
            }
            jest.spyOn(AuthService, 'signInUserByEmail').mockResolvedValue('token')

            const response = await request(server)
                .post('/auth/signin')
                .send(mockData);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(resolvedValue);
        })


    })

});
