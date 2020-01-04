import { expect } from 'chai';
import reducer from './reducers';
import * as types from './actionTypes';

describe('courses reducer', () => {
  let initialState;

  describe('should handle GET_COURSES_SUCCESS', () => {
    let courses;
    let finalState;

    describe('when there was nothing in the state', () => {
      beforeEach(() => {
        courses = [{ courseId: 'course-id' }];
        initialState = { data: { own: { courses: [], isLoadingCourses: true } } };

        finalState = reducer(initialState, {
          type: types.GET_COURSES_SUCCESS,
          courses
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              own: {
                courses,
                isLoadingCourses: false
              }
            }
          }
        );
      });
    });
  });

  describe('should handle LIST_COURSES_REQUEST', () => {
    let finalState;

    describe('when there was nothing in the state', () => {
      beforeEach(() => {
        initialState = { data: { list: { courses: [{ courseId: 'course-id' }], isLoadingCourses: true } } };

        finalState = reducer(initialState, {
          type: types.LIST_COURSES_REQUEST
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              list: {
                ...initialState.data.list,
                isLoadingCourses: true
              }
            }
          }
        );
      });
    });
  });

  describe('should handle LIST_COURSES_SUCCESS', () => {
    let courses;
    let finalState;

    describe('when there was nothing in the state', () => {
      beforeEach(() => {
        courses = [{ courseId: 'course-id' }];
        initialState = { data: { list: { courses: [], isLoadingCourses: true } } };

        finalState = reducer(initialState, {
          type: types.LIST_COURSES_SUCCESS,
          courses
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              list: {
                courses,
                isLoadingCourses: false
              }
            }
          }
        );
      });
    });
  });

  describe('should handle CREATE_COURSE_SUCCESS', () => {
    let existingCourses;
    let course;
    let finalState;

    describe('when there was nothing in the state', () => {
      beforeEach(() => {
        course = { courseId: 'new-course' };
        existingCourses = [{ courseId: 'course-id' }];
        initialState = { data: { own: { courses: existingCourses, isLoadingCourses: false } } };

        finalState = reducer(initialState, {
          type: types.CREATE_COURSE_SUCCESS,
          course
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              own: {
                courses: [
                  course,
                  ...existingCourses
                ],
                isLoadingCourses: false
              },
              detail: {
                [course.courseId]: {
                  ...course,
                  isLoading: false
                }
              }
            }
          }
        );
      });
    });
  });
});
