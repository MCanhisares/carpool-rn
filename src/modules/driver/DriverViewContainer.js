import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import DriverScreen from './DriverView';
import { loadQrCode } from './DriverState';


export default compose(
  connect(
    state => ({
      isLoading: state.driver.isLoading,
      qrCode: state.driver.qrCode,
    }),
    dispatch => ({
      loadQrCode: () => dispatch(loadQrCode()),  
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadQrCode();
    },
  }),
)(DriverScreen);
