import * as types from './actionTypes';
import * as courseTypes from '../courses/actionTypes';
import { courseGuideId } from '../../utils/idUtils';

const initialState = {
  data: {
    detail: {},
    list: {},
    isLoadingGuideDetail: false,
  },
};

function loadGuidesIntoState({ state, courseId, guides }) {
  const detail = { ...state.data.detail };

  guides.forEach((guide) => {
    const key = courseGuideId({ courseId, guideId: guide.guideId });
    detail[key] = guide;
  });

  return {
    ...state,
    data: {
      ...state.data,
      detail,
      list: {
        ...state.data.list,
        [courseId]: guides
      },
      isLoadingGuides: false
    }
  };
}

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_GUIDE_SUCCESS: {
      const courseIdGuideId = courseGuideId({
        courseId: action.courseId,
        guideId: action.guide.guideId,
      });
      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [courseIdGuideId]: {
              ...action.guide,
            }
          },
          list: {
            ...state.data.list,
            [action.courseId]: [
              ...state.data.list[action.courseId],
              action.guide
            ]

          },
        }
      };
    }

    case types.UPDATE_GUIDE_SUCCESS: {
      const courseIdGuideId = courseGuideId({
        courseId: action.courseId,
        guideId: action.guide.guideId,
      });
      const list = [...state.data.list[action.courseId]];
      let indexOfGuide;
      list.forEach((value, index) => {
        if (value.guideId === action.guide.guideId) indexOfGuide = index;
      });
      list[indexOfGuide] = action.guide;
      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [courseIdGuideId]: {
              ...state.data.detail[courseIdGuideId],
              ...action.guide,
            }
          },
          list: {
            ...state.data.list,
            [action.courseId]: list,
          }
        }
      };
    }

    case types.GET_GUIDES_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          isLoadingGuides: true,
        }
      };
    }

    case types.GET_GUIDES_SUCCESS: {
      return loadGuidesIntoState({
        state,
        courseId: action.courseId,
        guides: action.guides
      });
    }

    case types.DELETE_GUIDE_REQUEST: {
      const detail = { ...state.data.detail };
      const key = courseGuideId({ courseId: action.courseId, guideId: action.guideId });
      delete detail[key];

      let list = [...state.data.list[action.courseId]];
      console.log(list);
      list = list.filter((guide) => guide.courseId !== action.guideId && guide.guideId !== action.guideId);
      return {
        ...state,
        data: {
          ...state.data,
          detail,
          list,
        }
      };
    }

    case courseTypes.CREATE_COURSE_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          list: {
            ...state.data.list,
            [action.course.courseId]: [],
          },
          isLoadingGuides: false,
        }
      };
    }

    case courseTypes.GET_COURSE_DETAIL_SUCCESS: {
      const { guides, courseId } = action.course;

      return loadGuidesIntoState({ state, courseId, guides });
    }

    default:
      return state;
  }
}
