import React from 'react';
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function DataCharts({ data, name, dataKey }) {
  return (
    <Container>
      <AreaChart
        width={500}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3f51b5" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3f51b5" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="#3f51b5"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
      <strong>{name}</strong>
    </Container>
  );
}

DataCharts.propTypes = {
  data: PropTypes.shape(
    PropTypes.arrayOf({
      name: PropTypes.string || PropTypes.number,
      profit: PropTypes.number,
      sales: PropTypes.number,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
};
