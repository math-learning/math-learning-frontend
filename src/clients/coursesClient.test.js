import nock from 'nock';
import { expect } from 'chai';
import confs from '../configs/variables';
import coursesClient from './coursesClient';

const { url } = confs.services.courses;

describe('courses client', () => {
  let context;
  let response;

  beforeEach(() => {
    context = {
      accessToken: 'token'
    };
  });

  describe('getCourses() function', () => {
    let course;

    beforeEach(async () => {
      course = {
        name: 'Analisis matematico II - Curso 2'
      };

      nock(url)
        .get('/courses')
        .matchHeader('Authorization', context.accessToken)
        .reply(200, course);

      response = await coursesClient.getCourses({ context });
    });

    it('exercise is created', () => expect(response).to.be.deep.equal(course));
  });
});