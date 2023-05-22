import React from "react";
import { Form } from "antd";
import { CSearch, CButton, CSelect } from "@components/index";
import styled from "styled-components";
import { COLORS } from "@constants/colors";
import { ISelectOptions } from "@interfaces/select.interface";
import { usePostUser } from "@api/hooks/user";
import { toast } from "react-toastify";

const UserAddMode = () => {
  const { mutate: postUser } = usePostUser();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    new Promise((resolve, reject) => {
      postUser(values, {
        onSuccess: (data) => {
          toast.success("Ekleme işlemi başarılı!");
          form.resetFields();
          resolve(data);
        },
        onError: (error) => {
          toast.error("Kullanıcı eklerken bir hata meydana geldi!");
          reject(error);
        },
      });
    });
  };

  const selectOptions: ISelectOptions[] = [
    {
      value: "ADMIN",
      label: "Yönetici",
    },
    {
      value: "RESTAURANT_ADMIN",
      label: "Restoran Yöneticisi",
    },
    {
      value: "USER",
      label: "Kullanıcı",
    },
  ];

  return (
    <FormWrapper>
      <FormTitle>Kullanıcı Ekle</FormTitle>
      <FormContainer form={form} name="basic" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <CSearch size="large" placeholder="Kullanıcı Adı Giriniz" />
        </Form.Item>

        <Form.Item
          name="mail"
          rules={[
            {
              type: "email",
              message: "Lütfen uygun bir E-posta giriniz",
            },
            {
              required: true,
              message: "Lütfen E-posta giriniz!",
            },
          ]}
        >
          <CSearch size="large" placeholder="E-mail Giriniz" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <CSearch size="large" password placeholder="Şifre" />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <CSearch size="large" placeholder="Ad" />
        </Form.Item>

        <Form.Item
          name="surname"
          rules={[{ required: true, message: "Please input your surname!" }]}
        >
          <CSearch size="large" placeholder="Soyad" />
        </Form.Item>

        <Form.Item
          name="role"
          rules={[{ required: true, message: "Please choose a  role!" }]}
        >
          <CSelect size="large" placeholder="Rol" options={selectOptions} />
        </Form.Item>

        <Form.Item>
          <CButton
            radius="10px"
            w="100%"
            size="large"
            type="primary"
            htmlType="submit"
          >
            Submit
          </CButton>
        </Form.Item>
      </FormContainer>
    </FormWrapper>
  );
};

export default UserAddMode;

const FormTitle = styled.span`
  font-family: "Poppins" sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${COLORS.RezztoranSecondary};
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FormContainer = styled(Form)`
  min-width: 55vh;
`;
