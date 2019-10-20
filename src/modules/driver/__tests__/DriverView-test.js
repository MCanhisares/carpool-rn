import React from 'react';

import renderer from 'react-test-renderer';
import DriverScreen from '../DriverView';

it('renders DriverScreen', () => {
    expect(renderer.create(<DriverScreen />)).toMatchSnapshot();  
});

