export const getCourseUsersActivity = (state, { courseId }) => {
  const courseStatistics = state.statistics.data.courses[courseId];

  return courseStatistics && courseStatistics.usersActivity;
};

export const getCourseExerciseErrors = (state, { courseId }) => {
  const courseStatistics = state.statistics.data.courses[courseId];

  return courseStatistics && courseStatistics.exerciseErrors;
};

