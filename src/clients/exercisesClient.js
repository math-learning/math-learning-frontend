import _ from 'lodash';
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
  currentExpression
}) => {
  const profileUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}/resolve`;

  const response = await fetch(profileUrl, {
    method: 'post',
    body: JSON.stringify({
      stepList,
      currentExpression
    }),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const removeExerciseStep = async ({
  context,
  courseId,
  guideId,
  exerciseId
}) => {
  const profileUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}/step`;

  const response = await fetch(profileUrl, {
    method: 'delete',
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const updateExercise = async ({
  context,
  courseId,
  guideId,
  exerciseId,
  calification
}) => {
  const profileUrl = `${url}/courses/${courseId}/guides/${guideId}/user/exercises/${exerciseId}`;

  const response = await fetch(profileUrl, {
    method: 'put',
    body: JSON.stringify(_.omitBy({ calification }, _.isNil)),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

export default {
  createExercise,
  getExercise,
  updateExercise,
  removeExerciseStep,
  resolveExercise
};
