import fetch from 'node-fetch';

import requestUtils from './requestUtils';
import confs from '../configs/variables';

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

const signup = async ({ context, name, role }) => {
  const profileUrl = `${url}/signup`;

  const response = await fetch(profileUrl, {
    method: 'post',
    body: JSON.stringify({ name, role }),
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
