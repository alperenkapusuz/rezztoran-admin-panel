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
  height: 100%;
  position: absolute;
  left: 0;
  width: 100%;
  overflow: hidden;
`;

const FooterWrapper = styled(Footer)`
  text-align: center;
`;
