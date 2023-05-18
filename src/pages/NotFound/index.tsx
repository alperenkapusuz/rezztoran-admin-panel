import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { Template } from "@components/index";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Template>
      <Result
        status="404"
        title="404"
        subTitle="Üzgünüz, ziyaret ettiğiniz sayfa mevcut değil"
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    </Template>
  );
};
export default NotFound;
