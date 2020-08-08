import Radar from 'react-d3-radar';
import React from 'react';

export const RadarChart = ({variables, values}) => (
<Radar
  width={500}
  height={500}
  padding={70}
  domainMax={10}
  highlighted={null}
  onHover={(point) => {
    if (point) {
      console.log('hovered over a data point');
    } else {
      console.log('not over anything');
    }
  }}
  data={{
    variables: variables,
    sets: values
  }}
/>
)