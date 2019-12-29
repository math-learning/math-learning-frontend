import fetch from 'node-fetch';

import requestUtils from './requestUtils';
import confs from '../configs/variables';

const { url } = confs.services.exercises;

const createExercise = async ({
  context,
  courseId,
  guideId,
  exercise
}) => {
  const profileUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises`;

  const response = await fetch(profileUrl, {
    method: 'post',
    body: JSON.stringify(exercise),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const getExercise = async ({
  context,
  courseId,
  guideId,
  exerciseId
}) => {
  const profileUrl = `${url}/courses/${courseId}/guides/${guideId}/user/exercises/${exerciseId}`;

  const response = await fetch(profileUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const resolveExercise = async ({
  context,
  courseId,
  guideId,
  exerciseId,
  stepList,
  problemInput,
  lastExpression,
  currentExpression
}) => {
  const profileUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}/resolve`;

  const response = await fetch(profileUrl, {
    method: 'post',
    body: JSON.stringify({
      stepList,
      problemInput,
      lastExpression,
      currentExpression
    }),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const getExercises = async ({
  context,
  courseId,
  guideId,
}) => {
  const exercisesUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises`;
  const response = await fetch(exercisesUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });
  return requestUtils.processResponse(response);
};

export default {
  createExercise,
  getExercises,
  getExercise,
  resolveExercise
};
