import _ from 'lodash';
import * as idUtils from '../../utils/idUtils';

export function isLoadingExercises(state, courseId, guideId, userId) {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });

  if (userId) {
    const studentExercises = state.exercises.data.students.list[courseGuideId];
    return _.isNil(studentExercises && studentExercises[userId]);
  }

  const exercises = state.exercises.data.list[idUtils.courseGuideId({ courseId, guideId })];
  return _.isNil(exercises);
}

export const getExercises = (state, courseId, guideId, userId) => {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });

  if (userId) {
    const studentExercises = state.exercises.data.students.list[courseGuideId];
    return studentExercises && studentExercises[userId];
  }
  return state.exercises.data.list[courseGuideId];
};

const getBaseExerciseDetail = (state, {
  courseId, guideId, exerciseId, userId
}) => {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });

  if (userId) {
    const course = state.exercises.data.students.detail[courseGuideId];
    return course && course[userId] && course[userId][exerciseId];
  }

  const course = state.exercises.data.detail[courseGuideId];
  return course && course[exerciseId];
};

export const getExercise = (state, {
  courseId, guideId, exerciseId, userId
}) => {
  const baseExercise = getBaseExerciseDetail(state, {
    courseId, guideId, exerciseId, userId
  });

  return baseExercise && baseExercise.exercise;
};

export const isLoadingExercise = (state, {
  courseId, guideId, exerciseId, userId
}) => {
  const baseExercise = getBaseExerciseDetail(state, {
    courseId, guideId, exerciseId, userId
  });

  if (_.isNil(baseExercise && baseExercise.isLoading)) {
    return true;
  }
  return baseExercise.isLoading;
};

export const currentExpression = (state, {
  courseId, guideId, exerciseId
}) => {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });
  const courseExercises = state.exercises.data.detail[courseGuideId];

  return courseExercises
    && courseExercises[exerciseId]
    && courseExercises[exerciseId].currentExpression;
};

export const exerciseStatus = (state, {
  courseId, guideId, exerciseId
}) => {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });
  const courseExercises = state.exercises.data.detail[courseGuideId];

  return courseExercises
    && courseExercises[exerciseId]
    && courseExercises[exerciseId].exerciseStatus;
};

export const isExerciseResolved = (state, {
  courseId, guideId, exerciseId
}) => {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });
  const courseExercises = state.exercises.data.detail[courseGuideId];

  return courseExercises
    && courseExercises[exerciseId]
    && courseExercises[exerciseId].exerciseStatus === 'resolved';
};

export const stepList = (state, {
  courseId, guideId, exerciseId
}) => {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });
  const courseExercises = state.exercises.data.detail[courseGuideId];

  const exerciseStepList = courseExercises
    && courseExercises[exerciseId]
    && courseExercises[exerciseId].stepList;

  return exerciseStepList || [];
};
