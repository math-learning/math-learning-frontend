import { expect } from 'chai';
import reducer from './reducers';
import * as types from './actionTypes';
import * as courseTypes from '../courses/actionTypes';

describe('guides reducer', () => {
  let guideId;
  let courseId;
  let initialState;

  beforeEach(() => {
    guideId = 'guide-id';
    courseId = 'course-id';
  });

  describe('should handle CREATE_GUIDE_SUCCESS', () => {
    let guide;
    let finalState;

    describe('when there was nothing in the state', () => {
      beforeEach(() => {
        guide = { courseId, guideId, name: 'name' };
        initialState = { data: { detail: {}, list: { [courseId]: [] } } };

        finalState = reducer(initialState, {
          type: types.CREATE_GUIDE_SUCCESS,
          courseId,
          guide
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              detail: {
                [`${courseId}/${guideId}`]: guide
              },
              list: {
                [courseId]: [guide]
              },
              isLoadingCreatingGuide: false
            }
          }
        );
      });
    });
  });

  describe('should handle UPDATE_GUIDE_SUCCESS', () => {
    let guide;
    let guideToUpdate;
    let finalState;

    describe('when there was the guide in the state', () => {
      beforeEach(() => {
        guide = { courseId, guideId, name: 'name' };
        guideToUpdate = { courseId, guideId, name: 'new name' };
        initialState = {
          data: {
            detail: {
              [`${courseId}/${guideId}`]: guide
            },
            list: {
              [courseId]: [guide]
            }
          }
        };

        finalState = reducer(initialState, {
          type: types.UPDATE_GUIDE_SUCCESS,
          courseId,
          guideId,
          guide: guideToUpdate
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              detail: {
                [`${courseId}/${guideId}`]: guideToUpdate
              },
              list: {
                [courseId]: [guideToUpdate]
              }
            }
          }
        );
      });
    });
  });

  describe('should handle DELETE_GUIDE_SUCCESS', () => {
    let guide;
    let finalState;

    describe('when there was the guide in the state', () => {
      beforeEach(() => {
        guide = { courseId, guideId, name: 'name' };
        initialState = {
          data: {
            detail: {
              [`${courseId}/${guideId}`]: guide
            },
            list: {
              [courseId]: [guide]
            }
          }
        };

        finalState = reducer(initialState, {
          type: types.DELETE_GUIDE_REQUEST,
          courseId,
          guideId
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              detail: {},
              list: {
                [courseId]: []
              }
            }
          }
        );
      });
    });
  });

  describe('should handle GET_GUIDES_SUCCESS', () => {
    let guides;
    let finalState;

    describe('when there was nothing in the state', () => {
      beforeEach(() => {
        guides = [{ courseId, guideId, name: 'name' }, { courseId, guideId: 'second', name: 'name' }];
        initialState = { data: { detail: {}, list: {} } };

        finalState = reducer(initialState, {
          type: types.GET_GUIDES_SUCCESS,
          guides,
          courseId
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              detail: {
                [`${courseId}/${guides[0].guideId}`]: guides[0],
                [`${courseId}/${guides[1].guideId}`]: guides[1]
              },
              list: {
                [courseId]: guides
              },
              isLoadingGuides: false
            }
          }
        );
      });
    });
  });

  describe('should handle GET_COURSE_DETAIL_SUCCESS', () => {
    let guides;
    let course;
    let finalState;

    describe('when there was nothing in the state', () => {
      beforeEach(() => {
        guides = [{ courseId, guideId, name: 'name' }, { courseId, guideId: 'second', name: 'name' }];
        course = { courseId, guides };
        initialState = { data: { detail: {}, list: {} } };

        finalState = reducer(initialState, {
          type: courseTypes.GET_COURSE_DETAIL_SUCCESS,
          course
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              detail: {
                [`${courseId}/${guides[0].guideId}`]: guides[0],
                [`${courseId}/${guides[1].guideId}`]: guides[1]
              },
              list: {
                [courseId]: guides
              },
              isLoadingGuides: false
            }
          }
        );
      });
    });
  });

  describe('should handle CREATE_COURSE_SUCCESS', () => {
    let course;
    let finalState;

    describe('when there was nothing in the state', () => {
      beforeEach(() => {
        course = { courseId };
        initialState = { data: { detail: {}, list: {} } };

        finalState = reducer(initialState, {
          type: courseTypes.CREATE_COURSE_SUCCESS,
          course
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              detail: {},
              list: {
                [courseId]: []
              },
              isLoadingGuides: false
            }
          }
        );
      });
    });
  });
});
