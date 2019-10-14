import nock from 'nock';
import { expect } from 'chai';
import confs from '../configs/variables';
import usersClient from './usersClient';

const { url } = confs.services.users;

describe('users client', () => {
  let context;
  let response;

  beforeEach(() => {
    context = {
      accessToken: 'token'
    };
  });

  describe('login() function', () => {
    let userProfile;

    beforeEach(async () => {
      userProfile = {
        name: 'Pride',
        rol: 'student'
      };

      nock(url)
        .get('/login')
        .matchHeader('Authorization', context.accessToken)
        .reply(200, userProfile);

      response = await usersClient.login({ context });
    });

    it('status is Not found', () => expect(response).to.be.deep.equal(userProfile));
  });

  describe('signUp() function', () => {
    let userProfile;

    beforeEach(async () => {
      userProfile = {
        name: 'Pride',
        rol: 'student'
      };

      nock(url)
        .post('/signup', userProfile)
        .matchHeader('Authorization', context.accessToken)
        .reply(200, userProfile);

      response = await usersClient.signup({ context, ...userProfile });
    });

    it('status is Not found', () => expect(response).to.be.deep.equal(userProfile));
  });
});
