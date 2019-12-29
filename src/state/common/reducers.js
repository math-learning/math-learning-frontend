import * as types from './actionTypes';

const contextFromStorage = JSON.parse(localStorage.getItem('context')) || {};
const profileFromStorage = JSON.parse(localStorage.getItem('profile'));

const initialState = {
  data: {
    snackbar: {
      variant: 'info',
      message: '',
      open: false,
      autoHideDuration: 3000,
    },
    progressbar: {
      isVisible: false,
    },
    modalType: null,
    context: contextFromStorage,
    profile: profileFromStorage,
    // profile: {
    //   userId: "diego-id",
    //   name: "Diego",
    //   photo: "https://thehappypuppysite.com/wp-content/uploads/2018/05/shiba-inu-header.jpg",
    //   role: "professor"
    // },
  },
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.CLOSE_SNACKBAR:
      return {
        ...state,
        data: {
          ...state.data,
          snackbar: {
            ...state.data.snackbar,
            open: false,
          },
        },
      };
    case types.SHOW_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          snackbar: {
            ...state.data.snackbar,
            open: true,
            message: action.message,
            variant: 'error',
          },
        },
      };

    case types.PROCESSING:
      return {
        ...state,
        data: {
          ...state.data,
          progressbar: {
            isVisible: true,
          },
        },
      };

    case types.STOP_PROCESSING:
      return {
        ...state,
        data: {
          ...state.data,
          progressbar: {
            isVisible: false,
          },
        },
      };

    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS: {
      // to keep it through the navigation of the pages
      localStorage.setItem('profile', JSON.stringify(action.userProfile));
      // TODO: HANDLE 403 AND REDIRECT TO LOGIN

      return {
        ...state,
        data: {
          ...state.data,
          profile: action.userProfile
        }
      };
    }

    case types.LOGOUT_SUCCESS: {
      localStorage.removeItem('profile', JSON.stringify(action.userProfile));
      localStorage.removeItem('context', JSON.stringify(action.userProfile));

      return {
        ...state,
        data: {
          ...state.data,
          profile: null,
          context: {}
        }
      };
    }

    case types.GOOGLE_LOGIN_SUCCESS:
      localStorage.setItem('context', JSON.stringify({ accessToken: action.accessToken }));

      return {
        ...state,
        data: {
          ...state.data,
          context: {
            ...state.data.context,
            accessToken: action.accessToken
          }
        }
      };

    default:
      return state;
  }
}
