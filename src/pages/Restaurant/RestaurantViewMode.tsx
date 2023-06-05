import React from "react";
import { CSpin, CTable, CTableHeader, LeafletMap } from "@components/index";
import RestaurantDetailDrawer from "./RestaurantDetailDrawer";
import RestaurantSearch from "./RestaurantSearch";
import { useSearchPage } from "./useSearch";

const RestaurantViewMode = () => {
  const {
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
  } = useSearchPage({
    searchUrl: "/restaurant",
  });

  const {
    city,
    restaurantName,
    sortDirection,
    sortField,
    pageSize,
    currentPage,
  } = params;

  if (isLoading) {
    return <CSpin />;
  }

  const pagination = {
    current: currentPage,
    pageSize,
    total: data.totalElements,
    onChange: handlePageChange,
    onShowSizeChange: handlePageSizeChange,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "30", "50", "100"],
    showTotal: (total: any, range: any) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <>
      <CTableHeader>
        <RestaurantSearch
          city={city}
          restaurantName={restaurantName}
          sortDirection={sortDirection}
          sortField={sortField}
          setParamField={setParamField}
          handleSearch={handleSearch}
        />
      </CTableHeader>
      {data && (
        <CTable
          columns={columns}
          dataSource={data.content}
          pagination={pagination}
        />
      )}

      <RestaurantDetailDrawer
        open={drawerOpen}
        onClose={onCloseDrawer}
        data={selectedRestaurant}
      />
    </>
  );
};

export default RestaurantViewMode;
