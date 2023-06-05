import { usePostLogin } from "@api/hooks/auth";
import { ILoginFormData } from "@interfaces/auth.interface";
import { Form } from "antd";
import React from "react";
import { toast } from "react-toastify";
import StorageService from "@services/storage";
import { useNavigate } from "react-router-dom";

type Props = {
  onLogin: () => void;
};

const useLogin = ({ onLogin }: Props) => {
  const { mutate: login } = usePostLogin();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: ILoginFormData) => {
    new Promise((resolve, reject) => {
      login(values, {
        onSuccess: (data: any) => {
          if (data.content.user.role === "USER") {
            toast.error("Böyle bir kullanıcı bulunmamaktadır!");
            form.resetFields();
          } else {
            StorageService.setAuthData(data.content.accessToken);
            StorageService.setUserData(data.content.user);
            navigate("/restaurant");
            onLogin();
          }
          resolve(undefined);
        },
        onError: (error: any) => {
          toast.error(error.response.data.error);
          reject(error);
        },
      });
    });
  };

  return {
    onFinish,
    form,
  };
};

export default useLogin;
