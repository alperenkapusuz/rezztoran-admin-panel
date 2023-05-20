import { ISelectOptions } from "@interfaces/select.interface";
import { Select } from "antd";

type Props = {
  defaultValue?: string;
  onChange?: () => void;
  options: ISelectOptions[];
  size?: "large" | "middle" | "small";
  disabled?: boolean;
  value?: string | string[];
  placeholder?: string;
};

const CSelect = ({
  defaultValue,
  onChange,
  options,
  size,
  value,
  placeholder,
}: Props) => {
  return (
    <Select
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      size={size}
      value={value}
    />
  );
};

export default CSelect;
