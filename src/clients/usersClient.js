const fetch = require('node-fetch');

const confs = require('../configs/variables');

const { url } = confs.services.users;

const login = async ({ context }) => {
  const profileUrl = `${url}/login`;

  const response = await fetch(profileUrl, {
    headers: {
      authorization: context.token
    }
  });
  return { status: response.status, body: await response.json() };
};

const signup = async ({ context, name, type }) => {
  const profileUrl = `${url}/signup`;

  let response;
  try {
    response = await fetch(profileUrl, {
      method: 'post',
      body: JSON.stringify({ name, type }),
      headers: {
        authorization: context.token,
        'Content-Type': 'application/json'
      }
    });
  } catch (e) {
    console.log('Error while signing up', e);
    throw e;
  }
  return { status: response.status, body: await response.json() };
};

export default {
  login,
  signup
};
