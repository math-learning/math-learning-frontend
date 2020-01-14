const { NODE_ENV } = process.env;
const TEST_ENV = 'test';

const onError = (message, err) => {
  if (err.stack && NODE_ENV !== TEST_ENV) {
    console.log(message, err.stack);
  } else if (NODE_ENV !== TEST_ENV) {
    console.log(message, err);
  }
};

const onLog = (message = '', details = '') => {
  if (NODE_ENV !== TEST_ENV) {
    console.log(message, details);
  }
};

module.exports = {
  onError,
  onLog
};
