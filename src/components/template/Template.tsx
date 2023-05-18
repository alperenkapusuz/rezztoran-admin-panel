import { useState } from "react";
import { Layout, theme } from "antd";
import { CHeader, CSider } from "@components/index";
import styled from "styled-components";

const { Content, Footer } = Layout;

type Props = {
  children: string | JSX.Element;
};

const Template = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <LayoutWrapper>
      <CSider collapsed={collapsed} />
      <Layout>
        <CHeader
          collapsed={collapsed}
          colorBgContainer={colorBgContainer}
          setCollapsed={setCollapsed}
        />
        <Content>{children}</Content>
        <FooterWrapper>Rezztoran ©2023</FooterWrapper>
      </Layout>
    </LayoutWrapper>
  );
};

export default Template;

const LayoutWrapper = styled(Layout)`
  height: 100vh;
  position: fixed;
  background: #ffffff;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  overflow: auto;
`;

const FooterWrapper = styled(Footer)`
  text-align: center;
`;