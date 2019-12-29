import { courseGuideId } from '../../utils/idUtils';

export const isLoadingGuides = (state) => state.guides.data.isLoadingGuides;
export const getGuide = (state, courseId, guideId) => state.guides.data.detail[courseGuideId({ courseId, guideId })];
export const getGuides = (state, courseId) => state.guides.data.list[courseId];
