import axios from 'axios' // TODO: CAMBIAR DE LIBRARY POR FETCH

const confs = require("../configs/variables")
const serverUrl = confs.serverUrl;


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
  step.theorems = [{ // TODO: ESTO NO DEBERIA ESTAR ACA
    name: "derivada de la suma",
    left: "Derivative(f(x) + g(x) , x)",
    right: "Derivative(f(x), x) + Derivative(g(x), x)"
  },
  {
    name: "derivada del producto",
    left: "Derivative(f(x) * g(x) , x)",
    right: "Derivative(f(x), x) * g(x) + Derivative(g(x), x) * f(x)"
  },
  {
    name: "derivada de la division",
    left: "Derivative(f(x) / g(x) , x)",
    right: "Derivative(( f(x), x) * g(x) - Derivative(g(x), x) * f(x)) / ( g(x)** 2)"
  }]

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
