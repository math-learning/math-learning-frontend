import * as types from './actionTypes';

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
    context: {
      accessToken: null
    },
    modalType: null,
    profile: null,
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
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          profile: action.userProfile
        }
      };

    case types.GOOGLE_LOGIN_SUCCESS:
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
