import { useUpdateUser } from "@api/hooks/user";
import { IUserTable, IUserUpdate } from "@interfaces/user.interface";
import { Form } from "antd";
import { CSearch, CButton } from "@components/index";
import { Modal } from "antd";
import { toast } from "react-toastify";

type Props = {
  title: string;
  open: boolean;
  handleOk?: () => void;
  handleCancel: () => void;
  data: IUserTable | undefined;
  refetch: () => void;
};

const UserUpdateModal = ({
  data,
  title,
  open,
  handleOk,
  handleCancel,
  refetch,
}: Props) => {
  const { mutate: updateUser } = useUpdateUser();

  const onFinish = (values: IUserUpdate) => {
    console.log("values: ", values);
    new Promise((resolve, reject) => {
      updateUser(values, {
        onSuccess: (data) => {
          toast.success("Güncelleme işlemi başarılı!");
          refetch();
          handleCancel();
          resolve(data);
        },
        onError: (error) => {
          toast.error("Hata oluştur");
          reject(error);
        },
      });
    });
  };

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form name="basic" onFinish={onFinish} initialValues={data}>
        <Form.Item name="id">
          <CSearch disabled />
        </Form.Item>
        <Form.Item name="username">
          <CSearch placeholder="Kullanıcı Adı Giriniz" />
        </Form.Item>

        <Form.Item name="mail">
          <CSearch placeholder="E-mail Giriniz" />
        </Form.Item>

        <Form.Item name="name">
          <CSearch placeholder="Ad" />
        </Form.Item>

        <Form.Item name="surname">
          <CSearch placeholder="Soyad" />
        </Form.Item>

        <Form.Item>
          <CButton radius="10px" w="100%" type="primary" htmlType="submit">
            Güncelle
          </CButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserUpdateModal;
