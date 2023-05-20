import { IUserTable } from "@interfaces/user.interface";
import { useGetUser } from "@api/hooks/user";
import type { ColumnsType } from "antd/es/table";
import { CTable, CSpin, CSearch, CTableHeader } from "@components/index";
import { SearchOutlined } from "@ant-design/icons";

const UserViewMode = () => {
  const { data: users, isLoading } = useGetUser();

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
    },
    {
      title: "Sil",
      dataIndex: "delete",
      key: "delete",
      fixed: "right",
    },
  ];

  const data: IUserTable[] = users;

  if (isLoading) {
    return <CSpin />;
  }

  return (
    <>
      <CTableHeader>
        <CSearch
          placeholder="Kullanıcı Adı Ara"
          size="large"
          suffix={<SearchOutlined />}
        />
      </CTableHeader>
      <CTable
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 90 }}
      />
    </>
  );
};

export default UserViewMode;
