import request from 'supertest';
import app from '../../app';
import JWTHelper from '../../utils/JWTHelper';
import CharacterService from '../../services/CharacterService';
import http from "http"


describe('Character Controller', () => {
    let server: http.Server;

    beforeAll((done) => {
        server = http.createServer(app.callback());
        done()
      });

    afterAll((done) => {
        server.close();
        done();
      });
  

    it('should return 401 if no auth token passed', async () => {
        const response = await request(server).get('/characters');
        expect(response.status).toBe(401);
    });

    it('should return 200 with array of characters', async () => {
        jest.spyOn(JWTHelper,'verify').mockReturnValue({email:"abc@mail.com"})
        const resolvedValue = [1,2,3]
        jest.spyOn(CharacterService,'findCharacters').mockResolvedValue(resolvedValue)
        const response = await request(server).get('/characters').set('Authorization', 'Bearer abc');


        expect(response.status).toBe(200);
        expect(response.body).toEqual(resolvedValue)
    });


});
