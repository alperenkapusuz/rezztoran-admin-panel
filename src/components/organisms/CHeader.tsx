import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";
import CBreadcrumb from "../atoms/CBreadcrumb";
import styled from "styled-components";
const { Header } = Layout;

type Props = {
  collapsed: boolean;
  colorBgContainer: string;
  setCollapsed: (value: boolean) => void;
};

const CHeader = ({ collapsed, colorBgContainer, setCollapsed }: Props) => {
  return (
    <HeaderWrapper style={{ padding: 0, background: colorBgContainer }}>
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
      <CBreadcrumb />
    </HeaderWrapper>
  );
};

export default CHeader;

const HeaderWrapper = styled(Header)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;
