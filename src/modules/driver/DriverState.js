import RNLocation from 'react-native-location';
import { createRide } from '../../api';

// Actions
const START_LOADING_QRCODE = 'DriverState/START_LOADING';
const QRCODE_LOADED = 'DriverState/QRCODE_LOADED';
const QRCODE_ERROR = 'DriverState/QRCODE_LOADED';

// Action creators
function startLoadingQrcode() {
  return { type: START_LOADING_QRCODE };
}

function qrCodeLoaded(qrCode) {
  return {
    type: QRCODE_LOADED,
    qrCode,
  };
}

function qrCodeError(err) {
  return {
    type: QRCODE_ERROR,
    error: err,
  };
}

// Initial state
const initialState = {
  isLoading: false,
  qrCode: {},
  error: null,
};

export function loadQrCode() {
  return dispatch => {
    dispatch(startLoadingQrcode());
    RNLocation.getLatestLocation({ timeout: 60000 })
      .then(location => `${location.latitude},${location.longitude}`)
      .then(position => createRide(position))
      .then(res => res.json())
      .then((qrCode, id) => {
        dispatch(qrCodeLoaded({qrCode, id}));
      })
      .catch(err => {
        dispatch(qrCodeError(err));
      });
  };
}

// Reducer
export default function DriverStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case START_LOADING_QRCODE:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case QRCODE_LOADED:
      return Object.assign({}, state, {
        isLoading: false,
        qrCode: action.qrCode,
      });
    case QRCODE_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    default:
      return state;
  }
}
