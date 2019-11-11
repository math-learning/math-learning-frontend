import nock from 'nock';
import { expect } from 'chai';
import confs from '../configs/variables';
import exercisesClient from './exercisesClient';

const { url } = confs.services.exercises;

describe('exercises client', () => {
  let context;
  let response;

  beforeEach(() => {
    context = {
      accessToken: 'token'
    };
  });

  describe('createExercise() function', () => {
    let exercise;
    let courseId;
    let guideId;

    beforeEach(async () => {
      courseId = 'course-id';
      guideId = 'guide-id';
      exercise = {
        name: 'Pride',
        type: 'integral',
        difficulty: 'medium'
      };

      nock(url)
        .post(`/courses/${courseId}/guides/${guideId}/exercises`)
        .matchHeader('Authorization', context.accessToken)
        .reply(200, exercise);

      response = await exercisesClient.createExercise({
        context,
        guideId,
        courseId,
        exercise
      });
    });

    it('exercise is created', () => expect(response).to.be.deep.equal(exercise));
  });
});
