import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as types from './actionTypes';
import * as actions from './actions';
import * as modalTypes from '../modals/actionTypes';
import coursesClient from '../../clients/coursesClient';

const mockStore = configureMockStore([thunk]);

describe('courses actions', () => {
  let store;
  let expectedActions;

  beforeEach(() => {
    store = mockStore({
      common: {
        data: {}
      }
    });
  });

  describe('getCourses() function', () => {
    let courses;

    describe('when the exercise is created successfully', () => {
      beforeEach(() => {
        courses = [];
        expectedActions = [
          {
            type: types.GET_COURSES_SUCCESS,
            courses
          }
        ];
        sandbox
          .stub(coursesClient, 'getCourses')
          .callsFake(() => courses);

        return store.dispatch(actions.getCourses({}));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('createCourse() function', () => {
    let course;
    let courseId;

    describe('when the course is created successfully', () => {
      beforeEach(() => {
        courseId = 'course-id';
        course = { courseId };
        expectedActions = [
          {
            type: types.CREATE_COURSE_SUCCESS,
            course
          },
          { type: modalTypes.HIDE_MODAL },
          {
            payload: {
              args: [
                `/courses/${courseId}`
              ],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];
        sandbox
          .stub(coursesClient, 'createCourse')
          .callsFake(() => course);

        return store.dispatch(actions.createCourse({ course }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });
});
