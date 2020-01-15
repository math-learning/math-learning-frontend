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

  describe('should handle UPDATE_COURSE_SUCCESS', () => {
    let course;
    let courseId;
    let updatedCourse;
    let finalState;

    beforeEach(() => {
      courseId = 'course-id';
      course = { courseId, name: 'name' };
      updatedCourse = { courseId, name: 'new name' };

      initialState = {
        data: {
          detail: {
            [course.courseId]: course
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.UPDATE_COURSE_SUCCESS,
        course: updatedCourse
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            detail: {
              [course.courseId]: {
                ...updatedCourse,
                isLoading: false
              }
            }
          }
        }
      );
    });
  });

  describe('should handle JOIN_COURSE_SUCCESS', () => {
    let newCourse;
    let finalState;

    beforeEach(() => {
      newCourse = { courseId: 'course-id' };

      initialState = {
        data: {
          own: {
            courses: []
          },
          list: {
            courses: [newCourse]
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.JOIN_COURSE_SUCCESS,
        course: newCourse
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            own: {
              courses: [newCourse]
            },
            list: {
              courses: []
            }
          }
        }
      );
    });
  });

  describe('should handle DELETE_COURSE_REQUEST', () => {
    let courseId;
    let existingCourse;
    let finalState;

    beforeEach(() => {
      courseId = 'course-id';
      existingCourse = { courseId };

      initialState = {
        data: {
          own: {
            courses: [existingCourse]
          },
          detail: {
            [courseId]: existingCourse
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.DELETE_COURSE_REQUEST,
        courseId
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            own: {
              courses: []
            },
            detail: {}
          }
        }
      );
    });
  });
});
