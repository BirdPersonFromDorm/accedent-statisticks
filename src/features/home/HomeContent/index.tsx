import React, { FC, useState } from 'react';
import styles from './style.module.scss';
import { Checkbox, Col, DatePicker, Dropdown, Row, Typography, Input, MenuProps, Spin, Select } from "antd";
import MaxWithLayout from "../../../layouts/MaxWithLayout/index";
import Icon from "@ant-design/icons";
import PriceChart from "../components/PriceChart";
import useDTPChartData from "../../../entities/stat/hooks/useDTPChartData";
import useFactorData from "../../../entities/factors/hooks/useFactorData";
import useFactorChartData from "../../../entities/stat/hooks/useFactorChartData";

const { RangePicker } = DatePicker;

const HomeContent: FC = () => {

  const {
    chertData,
    getRegionFilterItems,
    getFactorDTPFilterItems,
    onChangeDate: onChangeDateDtpChart,
    victimsData,
    setSelectedStatsVictim,
    selectedStatsVictim,
    isLoading,
  } = useDTPChartData()


  const {
    factorChartData,
    onChangeDate: onChangeDateFactorChart,
    analizFactor,
    selectedAnalizFactor,
    setSelectedAnalizFactor,
    isLoading: isLoadingDtpChart,
  } = useFactorChartData()


  const onChangeDate = (data: any) => {
    onChangeDateDtpChart(data)
    onChangeDateFactorChart(data)
  }

  console.log(factorChartData?.data)
  return (
    <MaxWithLayout>
      <div className={styles.homeСontent}>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            width: '100%'
          }}
        >
          <Col span={5}>
            <Dropdown
              trigger={["click"]}
              placement={"bottomRight"}
              menu={{ items: getRegionFilterItems() }}
              overlayClassName="dropdown-border"
            >
              <div className="analytics-header-dropdown">
                <div>Регион</div>
                <Icon
                  style={{ marginTop: "2px", fontSize: "10px" }}
                />
              </div>
            </Dropdown>
          </Col>
          <Col span={5}>
            <Select
              style={{
                width: '100%',
              }}
              value={selectedStatsVictim}
              placeholder="Пострадавшие"
              filterOption={false}
              onChange={(e: any, option: any) => {
                setSelectedStatsVictim(e)
              }}
            >
              {victimsData?.data?.map((option: any) => {
                return (
                  <Select.Option key={option?.id} value={option?.id}>
                    {option?.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Col>
          <Col span={5}>
            <Select
              style={{
                width: '100%',
              }}
              value={selectedAnalizFactor}
              placeholder="Анализируемые фактор"
              filterOption={false}
              onChange={(e: any, option: any) => {
                setSelectedAnalizFactor(e)
              }}
            >
              {analizFactor?.data?.map((option: any) => {
                return (
                  <Select.Option key={option?.id} value={option?.id}>
                    {option?.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Col>
          <Col span={5}>
            <Dropdown
              trigger={["click"]}
              placement="bottomRight"
              menu={{ items: getFactorDTPFilterItems() }}
              overlayClassName="dropdown-border"
            >
              <div className="analytics-header-dropdown">
                <div>Фактор ДТП</div>
                <Icon

                  style={{ marginTop: "2px", fontSize: "10px" }}
                />
              </div>
            </Dropdown>
          </Col>
          <Col span={10}>
            <RangePicker
              style={{ width: '350px' }}
              onChange={onChangeDate}
              placeholder={["Дата создания(от)", "Дата создания(до)"]}
              format={"DD.MM.YYYY"}
            />
          </Col>
        </Row>

        <Spin spinning={isLoading || isLoadingDtpChart}>
          <Row
            style={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
              width: '100%'
            }}
          >
            <PriceChart chertData={chertData?.data} title={'График по факторам дтп'} />
            <PriceChart chertData={factorChartData?.data} title={'График по анализируемым факторам'} />
          </Row>
        </Spin>
      </div>
    </MaxWithLayout>
  );
};

export default HomeContent;
