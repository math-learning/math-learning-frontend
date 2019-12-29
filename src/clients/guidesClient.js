import fetch from 'node-fetch';

import requestUtils from './requestUtils';
import confs from '../configs/variables';

const { url } = confs.services.courses;

const createGuide = async ({
  context,
  courseId,
  guideName,
  guideDescription,
}) => {
  const createGuideUrl = `${url}/courses/${courseId}/guides/`;
  const response = await fetch(createGuideUrl, {
    method: 'post',
    body: JSON.stringify({ name: guideName, description: guideDescription }),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });
  return requestUtils.processResponse(response);
};

const updateGuide = async ({
  context,
  courseId,
  guideId,
  guideName,
  guideDescription,
}) => {
  const createGuideUrl = `${url}/courses/${courseId}/guides/${guideId}`;
  const response = await fetch(createGuideUrl, {
    method: 'put',
    body: JSON.stringify({ name: guideName, description: guideDescription }),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });
  return requestUtils.processResponse(response);
};

const getGuides = async ({
  context,
  courseId,
}) => {
  const getGuidesUrl = `${url}/courses/${courseId}/guides/`;
  const response = await fetch(getGuidesUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });
  return requestUtils.processResponse(response);
};

export default {
  createGuide,
  updateGuide,
  getGuides,
};
