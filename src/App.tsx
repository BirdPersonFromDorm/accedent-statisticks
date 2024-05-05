import React, { FC, useEffect } from 'react'
import dayjs from "dayjs";
import locale from "antd/locale/ru_RU";
import { ConfigProvider} from "antd";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routs/AppRoutes";
import './styles/index.scss'

const queryClient = new QueryClient()

const App: FC = () => {

  useEffect(() => {
    dayjs.locale("ru");
  }, []);

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: `"Montserrat", sans-serif`,
            colorPrimary: "#4C78EE",
            colorText: "#000"
          },
        }}
        locale={locale}
      >
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App;
