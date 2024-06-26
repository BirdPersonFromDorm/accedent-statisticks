import React, { FC } from 'react';
import styles from './style.module.scss';
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from 'react-router-dom'
import { sendPreAuthData } from "../../../entities/user/model/index";
import { useUnit } from "effector-react";
import MaxWithLayout from "../../../layouts/MaxWithLayout/index";

const { Title } = Typography;

const LoginContent: FC = () => {

  const [form] = Form.useForm<{}>();

  const [isLoading] = useUnit([sendPreAuthData.pending])

  const onFinish = (values: any) => {
    sendPreAuthData(values)
  }

  return (
    <MaxWithLayout>
      <div className={styles['login-content']}>
        <Form
          form={form}
          onFinish={onFinish}
          style={{
            width: '100%',
            maxWidth: 360,
            borderRadius: 20,
            border: '1px solid #eeeeee',
            padding: 20,
          }}
          layout={"vertical"}
        >
          <Title
            level={2}
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: 20,
            }}
          >
            Авторизация
          </Title>

          <Form.Item
            name="phone"
            required={true}
          >
            <Input
              placeholder="Номер телефона"
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            name="password"
            required={true}
          >
            <Input
              type={'password'}
              placeholder="Пароль"
              maxLength={10}
            />
          </Form.Item>


          <Button
            loading={isLoading}
            type={"primary"}
            htmlType={"submit"}
            style={{
              width: "100%",
            }}
          >
            Войти
          </Button>
        </Form>
      </div>
    </MaxWithLayout>
  );
};

export default LoginContent;
