import React, { useState } from 'react';
import dayjs from "dayjs";
import {
  ScatterChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Area, Bar
} from 'recharts';

interface ChartData {
  xCoords: string;
  yCoords: number;
}

interface ChartProps {
  data: ChartData[];
  title: string;
}

const CustomChartExtraStat: React.FC<ChartProps> = ({
                                                      title = 'Название',
                                                      chertData = [],
                                                      par1,
                                                      par2,
                                                      par3,
                                                      par4
                                                    }) => {

  const data = [...chertData]?.map((item: any) => ({
    ycoords: item?.ycoords ? Number(item?.ycoords) : null,
    ycoords1:
      Number(par1) === item?.xcoords
        ? Number(par2.toFixed(0))
        : Number(par3) === item?.xcoords
        ? Number(par4.toFixed(0))
        : null,
    xcoords: Number(item?.xcoords),
  })).sort((a, b) => a.xcoords - b.xcoords)

  return (
    <ComposedChart
      width={1000}
      height={400}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis dataKey="ycoords" />
      <XAxis dataKey="xcoords" />
      {/*<Tooltip />*/}
      <Tooltip content={<CustomTooltip title={title} />} />
      <Line
        type="baseLine"
        dataKey="ycoords1"
        stroke="#ff7300"
        legendType={'line'}
        strokeWidth={5}
        connectNulls={true}
      />

      <Scatter
        type="monotone"
        dataKey="ycoords"
        stroke="#000"
      />

    </ComposedChart>
  )
};

const CustomTooltip = ({ active, payload, label, title }: any) => {
  if (active && payload && payload.length) {

    const { xcoords, ycoords, ycoords1 } = payload[0].payload;

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
          x: {xcoords}
          <p>
            y: {ycoords || ycoords1}
          </p>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomChartExtraStat;
