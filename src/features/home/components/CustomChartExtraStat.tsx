import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Layer } from 'recharts';
import dayjs from "dayjs";

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

  const customLineData = [
    { xcoords: Number(par1), ycoords: Math.floor(Number(par2))},
    { xcoords: Number(par3), ycoords:  Math.floor(Number(par4))}
  ];

  return (
    <>
      <h3>
        {title}
      </h3>
      <LineChart
        width={1000}
        height={400}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis dataKey="ycoords" />
        <XAxis dataKey="xcoords" />
        {/*<Tooltip />*/}
        <Tooltip content={<CustomTooltip title={title} />} />

        <Line
          type="monotone"
          data={customLineData}
          dataKey="ycoords"
          stroke="red"
          strokeWidth={5}
          dot={false}
        />
        <Line
          data={chertData?.coords?.map((item: any) => ({
            ...item,
            ycoords: Number(item?.ycoords),
            xcoords: Number(item?.xcoords),
          })).sort((a, b) => a.xcoords - b.xcoords)}
          type="monotone"
          dataKey="ycoords"
          stroke={"transparent"}
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

    const { xcoords, ycoords } = payload[0].payload;

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
          <p>
            {title}: {ycoords}
          </p>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomChartExtraStat;
