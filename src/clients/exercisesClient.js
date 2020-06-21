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
  userId,
  exerciseId
}) => {
  const exerciseUrl = userId
    ? `${url}/courses/${courseId}/guides/${guideId}/user/${userId}/exercises/${exerciseId}`
    : `${url}/courses/${courseId}/guides/${guideId}/user/exercises/${exerciseId}`;

  const response = await fetch(exerciseUrl, {
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

const evaluateExercise = async ({
  context,
  courseId,
  guideId,
  exercise
}) => {
  const profileUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/evaluate`;

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

const updateUserExercise = async ({
  context,
  courseId,
  guideId,
  userId,
  exerciseId,
  calification
}) => {
  const exercisesUrl = userId
    ? `${url}/courses/${courseId}/guides/${guideId}/user/${userId}/exercises/${exerciseId}`
    : `${url}/courses/${courseId}/guides/${guideId}/user/exercises/${exerciseId}`;

  const response = await fetch(exercisesUrl, {
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

const getExerciseStepCount = async ({ context, courseId }) => {
  const exerciseUrl = `${url}/courses/${courseId}/steps/statistics`;
  const response = await fetch(exerciseUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const getUsersQualifications = async ({ context, courseId }) => {
  const exerciseUrl = `${url}/courses/${courseId}/qualifications/statistics`;
  const response = await fetch(exerciseUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const checkPipelineStatus = async ({ context, courseId, guideId, exerciseId }) => {
  const exerciseUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}/status`;
  const response = await fetch(exerciseUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const getAllResolutions = async ({ context, courseId, guideId, exerciseId }) => {
  const exerciseUrl = `${url}/courses/${courseId}/guides/${guideId}/user/exercises/${exerciseId}/resolutions`;

  const response = await fetch(exerciseUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const doubleCourse = async ({ context, course, sourceCourseId }) => {
  const exerciseUrl = `${url}/courses/${sourceCourseId}/double`;

  const response = await fetch(exerciseUrl, {
    method: 'post',
    body: JSON.stringify({
      targetCourseId: course.courseId
    }),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

export default {
  addUserToCourse,
  checkPipelineStatus,
  createExercise,
  deliverExercise,
  doubleCourse,
  evaluateExercise,
  getExercise,
  getExercises,
  getExerciseErrors,
  getExerciseStepCount,
  getAllResolutions,
  getUsersQualifications,
  updateUserExercise,
  removeExerciseStep,
  resolveExercise,
  deleteExercise,
  updateExerciseAsProfessor,
};
