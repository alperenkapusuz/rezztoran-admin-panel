import React from "react";
import { IRestaurantData } from "@interfaces/restaurant.interface";
import { Drawer, Row, Col, Divider, Image } from "antd";
import styled from "styled-components";
import { StarOutlined } from "@ant-design/icons";
import { COLORS } from "@constants/colors";

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
    intervalMinutes,
    busyDates,
  } = data ?? {};

  console.log(
    "a: ",
    bookingAvailable,
    " b: ",
    intervalMinutes,
    " c:",
    busyDates
  );

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

// const ColWrapper = styled(Col)`
//   width: 49%;
//   padding: 20px;
// `;

// const ImageWrapper = styled(Image)`
//   border-radius: 10px;
// `;

// const RowTitle = styled(Row)`
//   max-width: 250px;
//   font-size: 30px;
//   font-family: "Poppins" sans-serif;
//   line-height: 50px;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
// `;

// const RowSubtitle = styled(Row)`
//   font-size: 16px;
//   line-height: 40px;
// `;

// const ColStarCount = styled(Col)`
//   font-size: 20px;
//   margin-top: 10px;
//   margin-bottom: 10px;
// `;

// const ClockWrapper = styled(Row)`
//   border: 2px solid ${COLORS.RezztoranPrimary};
//   display: flex;
//   justify-content: space-evenly;
//   margin-top: 15px;
//   padding: 10px;
//   border-radius: 10px;
//   width: 200px;
// `;

// const ClockSpan = styled.span`
//   font-size: 18px;
//   color: ${COLORS.RezztoranPrimary};
// `;

// const UlList = styled.ul`
//   list-style-type: circle;
// `;

const DescriptionItemDiv = styled.div`
  margin-bottom: 7px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5715;
`;

const DescriptionItemP = styled.div`
  display: inline-block;
  margin-right: 8px;
  color: rgba(0, 0, 0, 0.85);
`;
