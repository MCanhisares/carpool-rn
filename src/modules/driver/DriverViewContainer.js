import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import DriverScreen from './DriverView';
import { loadQrCode } from './DriverState';


export default compose(
  connect(
    state => ({
      isLoading: state.driver.isLoading,
      data: state.driver.data,
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
