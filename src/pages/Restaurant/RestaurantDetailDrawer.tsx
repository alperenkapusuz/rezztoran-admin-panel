import { Drawer } from "antd";

type Props = {
  open: boolean;
  onClose: () => void;
};

const RestaurantDetailDrawer = ({ open, onClose }: Props) => {
  return (
    <Drawer onClose={onClose} open={open}>
      RestaurantDetailDrawer
    </Drawer>
  );
};

export default RestaurantDetailDrawer;
