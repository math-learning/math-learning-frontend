import _ from 'lodash';
import * as idUtils from '../../utils/idUtils';

export function isCreatingExercise(state) {
  return state.exercises.data.creation.isCreatingExercise;
}

export function isEvaluatingExercise(state) {
  return state.exercises.data.creation.isEvaluatingExercise;
}

export function solvedCreatingExercise(state) {
  return state.exercises.data.creation.solvedCreatingExercise;
}

export function creatingExerciseError(state) {
  return state.exercises.data.creation.creatingExerciseError;
}

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

export const getAllResolutions = (state, {
  courseId, guideId, exerciseId, userId
}) => {
  const baseExercise = getBaseExerciseDetail(state, {
    courseId, guideId, exerciseId, userId
  });
  const resolutions = baseExercise && baseExercise.resolutions;

  if (resolutions) {
    // first the user resolution
    return resolutions.sort((r1, r2) => {
      if (r1.userId === userId) {
        return 1;
      }
      if (r2.userId === userId) {
        return -1;
      }
      return 0;
    });
  }

  return baseExercise && baseExercise.resolutions;
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
