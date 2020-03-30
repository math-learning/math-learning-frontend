import _ from 'lodash';
import * as idUtils from '../../utils/idUtils';

export function isLoadingExercises(state, courseId, guideId, userId) {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });

  if (userId) {
    const studentExercises = state.exercises.data.students[courseGuideId];
    return _.isNil(studentExercises && studentExercises[userId]);
  }

  const exercises = state.exercises.data.list[idUtils.courseGuideId({ courseId, guideId })];
  return _.isNil(exercises);
}

export const getExercises = (state, courseId, guideId, userId) => {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });

  if (userId) {
    const studentExercises = state.exercises.data.students[courseGuideId];
    return studentExercises && studentExercises[userId];
  }
  return state.exercises.data.list[courseGuideId];
};

export const getExercise = (state, {
  courseId, guideId, exerciseId
}) => {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });
  const courseExercises = state.exercises.data.detail[courseGuideId];

  return courseExercises
    && courseExercises[exerciseId]
    && courseExercises[exerciseId].exercise;
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

export const isLoadingExercise = (state, {
  courseId, guideId, exerciseId
}) => {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });
  const courseExercises = state.exercises.data.detail[courseGuideId];
  const isLoading = courseExercises
    && courseExercises[exerciseId]
    && courseExercises[exerciseId].isLoading;

  if (_.isNil(isLoading)) {
    return true;
  }
  return isLoading;
};
