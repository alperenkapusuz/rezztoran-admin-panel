import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import styled from "styled-components";
import { COLORS } from "@constants/index";
import type { MenuProps } from "antd";
import { UserOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CButton } from "..";
import StorageService from "@services/storage";
const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  path?: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    path,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Restoran", "sub0", undefined, <HomeOutlined />, [
    getItem("Restoran Listesi", "0", "/restaurant"),
  ]),

  getItem("Kullanıcı", "sub1", undefined, <UserOutlined />, [
    getItem("Kullanıcı Listesi", "2", "/kullanici-listesi"),
    getItem("Kullanıcı Ekle", "3", "/kullanici-ekle"),
  ]),
];

const flatItems: MenuItem[] = items.reduce((acc: MenuItem[], item: any) => {
  if (item.children) {
    acc.push(item, ...item.children);
  } else {
    acc.push(item);
  }
  return acc;
}, []);

const findMenuItemByKey = (key: React.Key): MenuItem | undefined => {
  return flatItems.find((item: any) => item.key === key);
};

type Props = {
  collapsed: boolean;
  onLogin: () => void;
};

const CSider = ({ collapsed, onLogin }: Props) => {
  const navigate = useNavigate();
  const handleMenuClick = (key: React.Key) => {
    const clickedItem: any = findMenuItemByKey(key);
    if (clickedItem?.path) {
      navigate(clickedItem?.path);
    }
  };

  const handleLogout = () => {
    StorageService.clearUserData();
    onLogin();
    navigate("/");
  };

  return (
    <SiderWrapper trigger={null} collapsible collapsed={collapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        onClick={({ key }) => handleMenuClick(key)}
      />
      <CButton
        type="ghost"
        radius="10px"
        onClick={handleLogout}
        style={{
          color: COLORS.RezztoranWhite,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          position: "absolute",
          bottom: 40,
          left: 35,
        }}
      >
        <LogoutOutlined /> Çıkış Yap
      </CButton>
    </SiderWrapper>
  );
};

export default CSider;

const SiderWrapper = styled(Sider)`
  .ant-menu-dark .ant-menu-item-selected {
    background-color: ${COLORS.RezztoranPrimary};
  }
`;
