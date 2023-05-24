import React from "react";
import { CSearch, CButton, CSelect } from "@components/index";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

type Props = {
  city: string;
  restaurantName: string;
  sortDirection: string;
  sortField: string;
  setParamField: (fieldName: string, value: any) => void;
  handleSearch: () => void;
};

const RestaurantSearch = ({
  city,
  restaurantName,
  sortDirection,
  sortField,
  setParamField,
  handleSearch,
}: Props) => {
  return (
    <SearchWrapper>
      <CSearch
        w="200px"
        placeholder="şehir"
        suffix={<SearchOutlined />}
        value={city}
        onChange={(e) => setParamField("city", e.target.value)}
      />
      <CSearch
        w="200px"
        placeholder="restoran adı"
        suffix={<SearchOutlined />}
        value={restaurantName}
        onChange={(e) => setParamField("restaurantName", e.target.value)}
      />
      <CSelect
        w="150px"
        value={sortDirection}
        onChange={(value) => setParamField("sortDirection", value)}
        options={[
          { value: "DESC", label: "Descending" },
          { value: "ASC", label: "Ascending" },
        ]}
      />
      <CSelect
        w="250px"
        value={sortField}
        onChange={(value) => setParamField("sortField", value)}
        options={[
          { value: "restaurantName", label: "Restoran Adı" },
          { value: "reviewsCount", label: "İnceleme Sayısı" },
          { value: "averageReviewStar", label: "Ortalama İnceleme Yıldızı" },
        ]}
      />
      <CButton onClick={handleSearch} type="primary" w="100px" radius="5px">
        Ara
      </CButton>
    </SearchWrapper>
  );
};

export default RestaurantSearch;

const SearchWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

/*
city
restaurant name
asc | desc
reviews count
search button

*/
