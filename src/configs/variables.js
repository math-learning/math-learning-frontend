const isProd = () => process.env.NODE_ENV === 'production';

const configs = {
  credentials: {
    google: {
      clientId: '830601201956-ggqc86gjm10ha6g6tbdmorh48cd1jdod.apps.googleusercontent.com'
    }
  },
  services: {
    // TODO: take urls from ENV vars
    users: {
      url: isProd() ? 'https://math-learning-users-service.herokuapp.com' : 'http://0.0.0.0:7000'
    },
    courses: {
      url: isProd() ? 'https://math-learning-courses-service.herokuapp.com' : 'http://0.0.0.0:5001'
    },
    exercises: {
      url: isProd() ? 'https://exercises-service.herokuapp.com' : 'http://0.0.0.0:9000'
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
    exercise: ({ courseId, guideId, exerciseId }) => `/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}`,
    userExercise: ({ courseId, guideId, exerciseId, userId }) => `/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}?userId=${userId}`,
    courseGuide: (courseId, guideId) => `/courses/${courseId}/guides/${guideId}`,
    createExerciseGuide: (courseId, guideId) => `/courses/${courseId}/guides/${guideId}/create-exercise`,
    courseUserGuide: (courseId, guideId, userId) => (
      userId
        ? `/courses/${courseId}/guides/${guideId}?userId=${userId}`
        : `/courses/${courseId}/guides/${guideId}`
    ),
    courseUsers: (courseId) => `/courses/${courseId}/users`,
    courseStatistics: (courseId) => `/courses/${courseId}/statistics`
  }
};

module.exports = configs;
