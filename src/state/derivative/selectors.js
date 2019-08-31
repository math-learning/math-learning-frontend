export const stepList = (state, index) => state.derivative.data.stepList[index];
export const isValidInput = (state, index) => state.derivative.data.isValidInput[index];
export const currentExpression = (state, index) => state.derivative.data.currentExpression[index];
export const isFinished = (state, index) => state.derivative.data.finishedExercises.some( elem => elem == index);
export const showFinishedExercise = (state) => state.derivative.data.showFinishedExercise;
