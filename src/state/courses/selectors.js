import _ from 'lodash';

export const getOwnCourses = (state) => state.courses.data.own.courses;
export const getCourseDetail = (state, courseId) => state.courses.data.detail[courseId];
export const getCoursesList = (state) => state.courses.data.list.courses;
export const isLoadingCourses = (state) => state.courses.data.own.isLoadingCourses;
export const isLoadingCoursesList = (state) => state.courses.data.list.isLoadingCourses;

export const isLoadingCourse = (state, courseId) => {
  const course = state.courses.data.detail[courseId];
  const isLoading = course && course.isLoading;

  if (_.isNil(isLoading)) {
    return true;
  }
  return isLoading;
};
