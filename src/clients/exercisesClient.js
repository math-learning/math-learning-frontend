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

const deliverExercise = async ({
  context,
  courseId,
  guideId,
  exerciseId
}) => {
  const profileUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}/deliver`;

  const response = await fetch(profileUrl, {
    method: 'put',
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
  currentExpression
}) => {
  const profileUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}/resolve`;

  const response = await fetch(profileUrl, {
    method: 'post',
    body: JSON.stringify({
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

const addUserToCourse = async ({
  context,
  courseId,
  userId
}) => {
  const profileUrl = `${url}/courses/${courseId}/users`;

  const response = await fetch(profileUrl, {
    method: 'post',
    body: JSON.stringify({ userId }),
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

const updateExerciseAsProfessor = async ({
  context,
  courseId,
  guideId,
  exerciseId,
  exercise
}) => {
  const requestUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}`;
  const response = await fetch(requestUrl, {
    method: 'put',
    body: JSON.stringify(_.omitBy({ ...exercise }, _.isNil)),
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
  userId
}) => {
  const exercisesUrl = userId
    ? `${url}/courses/${courseId}/guides/${guideId}/user/${userId}/exercises`
    : `${url}/courses/${courseId}/guides/${guideId}/user/exercises`;

  const response = await fetch(exercisesUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const deleteExercise = async ({
  context, courseId, guideId, exerciseId
}) => {
  const exerciseUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}`;
  const response = await fetch(exerciseUrl, {
    method: 'delete',
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const getExerciseErrors = async ({ context, courseId }) => {
  const exerciseUrl = `${url}/courses/${courseId}/errors/statistics`;
  const response = await fetch(exerciseUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

export default {
  addUserToCourse,
  createExercise,
  deliverExercise,
  getExercise,
  getExercises,
  getExerciseErrors,
  updateExercise,
  removeExerciseStep,
  resolveExercise,
  deleteExercise,
  updateExerciseAsProfessor,
};
