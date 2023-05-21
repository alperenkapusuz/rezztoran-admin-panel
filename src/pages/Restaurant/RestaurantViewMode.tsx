import { useDeleteRestaurant, useGetRestaurant } from "@api/hooks/restaurant";
import {
  CButton,
  CSearch,
  CSelect,
  CSpin,
  CTable,
  CTableHeader,
} from "@components/index";
import {
  IRestaurantData,
  IRestaurantTable,
} from "@interfaces/restaurant.interface";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState, ChangeEvent } from "react";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { CITIES } from "@constants/index";
import { Modal } from "antd";
import { toast } from "react-toastify";
const { confirm } = Modal;
import RestaurantDetailDrawer from "./RestaurantDetailDrawer";

const RestaurantViewMode = () => {
  const { data: restaurants, isLoading, refetch } = useGetRestaurant();
  const { mutate: deleteRestaurant } = useDeleteRestaurant();
  const [restaurantData, setRestaurantData] = useState<IRestaurantData[]>(
    restaurants === undefined ? [] : restaurants
  );
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    setRestaurantData(restaurants);
  }, [restaurants]);

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
      render: () => {
        return (
          <CButton
            radius="50%"
            type="primary"
            icon={<InfoCircleOutlined />}
            onClick={onOpenDrawer}
          />
        );
      },
    },
    {
      title: "Sil",
      dataIndex: "delete",
      key: "delete",
      fixed: "right",
      render: (_, user) => {
        return (
          <CButton
            radius="50%"
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              deleteInfo(user.id.toString());
            }}
          />
        );
      },
    },
  ];

  if (isLoading) {
    return <CSpin />;
  }

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

  const restaurantSearchHandler = (name: string, city: string) => {
    const filteredData = restaurants.filter((entry: IRestaurantData) => {
      const lowercaseName = entry.restaurantName.toLowerCase();
      const lowercaseCity = entry.city.toLowerCase();
      return lowercaseName.includes(name) && lowercaseCity.includes(city);
    });
    setRestaurantData(filteredData);
  };

  const restaurantNameSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const currValue = e.target.value.toLowerCase();
    setRestaurantName(currValue);
    restaurantSearchHandler(currValue, city);
  };

  const restaurantCitiesSelectHandler = (selectedCity: string) => {
    if (selectedCity === undefined) {
      setRestaurantData(restaurants);
    } else {
      const currValue = selectedCity.toLowerCase();
      setCity(currValue);
      restaurantSearchHandler(restaurantName, currValue);
    }
  };

  const onCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const onOpenDrawer = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <CTableHeader>
        <CSearch
          w="30vh"
          size="large"
          placeholder="Restoran Adı"
          value={restaurantName}
          suffix={<SearchOutlined />}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            restaurantNameSearchHandler(e)
          }
        />
        <CSelect
          clear
          w="30vh"
          size="large"
          placeholder="Şehir"
          options={CITIES}
          onChange={(selectedCity: string) =>
            restaurantCitiesSelectHandler(selectedCity)
          }
        />
      </CTableHeader>
      <CTable columns={columns} dataSource={restaurantData} />
      <RestaurantDetailDrawer open={drawerOpen} onClose={onCloseDrawer} />
    </>
  );
};

export default RestaurantViewMode;
