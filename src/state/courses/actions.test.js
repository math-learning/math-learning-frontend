import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as types from './actionTypes';
import * as actions from './actions';
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
});
