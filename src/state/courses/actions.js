import * as types from './actionTypes';
import * as modalActions from '../modals/actions';
import * as selectors from './selectors';

import exercisesClient from '../../clients/exercisesClient';

export function getCoursesSuccess({ courses }) {
  return {
    type: types.GET_COURSES_SUCCESS,
    courses
  };
}

export function getCourses() {
  return async (dispatch, getState) => {
    console.log('GET COURSES')
    const state = getState();
    const context = selectors.context(state);

    try {
      // const courses = await coursesClient.getCourses({ context });
      const courses = [
        {
          name: 'Analisis matematico II - Curso 2',
          professors: [
            'Pedro',
            'Pedro2'
          ]
        },
        {
          name: 'Analisis matematico Infinito - Curso 3',
          professors: [
            'Juan Manuel Fernandez Caeiro',
            'Pedro',
            'Pedro',
            'Pedro',
            'Pedro',
            'Pedro2'
          ]
        },
        {
          name: 'Fisica II - Curso 2',
          professors: [
            'Pedro',
            'Pedro2'
          ]
        },
        {
          name: 'Algebra II - Curso 3',
          professors: [
            'Pedro',
            'Pedro2'
          ]
        }
      ];

      dispatch(getCoursesSuccess({ courses }));
    } catch (err) {
      // dispatch(modalActions.showError(err.message));
    }
  };
}
