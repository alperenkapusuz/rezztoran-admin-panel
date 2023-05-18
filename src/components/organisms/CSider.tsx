import { Layout, Menu } from "antd";
const { Sider } = Layout;
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { COLORS } from "@constants/index";

type Props = {
  collapsed: boolean;
};

const CSider = ({ collapsed }: Props) => {
  return (
    <SiderWrapper trigger={null} collapsible collapsed={collapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "nav 1",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "nav 2",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "nav 3",
          },
        ]}
      />
    </SiderWrapper>
  );
};

export default CSider;

const SiderWrapper = styled(Sider)`
  .ant-menu-dark .ant-menu-item-selected {
    background-color: ${COLORS.RezztoranPrimary};
  }
`;
