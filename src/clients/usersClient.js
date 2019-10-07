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
  return response.json();
};

const signup = async ({ context, name, rol }) => {
  const profileUrl = `${url}/signup`;

  let response;
  try {
    response = await fetch(profileUrl, {
      method: 'post',
      body: JSON.stringify({ name, rol }),
      headers: {
        authorization: context.accessToken,
        'Content-Type': 'application/json'
      }
    });
  } catch (e) {
    console.log('Error while signing up', e);
    throw e;
  }
  return response.json();
};

export default {
  login,
  signup
};
