import { Input } from "antd";
import styled from "styled-components";

type Props = {
  placeholder?: string;
  onChange?: () => void;
  value?: string;
  defaultValue?: string;
  size?: "large" | "middle" | "small";
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

const CSearch = ({
  placeholder,
  onChange,
  value,
  defaultValue,
  size,
  suffix,
  prefix,
}: Props) => (
  <InputWrapper
    size={size}
    defaultValue={defaultValue}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    suffix={suffix}
    prefix={prefix}
  />
);

export default CSearch;

const InputWrapper = styled(Input)`
  width: 50vh;
`;
