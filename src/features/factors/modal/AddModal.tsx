import {
  Button,
  Col,
  Form,
  Input, message,
} from "antd";
import React, { useEffect } from "react";
import { useAddFactor } from "../../../entities/factors/hooks/useAddFactor";
import ModalHeader from "../../shared/ModalHeader";

export default function AddModal({
                                   onClose,
                                 }: any){

  const [form] = Form.useForm<{}>();

  const {
    handleAdd,
    isPending,
    isSuccess
  } = useAddFactor()

  const onFinish = (value: any) => {
    handleAdd(value)
  }

  useEffect(() =>{
    if (isSuccess){
      form.resetFields()
      message.success('Вы успешно добавили')
    }
  },[isSuccess])

  return (
    <div className={"modal-wrapper"} style={{ padding: "30px" }}>
      <ModalHeader title={"Добавление"} onClose={() => {
        form.resetFields()
        onClose()
      }} />
      <Form
        onFinish={(values) => onFinish(values)}
        form={form}
        layout={"vertical"}
      >
        <Form.Item
          rules={[{ required: true }]}
          name={"name"}
          label={"Название"}
        >
          <Input />
        </Form.Item>

        <Col style={{ display: "flex", gap: "15px" }}>
          <Button
            type={"primary"}
            className={"button"}
            style={{ fontSize: "12px", width: "50%" }}
            htmlType={"submit"}
            loading={isPending}
          >
            Сохранить
          </Button>
          <Button
            type={"primary"}
            ghost
            className={"button"}
            style={{ fontSize: "12px", width: "50%" }}
            onClick={() => {
              form.resetFields()
              onClose()
            }}
          >
            Отмена
          </Button>
        </Col>
      </Form>
    </div>
  );
}
