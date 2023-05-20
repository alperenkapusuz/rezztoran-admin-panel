import React from "react";
import { Button } from "antd";

type Props = {
  danger?: boolean;
  disabled?: boolean;
  size?: "large" | "middle" | "small";
  type: "primary" | "ghost" | "dashed" | "link" | "text" | "default";
  onClick?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode | string;
  htmlType?: "button" | "submit" | "reset";
  radius?: string;
  w?: string;
};

const CButton = ({
  danger,
  disabled,
  size,
  type,
  onClick,
  icon,
  children,
  htmlType,
  w,
  radius,
}: Props) => {
  return (
    <Button
      danger={danger}
      disabled={disabled}
      size={size}
      type={type}
      onClick={onClick}
      icon={icon}
      htmlType={htmlType}
      style={{
        width: `${w ? w : null}`,
        borderRadius: `${radius ? radius : "50%"}`,
      }}
    >
      {children}
    </Button>
  );
};

export default CButton;
