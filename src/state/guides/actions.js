import { push } from 'connected-react-router';
import * as types from './actionTypes';
import * as selectors from './selectors';
import * as commonSelectors from '../common/selectors';

import guidesClient from '../../clients/guidesClient';
import configs from '../../configs/variables';
import * as modalActions from '../modals/actions';

export function createGuideRequest({ courseId }) {
  return {
    type: types.CREATE_GUIDE_REQUEST,
    courseId
  };
}

export function createGuideSuccess({ courseId, guide }) {
  return {
    type: types.CREATE_GUIDE_SUCCESS,
    courseId,
    guide,
  };
}

export function createGuideFails({ courseId }) {
  return {
    type: types.CREATE_GUIDE_FAILS,
    courseId
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

export function createGuide({ courseId, name, description }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    try {
      dispatch(createGuideRequest({ courseId }));

      const guide = await guidesClient.createGuide({
        context, courseId, name, description
      });

      dispatch(createGuideSuccess({ courseId, guide }));
      dispatch(push(configs.pathGenerators.courseGuide(courseId, guide.guideId)));
    } catch (e) {
      console.log('Error while trying to create guide', e);
    }
  };
}

export function updateGuide({
  courseId, guideId, name, description
}) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);
    const currentGuide = selectors.getGuide(state, courseId, guideId);

    dispatch(updateGuideSuccess({ courseId, guide: { ...currentGuide, name, description } }));

    try {
      await guidesClient.updateGuide({
        context, guideId, courseId, name, description
      });
    } catch (e) {
      console.log('Error while trying to update guide', e);
      dispatch(updateGuideSuccess({ courseId, guide: currentGuide }));
    }
  };
}

export function getGuides({ courseId }) {
  return async (dispatch, getState) => {
    dispatch(getGuidesRequest());
    const state = getState();
    const context = commonSelectors.context(state);

    const guides = await guidesClient.getGuides({ context, courseId });
    dispatch(getGuidesSuccess({ courseId, guides }));
  };
}

export function selectGuide({ courseId, guideId }) {
  return async (dispatch) => {
    dispatch(push(configs.pathGenerators.courseGuide(courseId, guideId)));
  };
}

export function deleteGuide({ courseId, guideId }) {
  return async (dispatch, getState) => {
    dispatch(deleteGuideRequest(courseId, guideId));
    const state = getState();
    const context = commonSelectors.context(state);
    const response = await guidesClient.deleteGuide({ context, courseId, guideId });
    if (response) {
      // TODO: handle
    }
    dispatch(modalActions.hideModal());
  };
}
