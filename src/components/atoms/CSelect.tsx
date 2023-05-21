import { ISelectOptions } from "@interfaces/select.interface";
import { Select } from "antd";

type Props = {
  clear: boolean;
  defaultValue?: string;
  onChange?: (e: string) => void;
  options: ISelectOptions[];
  size?: "large" | "middle" | "small";
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  w?: string;
};

const CSelect = ({
  defaultValue,
  onChange,
  options,
  size,
  value,
  placeholder,
  w,
  clear,
}: Props) => {
  return (
    <Select
      allowClear={clear}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      size={size}
      value={value}
      style={{ width: w ? w : "100%" }}
    />
  );
};

export default CSelect;
