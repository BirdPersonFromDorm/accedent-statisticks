import React, { FC, useState } from 'react';
import styles from './style.module.scss';
import { Checkbox, Col, DatePicker, Dropdown, Row, Typography, Input, MenuProps } from "antd";
import MaxWithLayout from "../../../layouts/MaxWithLayout/index";
import Icon from "@ant-design/icons";
import PriceChart from "../components/PriceChart";
import useStatData from "../../../entities/stat/hooks/useStatData";

const { RangePicker } = DatePicker;

const HomeContent: FC = () => {

  const {
    chertData,
    getFactorFilterItems,
    getVictimsFilterItems,
    getRegionFilterItems,
    onChangeDate,
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
          <Col span={4}>
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
          <Col span={4}>
            <Dropdown
              trigger={["click"]}
              placement="bottomRight"
              menu={{ items: getVictimsFilterItems() }}
              overlayClassName="dropdown-border"
            >
              <div className="analytics-header-dropdown">
                <div>Пострадавшие</div>
                <Icon

                  style={{ marginTop: "2px", fontSize: "10px" }}
                />
              </div>
            </Dropdown>
          </Col>
          <Col span={4}>
            <Dropdown
              trigger={["click"]}
              placement="bottomRight"
              menu={{ items: getFactorFilterItems() }}
              overlayClassName="dropdown-border"
            >
              <div className="analytics-header-dropdown">
                <div>Фактор</div>
                <Icon

                  style={{ marginTop: "2px", fontSize: "10px" }}
                />
              </div>
            </Dropdown>
          </Col>
          <Col span={10}>
            <RangePicker
              style={{width: '350px'}}
              onChange={onChangeDate}
              showTime={{format: 'HH-mm-ss'}}
              placeholder={["Дата создания(от)", "Дата создания(до)"]}
              format={"DD.MM.YYYY HH:mm:ss"}
            />
          </Col>
        </Row>
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
          <PriceChart chertData={chertData}/>
          <PriceChart chertData={chertData}/>
        </Row>
      </div>
    </MaxWithLayout>
  );
};

export default HomeContent;
