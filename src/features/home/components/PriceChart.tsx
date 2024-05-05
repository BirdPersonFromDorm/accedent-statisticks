import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ChartData {
  xCoords: string;
  yCoords: number;
}

interface ChartProps {
  data: ChartData[];
  title: string;
}

// const PriceChart: React.FC<ChartProps> = ({ data, title }) => {
const PriceChart: React.FC<ChartProps> = ({  title= 'Название', chertData = [] }) => {

  const data = [
    {
      id: 1,
      xCoords: 1,
      yCoords: 1,
    },
    {
      id: 2,
      xCoords: 2,
      yCoords: 10,
    },
  ]

  return (
    <>
      <LineChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="xCoords" />
        <YAxis />
        {/*<Tooltip />*/}
        <Tooltip content={<CustomTooltip title={title} />} />
        <Line type="monotone" dataKey="yCoords" stroke="#28C76F" strokeWidth={4} />
      </LineChart>
    </>
  );
};

const CustomTooltip = ({ active, payload, label, title }: any) => {
  if (active && payload && payload.length) {
    const { xCoords } = payload[0].payload;
    const color = payload[0].color;
    return (
      <div style={{
        minWidth: 100,
        minHeight: 50,
        padding: '0 10px',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #d5d5d5'
      }}>
        <p>
          {xCoords}
          <p style={{ color: color }}>
            {title}: {payload[0].payload.yCoords}
          </p>
        </p>
      </div>
    );
  }

  return null;
};

export default PriceChart;
