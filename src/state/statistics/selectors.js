export const getCourseUsersActivity = (state, { courseId }) => {
  const courseStatistics = state.statistics.data.courses[courseId];

  return courseStatistics && courseStatistics.usersActivity;
};
