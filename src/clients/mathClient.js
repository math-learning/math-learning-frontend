import axios from 'axios'

const confs = require("../configs/variables")
const serverUrl = confs.serverUrl;


const validateNotInHistory = async (newExpression, history) => {
  const requestData = { history, new_expression: newExpression };

  const response = await axios.post(serverUrl + '/validations/not-in-history', requestData);
  return response.data;
}

const validateStep = async (step) => {
  const response = await axios.post(serverUrl + '/validations/new-step', step);
  return response.data;
}

const validateResult = async (result) => {
  const response = await axios.post(serverUrl + '/validations/result', result);
  return response.data;
}

const getTheoremes = async (expression, theorems) => {
  const requestData = { expression, theorems };

  const response = await axios.post(serverUrl + '/hints/theorems-that-apply', requestData);
  return response.data;
}


export default {
  getTheoremes,
  validateNotInHistory,
  validateStep,
  validateResult,
}
