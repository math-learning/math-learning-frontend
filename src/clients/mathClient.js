import axios from 'axios';
import { latexParser } from 'latex-parser';
import { cleanLatex } from '../utils/latexUtils';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

const confs = require('../configs/variables');

const { serverUrl } = confs;

const theorems = require('./theorems.json');

const validateNotInHistory = async (newExpression, history) => {
  const requestData = { history, new_expression: newExpression };

  try {
    const response = await axios.post(`${serverUrl}/validations/not-in-history`, requestData);
    return response.data;
  } catch (e) {
    console.log('Error while validating not in history', e);
    throw e;
  }
};

const validateStep = async (step) => {
  const stepToSend = step;

  stepToSend.theorems = theorems.theorems;
  try {
    const response = await axios.post(`${serverUrl}/validations/new-step`, stepToSend);
    return response.data;
  } catch (e) {
    console.log('Error while validating step', e);
    throw e;
  }
};

const compareExpressions = async (expressionOne, expressionTwo) => {
  try {
    const data = {
      expression_one: cleanLatex(expressionOne),
      expression_two: cleanLatex(expressionTwo),
    };
    const response = await axios.post(`${serverUrl}/expressions/compare`, data);
    return response.data;
  } catch (e) {
    console.log('Error while comparing expressions', e);
    throw e;
  }
};

const validateResult = async (result) => {
  try {
    const response = await axios.post(`${serverUrl}/validations/result`, result);
    return response.data;
  } catch (e) {
    console.log('Error while validating result', e);
    throw e;
  }
};

const getTheoremes = async (expression, definedTheorems) => {
  const requestData = { expression, theorems: definedTheorems };

  try {
    const response = await axios.post(`${serverUrl}/hints/theorems-that-apply`, requestData);
    return response.data;
  } catch (e) {
    console.log('Error while getting theoremes', e);
    throw e;
  }
};

const solveExercise = async (expression) => {
  try {
    console.log(latexParser.parse(expression));
    const requestData = { expression: cleanLatex(expression) };
    const response = await axios.post(`${serverUrl}/solve-derivative`, requestData);
    return response.data;
  } catch (e) {
    console.log('Error while solving exercise', e);
    throw e;
  }
};

export default {
  getTheoremes,
  validateNotInHistory,
  validateStep,
  validateResult,
  compareExpressions,
  solveExercise,
};
