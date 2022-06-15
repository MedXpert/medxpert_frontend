import {View, Text} from 'react-native';
import React from 'react';
import colors from '../../../constants/colors';

import MapboxGL from '@rnmapbox/maps';

const RenderDirection = ({route}) => {
  return (
    <MapboxGL.ShapeSource id="routeSource" shape={route.geometry}>
      <MapboxGL.LineLayer
        id="routeFill"
        style={{
          lineColor: colors.primary,
          lineWidth: 3.2,
          lineCap: MapboxGL.LineJoin.Round,
          lineOpacity: 1.84,
        }}
      />
    </MapboxGL.ShapeSource>
  );
};

export {RenderDirection};
