import * as types from './actionTypes';
import * as commonTypes from '../common/actionTypes';
import { courseGuideId } from '../../utils/idUtils';

const initialState = {
  data: {
    detail: {},
    list: {},
    isLoadingGuideDetail: false,
  },
};

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
      const detail = { ...state.data.detail };

      action.guides.forEach((guide) => {
        const key = courseGuideId({ courseId: guide.courseId, guideId: guide.guideId });
        detail[key] = guide;
      });

      return {
        ...state,
        data: {
          ...state.data,
          detail,
          list: {
            ...state.data.list,
            [action.courseId]: action.guides,
          },
          isLoadingGuides: false,
        }
      };
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

    case commonTypes.LOGOUT_SUCCESS: {
      // cleaning the state
      return initialState;
    }

    default:
      return state;
  }
}
