import React, { FC, useState } from 'react';
import styles from './style.module.scss';
import { Checkbox, Col, DatePicker, Dropdown, Row, Typography, Input, MenuProps, Spin, Select } from "antd";
import MaxWithLayout from "../../../layouts/MaxWithLayout/index";
import Icon from "@ant-design/icons";
import PriceChart from "../components/PriceChart";
import useStatData from "../../../entities/stat/hooks/useStatData";

const { RangePicker } = DatePicker;

const HomeContent: FC = () => {

  const {
    chertData,
    getFactorFilterItems,
    getRegionFilterItems,
    getFactorDTPFilterItems,
    onChangeDate,
    victimsData,
    setSelectedStatsVictim,
    selectedStatsVictim,
    isLoading,
  } = useStatData()

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
                  <Select.Option key={option?.id} value={option?.code}>
                    {option?.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Col>
          <Col span={5}>
            <Dropdown
              trigger={["click"]}
              placement="bottomRight"
              menu={{ items: getFactorFilterItems() }}
              overlayClassName="dropdown-border"
            >
              <div className="analytics-header-dropdown">
                <div>Анализируемые фактор</div>
                <Icon

                  style={{ marginTop: "2px", fontSize: "10px" }}
                />
              </div>
            </Dropdown>
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
              showTime={{ format: 'HH-mm-ss' }}
              placeholder={["Дата создания(от)", "Дата создания(до)"]}
              format={"DD.MM.YYYY HH:mm:ss"}
            />
          </Col>
        </Row>
        {
          isLoading &&
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100
          }}>
              <Spin />
          </div>
        }
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
          <PriceChart chertData={chertData?.data} />
          {/*<PriceChart chertData={chertData}/>*/}
        </Row>
      </div>
    </MaxWithLayout>
  );
};

export default HomeContent;
