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

export default {
  createExercise
};
