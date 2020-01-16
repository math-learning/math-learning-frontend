import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as actions from './actions';
import * as modalTypes from '../modals/actionTypes';
import guidesClient from '../../clients/guidesClient';

const mockStore = configureMockStore([thunk]);

describe('guides actions', () => {
  let store;
  let guideId;
  let courseId;
  let expectedActions;

  beforeEach(() => {
    guideId = 'guide-id';
    courseId = 'course-id';
    store = mockStore({
      common: {
        data: {}
      }
    });
  });

  describe('createGuide() function', () => {
    let name;
    let guide;
    let description;

    describe('when the guide is created successfully', () => {
      beforeEach(() => {
        name = 'name';
        description = 'description';
        guide = {
          courseId, guideId, name, description
        };
        expectedActions = [
          {
            type: types.CREATE_GUIDE_REQUEST,
            courseId
          },
          {
            type: types.CREATE_GUIDE_SUCCESS,
            courseId,
            guide
          },
          {
            payload: {
              args: [
                `/courses/${courseId}/guides/${guideId}`
              ],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];
        sandbox
          .stub(guidesClient, 'createGuide')
          .callsFake(() => guide);

        return store.dispatch(actions.createGuide({ courseId, name, description }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('updateGuide() function', () => {
    let name;
    let guide;
    let currentGuide;
    let description;

    describe('when the guide is updated successfully', () => {
      beforeEach(() => {
        name = 'name';
        description = 'description';
        currentGuide = {
          courseId, guideId, name: 'new-name', description: 'new-desc'
        };
        guide = {
          courseId, guideId, name, description
        };
        store = mockStore({
          common: {
            data: {}
          },
          guides: {
            data: {
              detail: {
                [`${courseId}/${guideId}`]: currentGuide
              }
            }
          }
        });
        expectedActions = [
          {
            type: types.UPDATE_GUIDE_SUCCESS,
            courseId,
            guide
          }
        ];
        sandbox
          .stub(guidesClient, 'updateGuide')
          .callsFake(() => guide);

        return store.dispatch(actions.updateGuide({
          courseId, guideId, name, description
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });

    describe('when fails', () => {
      beforeEach(() => {
        name = 'name';
        description = 'description';
        currentGuide = {
          courseId, guideId, name: 'new-name', description: 'new-desc'
        };
        guide = {
          courseId, guideId, name, description
        };
        store = mockStore({
          common: {
            data: {}
          },
          guides: {
            data: {
              detail: {
                [`${courseId}/${guideId}`]: currentGuide
              }
            }
          }
        });
        expectedActions = [
          {
            type: types.UPDATE_GUIDE_SUCCESS,
            courseId,
            guide
          },
          {
            type: types.UPDATE_GUIDE_SUCCESS,
            courseId,
            guide: currentGuide
          }
        ];
        sandbox
          .stub(guidesClient, 'updateGuide')
          .callsFake(() => {
            throw new Error();
          });

        return store.dispatch(actions.updateGuide({
          courseId, guideId, name, description
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('getGuides() function', () => {
    let guides;

    describe('when the guides are fetched successfully', () => {
      beforeEach(() => {
        guides = [];
        expectedActions = [
          {
            type: types.GET_GUIDES_REQUEST
          },
          {
            type: types.GET_GUIDES_SUCCESS,
            courseId,
            guides
          }
        ];
        sandbox
          .stub(guidesClient, 'getGuides')
          .callsFake(() => guides);

        return store.dispatch(actions.getGuides({ courseId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('selectGuide() function', () => {
    describe('when the guide is selected successfully', () => {
      beforeEach(() => {
        expectedActions = [
          {
            payload: {
              args: [
                `/courses/${courseId}/guides/${guideId}`
              ],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];

        return store.dispatch(actions.selectGuide({ courseId, guideId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('deleteGuide() function', () => {
    describe('when the course is deleted successfully', () => {
      beforeEach(() => {
        expectedActions = [
          {
            type: types.DELETE_GUIDE_REQUEST,
            courseId,
            guideId
          },
          { type: modalTypes.HIDE_MODAL }
        ];
        sandbox
          .stub(guidesClient, 'deleteGuide')
          .callsFake(() => {});

        return store.dispatch(actions.deleteGuide({ courseId, guideId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });
});
