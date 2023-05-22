import React from "react";
import { useState, ChangeEvent, useEffect } from "react";
import { IUserTable } from "@interfaces/user.interface";
import { useDeleteUser, useGetUser } from "@api/hooks/user";
import type { ColumnsType } from "antd/es/table";
import {
  CTable,
  CSpin,
  CSearch,
  CTableHeader,
  CButton,
} from "@components/index";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserUpdateModal from "./UserUpdateModal";
import { Modal } from "antd";
const { confirm } = Modal;

const UserViewMode = () => {
  const { data: users, isLoading, refetch } = useGetUser();
  const { mutate: deleteUser } = useDeleteUser();
  const [usersData, setUserData] = useState<IUserTable[]>(
    users === undefined ? [] : users
  );
  console.log("userDATA:", usersData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<IUserTable>();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    setUserData(users);
  }, [users]);

  const deleteInfo = (id: string) => {
    confirm({
      title: "Bu Kullanıcıyı silmek istiyor musunuz?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteUserHandler(id);
      },
    });
  };

  const columns: ColumnsType<IUserTable> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Kullanıcı Adı",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: "Ad",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Soyad",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Resim",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Düzenle",
      dataIndex: "edit",
      key: "edit",
      fixed: "right",
      render: (_, user) => {
        return (
          <CButton
            radius="50%"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => editUserHandler(user)}
          />
        );
      },
    },
    {
      title: "Sil",
      dataIndex: "delete",
      key: "delete",
      fixed: "right",
      render: (_, user) => {
        return (
          <CButton
            radius="50%"
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              deleteInfo(user.id.toString());
            }}
          />
        );
      },
    },
  ];

  const deleteUserHandler = (id: string) => {
    new Promise((resolve, reject) => {
      deleteUser(id, {
        onSuccess: (data) => {
          toast.success("Kullanıcı Başarı ile silindi!");
          refetch();
          resolve(data);
        },
        onError: (error) => {
          toast.error("Bir hata meydana geldi!");
          reject(error);
        },
      });
    });
  };

  const editUserHandler = (user: IUserTable) => {
    setIsModalOpen(true);
    setSelectedData(user);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currValue = e.target.value.toLowerCase();
    setUsername(currValue);
    const filteredData = users.filter((entry: IUserTable) =>
      entry.username.toLowerCase().includes(currValue)
    );
    setUserData(filteredData);
  };

  if (isLoading) {
    return <CSpin />;
  }

  return (
    <>
      <CTableHeader>
        <CSearch
          w="50vh"
          placeholder="Kullanıcı Adı Ara"
          size="large"
          suffix={<SearchOutlined />}
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
        />
      </CTableHeader>
      <CTable
        columns={columns}
        dataSource={usersData}
        pagination={{ pageSize: 10 }}
      />
      {isModalOpen && (
        <UserUpdateModal
          data={selectedData}
          title="Kullanıcı Güncelle"
          open={isModalOpen}
          handleOk={() => editUserHandler}
          handleCancel={handleCancel}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default UserViewMode;
