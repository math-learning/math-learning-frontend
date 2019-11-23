import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as types from './actionTypes';
import * as actions from './actions';
import * as modalTypes from '../modals/actionTypes';
import usersClient from '../../clients/usersClient';

const mockStore = configureMockStore([thunk]);

describe('common actions', () => {
  let store;
  let expectedActions;

  beforeEach(() => {
    store = mockStore({
      common: {
        data: {}
      }
    });
  });

  describe('login() function', () => {
    let userProfile;

    describe('when user exists', () => {
      beforeEach(() => {
        userProfile = {
          name: 'Pride',
          role: 'student'
        };
        expectedActions = [
          { type: types.LOGIN_SUCCESS, userProfile },
          { type: modalTypes.HIDE_MODAL },
          {
            payload: {
              args: [
                '/courses'
              ],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];
        sandbox
          .stub(usersClient, 'login')
          .callsFake(() => userProfile);

        return store.dispatch(actions.login());
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });

    describe('when user does not exist', () => {
      beforeEach(() => {
        expectedActions = [
          {
            type: modalTypes.SHOW_ERROR,
            error: 'El usuario asociado a la cuenta no existe. Debe crearlo previamente'
          }
        ];
        const error = new Error();
        error.status = 404;

        sandbox
          .stub(usersClient, 'login')
          .callsFake(() => Promise.reject(error));

        return store.dispatch(actions.login());
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('signUp() function', () => {
    let userProfile;

    describe('when user does not exist yet', () => {
      beforeEach(() => {
        userProfile = {
          name: 'Pride',
          role: 'student'
        };
        expectedActions = [
          { type: types.SIGNUP_SUCCESS, userProfile },
          { type: modalTypes.HIDE_MODAL },
          {
            payload: {
              args: [
                '/courses'
              ],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];
        sandbox
          .stub(usersClient, 'signup')
          .callsFake(() => userProfile);

        return store.dispatch(actions.signUp(userProfile));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });

    describe('when user already has an account', () => {
      beforeEach(() => {
        userProfile = {
          name: 'Pride',
          role: 'student'
        };
        expectedActions = [
          {
            type: modalTypes.SHOW_ERROR,
            error: 'El usuario que intenta crear ya existe. Pruebe utilizando otra cuenta'
          }
        ];
        const error = new Error();
        error.status = 409;

        sandbox
          .stub(usersClient, 'signup')
          .callsFake(() => Promise.reject(error));

        return store.dispatch(actions.signUp(userProfile));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });
});
