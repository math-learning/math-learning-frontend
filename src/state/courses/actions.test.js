import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import createError from 'http-errors';

import * as types from './actionTypes';
import * as actions from './actions';
import * as modalTypes from '../modals/actionTypes';
import coursesClient from '../../clients/coursesClient';
import exercisesClient from '../../clients/exercisesClient';

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

    describe('when the courses are fetched successfully', () => {
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

  describe('getCourse() function', () => {
    let course;
    let courseId;

    describe('when the course is fetched successfully', () => {
      beforeEach(() => {
        courseId = 'course-id';
        course = { courseId };
        expectedActions = [
          {
            type: types.GET_COURSE_DETAIL_SUCCESS,
            course
          }
        ];
        sandbox
          .stub(coursesClient, 'getCourse')
          .callsFake(() => course);

        return store.dispatch(actions.getCourse({ courseId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('updateCourse() function', () => {
    let name;
    let course;
    let courseId;

    describe('when the course is fetched successfully', () => {
      beforeEach(() => {
        name = 'name';
        courseId = 'course-id';
        course = { courseId };
        store = mockStore({
          common: {
            data: {}
          },
          courses: {
            data: {
              detail: {
                [courseId]: course
              }
            }
          }
        });
        expectedActions = [
          {
            type: types.UPDATE_COURSE_SUCCESS,
            course: { ...course, name }
          },
        ];
        sandbox
          .stub(coursesClient, 'updateCourse')
          .callsFake(() => course);

        return store.dispatch(actions.updateCourse({ courseId, updatedValues: { name } }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('searchCourses() function', () => {
    let search;
    let courses;

    describe('when the courses are fetched successfully', () => {
      beforeEach(() => {
        courses = [];
        expectedActions = [
          {
            type: types.LIST_COURSES_REQUEST
          },
          {
            type: types.LIST_COURSES_SUCCESS,
            courses
          }
        ];
        sandbox
          .stub(coursesClient, 'searchCourses')
          .callsFake(() => courses);

        return store.dispatch(actions.searchCourses({ search }));
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

  describe('addUserToCourse() function', () => {
    let course;
    let courseId;
    let password;
    let userId;
    let role;

    describe('when the user is added successfully', () => {
      beforeEach(() => {
        password = 'secret';
        userId = 'user-id';
        role = 'student';
        courseId = 'course-id';
        course = { courseId };
        expectedActions = [
          {
            type: types.JOIN_COURSE_SUCCESS,
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
          .stub(coursesClient, 'addUserToCourse')
          .callsFake(() => {});
        sandbox
          .stub(exercisesClient, 'addUserToCourse')
          .callsFake(() => {});

        return store.dispatch(actions.addUserToCourse({
          course,
          userId,
          role,
          password
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });

    describe('when fails with 409', () => {
      beforeEach(() => {
        password = 'secret';
        userId = 'user-id';
        role = 'student';
        courseId = 'course-id';
        course = { courseId };
        expectedActions = [
          {
            type: modalTypes.SHOW_ERROR,
            error: 'La clave ingresada para el curso es incorrecta. Por favor ingrese otra nuevamente'
          }
        ];
        sandbox
          .stub(coursesClient, 'addUserToCourse')
          .callsFake(() => {
            throw createError(409, { message: 'invalid password' });
          });
        sandbox
          .stub(exercisesClient, 'addUserToCourse')
          .callsFake(() => {});

        return store.dispatch(actions.addUserToCourse({
          course, userId, role, password
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('deleteCourse() function', () => {
    let courseId;

    describe('when the course is deleted successfully', () => {
      beforeEach(() => {
        courseId = 'course-id';
        expectedActions = [
          {
            type: types.DELETE_COURSE_REQUEST,
            courseId
          },
          {
            payload: {
              args: [
                '/courses'
              ],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          },
          { type: modalTypes.HIDE_MODAL }
        ];
        sandbox
          .stub(coursesClient, 'deleteCourse')
          .callsFake(() => {});

        return store.dispatch(actions.deleteCourse({ courseId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('publishCourse() function', () => {
    let course;
    let courseId;

    describe('when the course is published successfully', () => {
      beforeEach(() => {
        courseId = 'course-id';
        course = { courseId };
        store = mockStore({
          common: {
            data: {}
          },
          courses: {
            data: {
              detail: {
                [courseId]: course
              }
            }
          }
        });
        expectedActions = [
          {
            type: types.UPDATE_COURSE_SUCCESS,
            course: { ...course, courseStatus: 'published' }
          },
          { type: modalTypes.HIDE_MODAL }
        ];
        sandbox
          .stub(coursesClient, 'publishCourse')
          .callsFake(() => course);

        return store.dispatch(actions.publishCourse({ courseId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });

    describe('when the course publish fails', () => {
      beforeEach(() => {
        courseId = 'course-id';
        course = { courseId };
        store = mockStore({
          common: {
            data: {}
          },
          courses: {
            data: {
              detail: {
                [courseId]: course
              }
            }
          }
        });
        expectedActions = [
          {
            type: types.UPDATE_COURSE_SUCCESS,
            course: { ...course, courseStatus: 'published' }
          },
          {
            type: types.UPDATE_COURSE_SUCCESS,
            course
          },
          { type: modalTypes.HIDE_MODAL }
        ];
        sandbox
          .stub(coursesClient, 'publishCourse')
          .callsFake(() => {
            throw new Error();
          });

        return store.dispatch(actions.publishCourse({ courseId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('copyCourse() function', () => {
    let course;
    let newCourse;
    let targetCourseId;
    let sourceCourseId;
    let password;
    let name;
    let description;

    describe('when the user is added successfully', () => {
      beforeEach(() => {
        name = 'some name';
        description = 'some desc';
        password = 'secret';
        sourceCourseId = 'course-id';
        targetCourseId = 'new-course-id';
        course = { name, description, password };
        newCourse = { ...course, courseId: targetCourseId };
        expectedActions = [
          { type: modalTypes.SHOW_SPINNER },
          {
            type: types.GET_COURSE_DETAIL_SUCCESS,
            course: newCourse
          },
          { type: modalTypes.HIDE_MODAL },
          {
            payload: {
              args: [
                `/courses/${targetCourseId}`
              ],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];
        sandbox
          .stub(coursesClient, 'copyCourse')
          .callsFake(() => newCourse);
        sandbox
          .stub(exercisesClient, 'copyCourse')
          .callsFake(() => {});

        return store.dispatch(actions.copyCourse({ course, sourceCourseId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });

    describe('when fails with 409', () => {
      beforeEach(() => {
        name = 'some name';
        description = 'some desc';
        password = 'secret';
        sourceCourseId = 'course-id';
        targetCourseId = 'new-course-id';
        course = { name, description, password };
        newCourse = { ...course, courseId: targetCourseId };
        expectedActions = [
          { type: modalTypes.SHOW_SPINNER },
          {
            type: modalTypes.SHOW_ERROR,
            error: 'El curso que intenta crear ya existe'
          }
        ];
        sandbox
          .stub(coursesClient, 'copyCourse')
          .callsFake(() => {
            throw createError(409, { message: 'repeated course' });
          });
        sandbox
          .stub(exercisesClient, 'copyCourse')
          .callsFake(() => {});

        return store.dispatch(actions.copyCourse({ course, sourceCourseId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });

    describe('when another error exists', () => {
      beforeEach(() => {
        name = 'some name';
        description = 'some desc';
        password = 'secret';
        sourceCourseId = 'course-id';
        targetCourseId = 'new-course-id';
        course = { name, description, password };
        newCourse = { ...course, courseId: targetCourseId };
        expectedActions = [
          { type: modalTypes.SHOW_SPINNER },
          { type: modalTypes.HIDE_SPINNER },
          {
            type: modalTypes.SHOW_ERROR,
            error: 'some error'
          }
        ];
        sandbox
          .stub(coursesClient, 'copyCourse')
          .callsFake(() => {
            throw createError(404, { message: 'some error' });
          });
        sandbox
          .stub(exercisesClient, 'copyCourse')
          .callsFake(() => {});

        return store.dispatch(actions.copyCourse({ course, sourceCourseId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });
});
