import requestUtils from './requestUtils';

const fetch = require('node-fetch');
const confs = require('../configs/variables');

const { url } = confs.services.users;

const login = async ({ context }) => {
  const profileUrl = `${url}/login`;

  const response = await fetch(profileUrl, {
    headers: {
      Authorization: context.accessToken
    }
  });

  return requestUtils.processResponse(response);
};

const signup = async ({ context, name, rol }) => {
  const profileUrl = `${url}/signup`;

  const response = await fetch(profileUrl, {
    method: 'post',
    body: JSON.stringify({ name, rol }),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

export default {
  login,
  signup
};
