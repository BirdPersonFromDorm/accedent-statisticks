import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import dayjs from "dayjs";

interface ChartData {
  xCoords: string;
  yCoords: number;
}

interface ChartProps {
  data: ChartData[];
  title: string;
}

const CustomChart: React.FC<ChartProps> = ({
                                            title = 'Название',
                                            chertData = [],
                                            isDots = false,
                                          }) => {

  return (
    <>
      <h3>
        {title}
      </h3>
      <LineChart
        width={1000}
        height={400}
        data={chertData?.coords?.map((item: any) => ({
          ...item,
          ycoords: Number(item?.ycoords),
          xcoords: dayjs(item?.xcoords).format('YYYY.MM.DD'),
        }))}
      >

        <CartesianGrid strokeDasharray="3 3" />
        <YAxis dataKey="ycoords" />
        <XAxis dataKey="xcoords" />
        {/*<Tooltip />*/}
        <Tooltip content={<CustomTooltip title={title} />} />
        <Line
          type="monotone"
          dataKey="ycoords"
          stroke={isDots ? 'transparent' : "#28C76F"}
          strokeWidth={4}
          dot={{ stroke: '#28C76F', strokeWidth: 2, r: 5 }} // Customizing the dots
          activeDot={{ r: 8 }} // Customizing the active dot
        />
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

export default CustomChart;
