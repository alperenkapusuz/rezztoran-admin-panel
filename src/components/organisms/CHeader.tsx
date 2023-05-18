import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";
const { Header } = Layout;

type Props = {
  collapsed: boolean;
  colorBgContainer: string;
  setCollapsed: (value: boolean) => void;
};

const CHeader = ({ collapsed, colorBgContainer, setCollapsed }: Props) => {
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};

export default CHeader;
