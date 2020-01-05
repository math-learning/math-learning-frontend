import { push } from 'connected-react-router';
import * as types from './actionTypes';
import * as commonSelectors from '../common/selectors';
import * as common from '../common';

import guidesClient from '../../clients/guidesClient';
import configs from '../../configs/variables';
import * as modalActions from '../modals/actions';

export function createGuideSuccess({ courseId, guide }) {
  return {
    type: types.CREATE_GUIDE_SUCCESS,
    courseId,
    guide,
  };
}

export function updateGuideSuccess({ courseId, guide }) {
  return {
    type: types.UPDATE_GUIDE_SUCCESS,
    courseId,
    guide
  };
}

export function getGuidesSuccess({ courseId, guides }) {
  return {
    type: types.GET_GUIDES_SUCCESS,
    courseId,
    guides,
  };
}

export function getGuidesRequest() {
  return {
    type: types.GET_GUIDES_REQUEST,
  };
}

export function deleteGuideRequest(courseId, guideId) {
  return {
    type: types.DELETE_GUIDE_REQUEST,
    courseId,
    guideId
  };
}

export function createGuide({ courseId, guideName, guideDescription }) {
  return async (dispatch, getState) => {
    dispatch(common.actions.showSpinner());
    const state = getState();
    const context = commonSelectors.context(state);
    const guide = await guidesClient.createGuide({
      context, courseId, guideName, guideDescription
    });
    dispatch(createGuideSuccess({ courseId, guide }));
    dispatch(common.actions.hideSpinner());
    dispatch(push(configs.pathGenerators.courseGuide(courseId, guide.guideId)));
  };
}

export function updateGuide({
  courseId, guideId, guideName, guideDescription
}) {
  return async (dispatch, getState) => {
    dispatch(common.actions.showSpinner());
    const state = getState();
    const context = commonSelectors.context(state);
    const guide = await guidesClient.updateGuide({
      context, guideId, courseId, guideName, guideDescription
    });
    dispatch(updateGuideSuccess({ courseId, guide }));
    dispatch(common.actions.hideSpinner());
  };
}

export function getGuides({ courseId }) {
  return async (dispatch, getState) => {
    try {
      dispatch(getGuidesRequest());
      const state = getState();
      const context = commonSelectors.context(state);

      const guides = await guidesClient.getGuides({ context, courseId });
      dispatch(getGuidesSuccess({ courseId, guides }));
    } catch (err) {
      // TODO: handle
      console.log(err);
      alert('Ha ocurrido un error inesperado');
    }
  };
}

export function selectGuide({ courseId, guideId }) {
  return async (dispatch) => {
    dispatch(push(configs.pathGenerators.courseGuide(courseId, guideId)));
  };
}

export function deleteGuide({ courseId, guideId }) {
  return async (dispatch, getState) => {
    try {
      dispatch(deleteGuideRequest(courseId, guideId));
      const state = getState();
      const context = commonSelectors.context(state);
      const response = await guidesClient.deleteGuide({ context, courseId, guideId });
      if (response) {
        // TODO: handle
      }
      dispatch(modalActions.hideModal());
    } catch (err) {
      // TODO: handle
      console.log(err);
      alert('Ha ocurrido un error inesperado');
    }
  };
}
