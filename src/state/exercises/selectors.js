import _ from 'lodash';
import * as courseUtils from '../../utils/courseUtils';

export const getExercise = (state, {
  courseId, guideId, exerciseId
}) => {
  const courseGuideId = courseUtils.courseGuideId({ courseId, guideId });
  const courseExercises = state.exercises.data.detail[courseGuideId];

  return courseExercises
    && courseExercises[exerciseId]
    && courseExercises[exerciseId].exercise;
};

export const currentExpression = (state, {
  courseId, guideId, exerciseId
}) => {
  const courseGuideId = courseUtils.courseGuideId({ courseId, guideId });
  const courseExercises = state.exercises.data.detail[courseGuideId];

  return courseExercises
    && courseExercises[exerciseId]
    && courseExercises[exerciseId].currentExpression;
};

export const exerciseStatus = (state, {
  courseId, guideId, exerciseId
}) => {
  const courseGuideId = courseUtils.courseGuideId({ courseId, guideId });
  const courseExercises = state.exercises.data.detail[courseGuideId];

  return courseExercises
    && courseExercises[exerciseId]
    && courseExercises[exerciseId].exerciseStatus;
};

export const isLoadingExercise = (state, {
  courseId, guideId, exerciseId
}) => {
  const courseGuideId = courseUtils.courseGuideId({ courseId, guideId });
  const courseExercises = state.exercises.data.detail[courseGuideId];
  const isLoading = courseExercises
    && courseExercises[exerciseId]
    && courseExercises[exerciseId].isLoading;

  if (_.isNil(isLoading)) {
    return true;
  }
  return isLoading;
};
