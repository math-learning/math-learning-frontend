import fetch from 'node-fetch';

import requestUtils from './requestUtils';
import confs from '../configs/variables';

const { url } = confs.services.courses;

const updateCourse = async ({
  course,
  context,
}) => {
  const updateUrl = `${url}/courses/${course.courseId}`;
  const response = await fetch(updateUrl, {
    method: 'PUT',
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(course),
  });
  return requestUtils.processResponse(response);
};

const getCourses = async ({
  context
}) => {
  const profileUrl = `${url}/courses`;

  const response = await fetch(profileUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const getCourse = async ({
  context,
  courseId
}) => {
  const courseUrl = `${url}/courses/${courseId}`;

  const response = await fetch(courseUrl, {
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
  password,
  userId,
  role
}) => {
  const profileUrl = `${url}/courses/${courseId}/users`;

  const response = await fetch(profileUrl, {
    method: 'post',
    body: JSON.stringify({ role, userId, password }),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const searchCourses = async ({
  context,
  search
}) => {
  const profileUrl = `${url}/courses/search?search=${search}`;

  const response = await fetch(profileUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const createCourse = async ({
  context,
  course
}) => {
  const profileUrl = `${url}/courses`;

  const response = await fetch(profileUrl, {
    method: 'post',
    body: JSON.stringify(course),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

export default {
  createCourse,
  getCourses,
  getCourse,
  addUserToCourse,
  searchCourses,
  updateCourse,
};
