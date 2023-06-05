import React from "react";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import useLogin from "./useLogin";

type Props = {
  onLogin: () => void;
};

const Login = ({ onLogin }: Props) => {
  const { onFinish, form } = useLogin({ onLogin });

  return (
    <PageContainer>
      <FormWrapper>
        <FormTitle>Rezztoran Admin Paneli</FormTitle>
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Lütfen Kullanıcı adı giriniz!" },
            ]}
          >
            <Input placeholder="Lütfen Kullanıcı Adını Giriniz" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Lütfen şifre giriniz!" }]}
          >
            <Input.Password placeholder="Lütfen Şifre Giriniz" size="large" />
          </Form.Item>

          <Form.Item>
            <CustomButtom type="primary" htmlType="submit" size="large">
              Giriş Yap
            </CustomButtom>
          </Form.Item>
        </Form>
      </FormWrapper>
    </PageContainer>
  );
};

export default Login;

const FormWrapper = styled.div`
  padding: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 10px;
`;

const FormTitle = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  font-family: "Poppins";
`;

const CustomButtom = styled(Button)`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const PageContainer = styled.div`
  height: 100vh;
  position: fixed;
  background: #ffffff;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
