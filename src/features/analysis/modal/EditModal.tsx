import {
  Button,
  Col,
  Form,
  Input, message, Spin,
} from "antd";
import React, { useEffect } from "react";
import useAnalysisDataByID from "../../../entities/analysis/hooks/useAnalysisDataByID";
import useAnalysisLocationUpdate from "../../../entities/analysis/hooks/useAnalysisLocationUpdate";
import ModalHeader from "../../shared/ModalHeader";

export default function EditModal({
                                    onClose,
                                    id
                                  }: any){

  const [form] = Form.useForm<{}>();

  const {
    locationDataById,
    isLoading
  } = useAnalysisDataByID(id)

  const {
    handleUpdate,
    isPending,
    isSuccess,
  } = useAnalysisLocationUpdate()

  const onFinish = (value: any) => {
    handleUpdate(id, value)
  }

  useEffect(() => {
    form?.setFieldsValue({
      name: locationDataById?.data?.[0]?.name,
      formula: locationDataById?.data?.[0]?.formula
    })
  }, [locationDataById])

  useEffect(() =>{
    if (isSuccess){
      message.success('Вы успешно изменили данные')
    }
  },[isSuccess])

  if (isLoading){
    return (
      <div style={{
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Spin />
      </div>
    )
  }

  return (
    <div className={"modal-wrapper"} style={{ padding: "30px" }}>
      <ModalHeader title={"Редактирование"} onClose={() => {
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
        <Form.Item
          rules={[{ required: true }]}
          name={"formula"}
          label={"Формула"}
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
