import { Input } from "antd";

type Props = {
  placeholder?: string;
  onChange?: (e: any) => void;
  value?: string;
  defaultValue?: string;
  size?: "large" | "middle" | "small";
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  password?: boolean;
  w?: string;
};

const CSearch = ({
  placeholder,
  onChange,
  value,
  defaultValue,
  size,
  suffix,
  prefix,
  disabled,
  password,
  w,
}: Props) => {
  if (password) {
    return (
      <Input.Password
        disabled={disabled}
        size={size}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        suffix={suffix}
        prefix={prefix}
        type="password"
        style={{ width: w ? w : "100%" }}
      />
    );
  }

  return (
    <Input
      disabled={disabled}
      size={size}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      suffix={suffix}
      prefix={prefix}
      style={{ width: w ? w : "100%" }}
    />
  );
};

export default CSearch;
