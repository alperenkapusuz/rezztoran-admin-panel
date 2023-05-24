import React from "react";
import { IRestaurantData } from "@interfaces/restaurant.interface";
import { Drawer, Divider, Image } from "antd";
import styled from "styled-components";

type Props = {
  open: boolean;
  onClose: () => void;
  data: IRestaurantData | undefined;
};

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div
    style={{
      color: "rgba(0, 0, 0, 0.65)",
      fontSize: "14px",
    }}
  >
    <p
      style={{
        display: "inline-block",
        marginRight: "8px",
        color: "rgba(0, 0, 0, 0.85)",
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

const RestaurantDetailDrawer = ({ open, onClose, data }: Props) => {
  const {
    restaurantName,
    restaurantImage,
    city,
    phone,
    detailedAddress,
    starCount,
    restaurantAttributes,
    bookingAvailable,
    openingTime,
    closingTime,
    // intervalMinutes,
    busyDates,
  } = data ?? {};

  return (
    <Drawer width={640} onClose={onClose} open={open}>
      <Image width={300} height={300} src={restaurantImage} preview={false} />
      <DescriptionItem title="Ad" content={restaurantName} />
      <DescriptionItem title="Şehir" content={city} />
      <DescriptionItem title="Telefon" content={phone} />
      <DescriptionItem title="Yıldız" content={starCount} />
      <DescriptionItem title="Açılış saati" content={openingTime} />
      <DescriptionItem title="Kapanış saati" content={closingTime} />
      <DescriptionItem title="Adres" content={detailedAddress} />
      <Divider />
      {restaurantAttributes && (
        <DescriptionItemDiv>Seçenekler: </DescriptionItemDiv>
      )}
      {restaurantAttributes &&
        Object.entries(restaurantAttributes).map(([item, availability]) => {
          if (availability === "Var") {
            return <p key={item}>{item}</p>;
          }
        })}
      <Divider />
      <DescriptionItem
        title="Rezervasyon durumu"
        content={bookingAvailable && "Yapılabilir"}
      />
      <Divider />
      <DescriptionItem title="Açılış saati" content={openingTime} />
      <DescriptionItem title="Kapanış saati" content={closingTime} />
      <Divider />
      <DescriptionItem
        title="Meşgul saatler"
        content={busyDates?.map((x) => (
          <p>{x}</p>
        ))}
      />
    </Drawer>
  );
};

export default RestaurantDetailDrawer;

const DescriptionItemDiv = styled.div`
  margin-bottom: 7px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5715;
`;
