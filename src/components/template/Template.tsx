import { useState } from "react";
import { Layout, theme } from "antd";
import { CHeader, CSider } from "@components/index";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import React from "react";
const { Content, Footer } = Layout;

type Props = {
  onLogin: () => void;
};

const Template = ({ onLogin }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <LayoutWrapper>
      <CSider collapsed={collapsed} onLogin={onLogin} />
      <Layout>
        <CHeader
          collapsed={collapsed}
          colorBgContainer={colorBgContainer}
          setCollapsed={setCollapsed}
        />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
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

const ContentWrapper = styled(Content)`
  overflow: auto;
`;
