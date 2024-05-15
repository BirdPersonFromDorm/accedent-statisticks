import React from 'react';
import {Button, message} from "antd";
import Icon from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";


const generateFilename = () => {
  const currentDate = dayjs().format('YYYY-MM-DD');
  return `file_${currentDate}.xlsx`;
};


export const DownloadButton = ({
                                         id
                                        }: any) => {

  const handleDownload = () => {
    message.warning('Скачивание началось. Пожалуйста не закрывайте страницу')

    axios({
      method: 'get',
      url: `${import.meta.env.VITE_REACT_APP_API_URL}/files/`,
      responseType: 'blob',
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', generateFilename());
      link.setAttribute('target', '_blank');
      link.type = 'application/xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(error => {
      console.error('Error downloading file:', error);
    });
  };

  return (
    <Button
      onClick={handleDownload}
      type={"primary"}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Выгрузить
    </Button>
  );
};

