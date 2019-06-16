import axios from 'axios' // TODO: CAMBIAR DE LIBRARY POR FETCH
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

const confs = require("../configs/variables")
const serverUrl = confs.serverUrl;

let theorems = require('./theorems.json');// TODO: Esto no deberia estar aca

const validateNotInHistory = async (newExpression, history) => {
  const requestData = { history, new_expression: newExpression };

  try {
    const response = await axios.post(serverUrl + '/validations/not-in-history', requestData);
    return response.data;
  } catch (e) {
    console.log('Error while validating not in history', e);
    throw e;
  }
}

const validateStep = async (step) => {
  step.theorems = theorems['theorems'];// TODO: Esto no deberia estar aca
  try {
    const response = await axios.post(serverUrl + '/validations/new-step', step);
    return response.data;
  } catch (e) {
    console.log('Error while validating step', e);
    throw e;
  }
}

const validateResult = async (result) => {
  try {
    const response = await axios.post(serverUrl + '/validations/result', result);
    return response.data;
  } catch (e) {
    console.log('Error while validating result', e);
    throw e;
  }
}

const getTheoremes = async (expression, theorems) => {
  const requestData = { expression, theorems };

  try {
    const response = await axios.post(serverUrl + '/hints/theorems-that-apply', requestData);
    return response.data;
  } catch (e) {
    console.log('Error while getting theoremes', e);
    throw e;
  }
}


export default {
  getTheoremes,
  validateNotInHistory,
  validateStep,
  validateResult,
}
