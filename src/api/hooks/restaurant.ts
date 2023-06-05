import { END_POINTS } from "@constants/end-points";
import { useMutation, useQuery } from "@tanstack/react-query";
import { service } from "@config/axios";
import { IRestaurantData } from "@interfaces/restaurant.interface";

const getRestaurantList = async () => {
  const URL = END_POINTS.REZZTORAN_RESTAURANT_SERVICE.RESTAURANT_LIST;
  const response = await service.get(URL);
  return response.data.content;
};

export const useGetRestaurant = () => {
  const { data, isLoading, refetch } = useQuery(
    ["getRestaurantList"],
    getRestaurantList,
    {
      refetchOnWindowFocus: false,
      cacheTime: 10,
      staleTime: 5,
    }
  );
  return { data, isLoading, refetch };
};

const postRestaurant = async (values: IRestaurantData) => {
  const URL = END_POINTS.REZZTORAN_RESTAURANT_SERVICE.RESTAURANT_CREATE;
  const response = await service.post(URL, values);
  return response.data;
};

export const usePostRestaurant = () => {
  return useMutation(postRestaurant);
};

const deleteRestaurant = async (id: string) => {
  const URL = `${END_POINTS.REZZTORAN_RESTAURANT_SERVICE.RESTAURANT_DELETE}/${id}`;
  const response = await service.delete(URL);
  return response.data;
};

export const useDeleteRestaurant = () => {
  return useMutation(deleteRestaurant);
};

export const useSearchRestaurants = (params: any) => {
  return useQuery(["restaurants", params.toString()], async () => {
    const response = await service.get(
      `${END_POINTS.REZZTORAN_RESTAURANT_SERVICE.RESTAURANT_SEARCH}`,
      { params }
    );
    if (response.status !== 200) {
      throw new Error("An error occurred while fetching the data");
    }
    return response.data;
  });
};
