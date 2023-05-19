import { Button, Form, Input } from "antd";
import styled from "styled-components";
import { ILoginFormData } from "@interfaces/auth.interface";
import { usePostLogin } from "@api/hooks/auth";
import { toast } from "react-toastify";
import cookie from "js-cookie";
import StorageService from "@services/storage";

const Login = () => {
  const { mutate: login } = usePostLogin();

  const onFinish = (values: ILoginFormData) => {
    new Promise((resolve, reject) => {
      login(values, {
        onSuccess: (data: any) => {
          // yonlendirme yapilacak
          StorageService.setAuthData(data.content.accessToken);
          StorageService.setUserData(data.content.user);
          cookie.set("token", data.content.accessToken, {
            expires: 1 / 24,
          });
          resolve(undefined);
        },
        onError: (error: any) => {
          toast.error(error.response.data.error);
          reject(error);
        },
      });
    });
  };

  return (
    <PageContainer>
      <FormWrapper>
        <FormTitle>Rezztoran Admin Paneli</FormTitle>
        <Form name="basic" onFinish={onFinish} autoComplete="off">
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
