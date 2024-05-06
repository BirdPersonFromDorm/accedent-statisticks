import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import dayjs from "dayjs";

interface ChartData {
  xCoords: string;
  yCoords: number;
}

interface ChartProps {
  data: ChartData[];
  title: string;
}

// const PriceChart: React.FC<ChartProps> = ({ data, title }) => {
const PriceChart: React.FC<ChartProps> = ({ title = 'Название', chertData = [] }) => {

  console.log(chertData?.coords?.map((item: any) => ({ ...item, xcoords: dayjs(item?.xcoords).format('YYYY.MM.DD') })))
  return (
    <>
      <h3>
        График че-то там
      </h3>
      <LineChart width={1000} height={400} data={chertData?.coords?.map((item: any) => ({
        ...item,
        ycoords: Number(item?.ycoords),
        xcoords: dayjs(item?.xcoords).format('YYYY.MM.DD')
      }))}>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis dataKey="ycoords" />
        <XAxis dataKey="xcoords" />
        {/*<Tooltip />*/}
        <Tooltip content={<CustomTooltip title={title} />} />
        <Line type="monotone" dataKey="ycoords" stroke="#28C76F" strokeWidth={4} />
      </LineChart>
    </>
  );
};

const CustomTooltip = ({ active, payload, label, title }: any) => {
  if (active && payload && payload.length) {
    const { xcoords } = payload[0].payload;
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
          {xcoords}
          <p style={{ color: color }}>
            {title}: {payload[0].payload.ycoords}
          </p>
        </p>
      </div>
    );
  }

  return null;
};

export default PriceChart;
