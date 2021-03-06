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

  describe('evaluateExercise() function', () => {
    let exercise;
    let courseId;
    let guideId;

    beforeEach(async () => {
      courseId = 'course-id';
      guideId = 'guide-id';
      exercise = {
        problemInput: 'x',
        type: 'integral'
      };

      nock(url)
        .post(`/courses/${courseId}/guides/${guideId}/exercises/evaluate`)
        .matchHeader('Authorization', context.accessToken)
        .reply(200, {});

      response = await exercisesClient.evaluateExercise({
        context,
        guideId,
        courseId,
        exercise
      });
    });

    it('exercise is evaluated', () => expect(response).to.be.deep.equal({}));
  });

  describe('getExercise() function', () => {
    let exercise;
    let courseId;
    let guideId;
    let exerciseId;

    describe('for the current user', () => {
      beforeEach(async () => {
        courseId = 'course-id';
        guideId = 'guide-id';
        exerciseId = 'exercise-id';
        exercise = {
          name: 'Pride',
          type: 'integral',
          difficulty: 'medium'
        };

        nock(url)
          .get(`/courses/${courseId}/guides/${guideId}/user/exercises/${exerciseId}`)
          .matchHeader('Authorization', context.accessToken)
          .reply(200, exercise);

        response = await exercisesClient.getExercise({
          context,
          guideId,
          courseId,
          exerciseId
        });
      });

      it('exercise is getted', () => expect(response).to.be.deep.equal(exercise));
    });

    describe('for a particular user', () => {
      beforeEach(async () => {
        const userId = 'user';
        courseId = 'course-id';
        guideId = 'guide-id';
        exerciseId = 'exercise-id';
        exercise = {
          name: 'Pride',
          type: 'integral',
          difficulty: 'medium'
        };

        nock(url)
          .get(`/courses/${courseId}/guides/${guideId}/user/${userId}/exercises/${exerciseId}`)
          .matchHeader('Authorization', context.accessToken)
          .reply(200, exercise);

        response = await exercisesClient.getExercise({
          context,
          guideId,
          courseId,
          exerciseId,
          userId
        });
      });

      it('exercise is getted', () => expect(response).to.be.deep.equal(exercise));
    });
  });

  describe('getExercises() function', () => {
    let courseId;
    let guideId;
    let exercises;

    describe('for the current user', () => {
      beforeEach(async () => {
        courseId = 'course-id';
        guideId = 'guide-id';
        exercises = [];

        nock(url)
          .get(`/courses/${courseId}/guides/${guideId}/user/exercises`)
          .matchHeader('Authorization', context.accessToken)
          .reply(200, exercises);

        response = await exercisesClient.getExercises({
          context,
          guideId,
          courseId
        });
      });

      it('exercise is getted', () => expect(response).to.be.deep.equal(exercises));
    });

    describe('for a particular user', () => {
      beforeEach(async () => {
        const userId = 'user';
        courseId = 'course-id';
        guideId = 'guide-id';
        exercises = [];

        nock(url)
          .get(`/courses/${courseId}/guides/${guideId}/user/${userId}/exercises`)
          .matchHeader('Authorization', context.accessToken)
          .reply(200, exercises);

        response = await exercisesClient.getExercises({
          context,
          guideId,
          courseId,
          userId
        });
      });

      it('exercise is getted', () => expect(response).to.be.deep.equal(exercises));
    });
  });

  describe('resolveExercise() function', () => {
    let exerciseStatus;
    let courseId;
    let guideId;
    let exerciseId;
    let currentExpression;

    beforeEach(async () => {
      courseId = 'course-id';
      guideId = 'guide-id';
      exerciseId = 'exercise-id';
      currentExpression = '2';
      exerciseStatus = {
        status: 'resolved'
      };

      nock(url)
        .post(`/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}/resolve`, {
          currentExpression
        })
        .matchHeader('Authorization', context.accessToken)
        .reply(200, exerciseStatus);

      response = await exercisesClient.resolveExercise({
        context,
        courseId,
        guideId,
        exerciseId,
        currentExpression
      });
    });

    it('exercise is resolved', () => expect(response).to.be.deep.equal(exerciseStatus));
  });
});
