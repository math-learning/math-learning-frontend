import _ from 'lodash';
import * as types from './actionTypes';
import * as commonTypes from '../common/actionTypes';
import * as courseTypes from '../courses/actionTypes';
import { courseGuideId } from '../../utils/idUtils';

const initialState = {
  data: {
    detail: {},
    list: {},
    isLoadingGuideDetail: false,
    isLoadingCreatingGuide: false
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
    case types.CREATE_GUIDE_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          isLoadingCreatingGuide: true
        }
      };
    }

    case types.CREATE_GUIDE_FAILS: {
      return {
        ...state,
        data: {
          ...state.data,
          isLoadingCreatingGuide: false
        }
      };
    }

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
          isLoadingCreatingGuide: false
        }
      };
    }

    case types.UPDATE_GUIDE_SUCCESS: {
      const courseIdGuideId = courseGuideId({
        courseId: action.courseId,
        guideId: action.guide.guideId,
      });
      const list = state.data.list[action.courseId];
      let indexOfGuide;
      list.forEach((value, index) => {
        if (value.guideId === action.guide.guideId) {
          indexOfGuide = index;
        }
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
      const courseIdGuideId = courseGuideId({ courseId: action.courseId, guideId: action.guideId });
      const newDetail = _.omit(state.data.detail, courseIdGuideId);
      const newList = state.data.list[action.courseId]
        .filter((guide) => guide.courseId !== action.guideId && guide.guideId !== action.guideId);

      return {
        ...state,
        data: {
          ...state.data,
          detail: newDetail,
          list: {
            ...state.data.list,
            [action.courseId]: newList
          }
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

    case commonTypes.LOGOUT_SUCCESS: {
      // cleaning the state
      return initialState;
    }

    default:
      return state;
  }
}
