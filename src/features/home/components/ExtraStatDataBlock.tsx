import React from 'react';
import CustomChartExtraStat from "./CustomChartExtraStat";
import { Dropdown, Row, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons/lib";
import formula from '../../../assets/images/formula.png'

const ExtraStatDataBlock = ({
                              extraStatData,
                              isLoadingExtraStatData
                            }) => {

  const columns = [
    {
      title: "X",
      dataIndex: "xcoords",
      key: "xcoords",
      width: "25%",
      render: (text, record) => {
        return (
          <div>
            {record?.lastRow && <div>
                Сумма:
            </div>
            }
            {Number(text)?.toFixed(2)}
          </div>
        )
      }
    },
    {
      title: "Y",
      dataIndex: "ycoords",
      key: "ycoords",
      width: "25%",
      render: (text, record) => {
        return (
          <div>
            {record?.lastRow && <div>
                Сумма:
            </div>
            }
            {Number(text)?.toFixed(2)}
          </div>
        )
      }
    },
    {
      title: "X*Y",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (text, record) => {
        return (
          <div>
            {record?.lastRow && <div>
                Сумма:
            </div>
            }
            {(Number(record?.xcoords) * Number(record?.ycoords))?.toFixed(2)}
          </div>
        )
      }
    },
    {
      title: "X^2",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (text, record) => {
        return (
          <div>
            {record?.lastRow && <div>
                Сумма:
            </div>
            }
            {Math.pow(Number(record?.xcoords), 2)?.toFixed(2)}
          </div>
        )
      }
    },
    {
      title: "Y^2",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (text, record) => {
        return (
          <div>
            {record?.lastRow && <div>
                Сумма:
            </div>
            }
            {Math.pow(Number(record?.ycoords), 2)?.toFixed(2)}
          </div>
        )
      }
    },
  ];

  return (
    <div className="extra-stat">
      <h4>
        Поиск коэффициентов a и b для построения прямой y=a*x+b, максимально приближенной к эмпирическим точкам.
      </h4>
      <h4>
        Поиск проводился методом наименьших квадратов. Заполненная расчетная таблица выглядит следующим образом
      </h4>
      <Table
        loading={isLoadingExtraStatData}
        className={"product-arrival-table"}
        columns={columns}
        dataSource={extraStatData?.data?.coords?.slice(0, 5).concat({
          xcoords: extraStatData?.data?.sumX,
          ycoords: extraStatData?.data?.sumY,
          lastRow: true
        }) || []}
        scroll={{ x: true }}
        pagination={false}
      />
      <h4>
        Для поиска коэффициентов уравнения построим следующую систему линейных уравнений вида
      </h4>

      <div className="formula">
        <img src={formula}/>
        <div className="formula-data">
          <p>
            {'->'}
          </p>
          <p>
            {'->'}
          </p>
        </div>
        <div className="formula-data">
          <p>
            {extraStatData?.data?.slau1}
          </p>
          <p>
            {extraStatData?.data?.slau2}
          </p>
        </div>
      </div>

      <h4>
        Решение по формуле Крамера
      </h4>
      <p>
        Delta = <span>{extraStatData?.data?.delta}</span>
      </p>
      <p>
        DeltaA = <span>{extraStatData?.data?.deltaA}</span>
      </p>
      <p>
        A = <span>{extraStatData?.data?.a}</span>
      </p>
      <p>
        DeltaB = <span>{extraStatData?.data?.deltaB}</span>
      </p>
      <p>
        B = <span>{extraStatData?.data?.b}</span>
      </p>
      <p>
        Итоговое уравнение регрессии выглядит следующим образом <span>{extraStatData?.data?.function}</span>
      </p>

      <div className="p10">
        <CustomChartExtraStat
          chertData={extraStatData?.data}
          title={'Уравнение линейной регрессии Y на X'}
          par1={extraStatData?.data?.lineX1}
          par2={extraStatData?.data?.lineY1}
          par3={extraStatData?.data?.lineX2}
          par4={extraStatData?.data?.lineY2}
        />
      </div>


      <p>
        Линейный коэффициент корреляции: <span>{extraStatData?.data?.rxy}</span>
      </p>
      <p>
        Вывод, согласно полученному коэффициенту корреляции: <span>{extraStatData?.data?.vivodRXY}</span>
      </p>
      <p>
        Коэффициент детерминации: <span>{extraStatData?.data?.koefDet}</span>
      </p>
      <p>
        Вывод, согласно полученному коэффициенту детерминации: <span>{extraStatData?.data?.koefDetVivod}</span>
      </p>
      <p>
        Коэффициент средней эластичности: <span>{extraStatData?.data?.elasticKoef}</span>
      </p>
      <p>
        Вывод, согласно полученному коэффициенту эластичности: <span>{extraStatData?.data?.elasticKoefVivod}</span>
      </p>
      <p>
        Бета Коэффициент: <span>{extraStatData?.data?.betaKoef}</span>
      </p>
      <p>
        Вывод, согласно полученному бета коэффициенту: <span>{extraStatData?.data?.betaVivod}</span>
      </p>
    </div>
  );
};

export default ExtraStatDataBlock;
