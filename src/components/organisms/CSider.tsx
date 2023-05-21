import React from "react";
import { Layout, Menu } from "antd";
import styled from "styled-components";
import { COLORS } from "@constants/index";
import type { MenuProps } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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
    getItem("Restoran Listesi", "0", "/restoran-listesi"),
    getItem("Restoran Ekle", "1", "/restoran-ekle"),
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
};

const CSider = ({ collapsed }: Props) => {
  const navigate = useNavigate();

  const handleMenuClick = (key: React.Key) => {
    const clickedItem: any = findMenuItemByKey(key);
    if (clickedItem?.path) {
      navigate(clickedItem?.path);
    }
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
    </SiderWrapper>
  );
};

export default CSider;

const SiderWrapper = styled(Sider)`
  .ant-menu-dark .ant-menu-item-selected {
    background-color: ${COLORS.RezztoranPrimary};
  }
`;
