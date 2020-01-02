const configs = {
  credentials: {
    google: {
      clientId: '830601201956-ggqc86gjm10ha6g6tbdmorh48cd1jdod.apps.googleusercontent.com'
    }
  },
  services: {
    users: {
      url: 'http://0.0.0.0:7000'
    },
    courses: {
      url: 'http://0.0.0.0:5001'
    },
    exercises: {
      url: 'http://0.0.0.0:9000'
    }
  },
  paths: {
    main: '/',
    courses: '/courses',
    coursesSearch: '/courses/search',
    courseGuide: '/courses/:courseId/guides/:guideId',
    course: '/courses/:courseId',
    statistics: '/statistics'
  },
  pathGenerators: {
    course: (courseId) => `/courses/${courseId}`,
    courseGuide: (courseId, guideId) => `/courses/${courseId}/guides/${guideId}`,
    courseUsers: (courseId) => `/courses/${courseId}/users`,
  },
  // serverUrl: "http://0.0.0.0:5000"
  serverUrl: 'https://math-solver.herokuapp.com'
};

module.exports = configs;
