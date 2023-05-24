import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchRestaurants } from "@api/hooks/restaurant";
//========
import { useDeleteRestaurant } from "@api/hooks/restaurant";
import { CButton } from "@components/index";
import {
  IRestaurantData,
  IRestaurantTable,
} from "@interfaces/restaurant.interface";
import { ColumnsType } from "antd/es/table";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Modal } from "antd";
import { toast } from "react-toastify";
const { confirm } = Modal;

export const useSearchPage = ({ searchUrl }: any) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [params, setParams] = useState({
    city: "",
    restaurantName: "",
    sortDirection: "DESC",
    sortField: "averageReviewStar",
    pageSize: 10,
    currentPage: 0,
  });

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    const { city, restaurantName, sortDirection, sortField } = params;
    searchParams.set("city", city);
    searchParams.set("restaurantName", restaurantName);
    searchParams.set("sortDirection", sortDirection);
    searchParams.set("sortField", sortField);

    navigate(`${searchUrl}?${searchParams.toString()}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setParams((prevState) => ({
      ...prevState,
      city: searchParams.get("city") || "",
      restaurantName: searchParams.get("restaurantName") || "",
      sortDirection: searchParams.get("sortDirection") || "DESC",
      sortField: searchParams.get("sortField") || "averageReviewStar",
      currentPage: Number(searchParams.get("page")) + 1 || 1,
    }));
  }, [location.search]);

  const searchParams = new URLSearchParams(location.search);

  searchParams.set("size", params.pageSize.toString());
  const { data, isLoading, refetch } = useSearchRestaurants(searchParams);

  const handlePageChange = (page: number) => {
    setParams((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
    navigateWithPage(page - 1);
  };

  const handlePageSizeChange = (size: number) => {
    setParams((prevState) => ({
      ...prevState,
      pageSize: size,
      currentPage: 1,
    }));
    navigateWithPageSize(0, size);
  };

  const navigateWithPage = (page: number) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("page", page.toString());
    urlParams.set("size", params.pageSize.toString());
    navigate(`${searchUrl}?${urlParams.toString()}`);
  };

  const navigateWithPageSize = (page: number, size: number) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("page", page.toString());
    urlParams.set("size", size.toString());
    navigate(`${searchUrl}?${urlParams.toString()}`);
  };

  const setParamField = (fieldName: string, value: any) => {
    setParams((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const { mutate: deleteRestaurant } = useDeleteRestaurant();
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<IRestaurantData>();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const columns: ColumnsType<IRestaurantTable> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Restoran Adı",
      dataIndex: "restaurantName",
      key: "restaurantName",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Şehir",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Rezervasyon",
      dataIndex: "bookingAvailable",
      key: "bookingAvailable",
      render: (res: boolean) => {
        return res ? <span>Var</span> : <span>Yok</span>;
      },
    },
    {
      title: "Açılış Vakti",
      dataIndex: "openingTime",
      key: "openingTime",
    },
    {
      title: "Kapanış Vakti",
      dataIndex: "closingTime",
      key: "closingTime",
    },
    {
      title: "Ayrıntı",
      dataIndex: "detail",
      key: "detail",
      fixed: "right",
      render: (_, res) => {
        return (
          <CButton
            radius="50%"
            type="primary"
            icon={<InfoCircleOutlined />}
            onClick={() => onOpenDrawer(res.id.toString())}
          />
        );
      },
    },
    {
      title: "Sil",
      dataIndex: "delete",
      key: "delete",
      fixed: "right",
      render: (_, res) => {
        return (
          <CButton
            radius="50%"
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              deleteInfo(res.id.toString());
            }}
          />
        );
      },
    },
  ];

  const deleteInfo = (id: string) => {
    confirm({
      title: "Bu restoranı silmek istiyor musunuz?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteRestaurantHandler(id);
      },
    });
  };

  const deleteRestaurantHandler = (id: string) => {
    new Promise((resolve, reject) => {
      deleteRestaurant(id, {
        onSuccess: (data) => {
          toast.success("Restoran Başarı ile silindi!");
          refetch();
          resolve(data);
        },
        onError: (error) => {
          toast.error("Bir hata meydana geldi!");
          reject(error);
        },
      });
    });
  };

  const onCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const onOpenDrawer = (resId: string) => {
    const selectedRes = data.content.filter(
      (res: IRestaurantTable) => res.id.toString() === resId
    );
    setSelectedRestaurant(selectedRes?.[0]);
    setDrawerOpen(true);
  };

  return {
    params,
    isLoading,
    setParamField,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    columns,
    data,
    drawerOpen,
    onCloseDrawer,
    selectedRestaurant,
  };
};
