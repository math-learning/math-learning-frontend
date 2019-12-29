export const getOwnCourses = (state) => state.courses.data.own.courses;
export const isLoadingCourses = (state) => state.courses.data.own.isLoadingCourses;
export const getCourseDetail = (state, id) => state.courses.data.detail[id];
export const isLoadingCourseDetail = (state) => state.courses.data.isLoadingCourseDetail;
export const getCoursesList = (state) => state.courses.data.list.courses;
export const isLoadingCoursesList = (state) => state.courses.data.list.isLoadingCourses;
