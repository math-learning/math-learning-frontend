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
    exercises: {
      url: 'http://0.0.0.0:9000'
    }
  },
  paths: {
    courses: '/courses'
  },
  // serverUrl: "http://0.0.0.0:5000"
  serverUrl: 'https://math-solver.herokuapp.com'
};

module.exports = configs;
