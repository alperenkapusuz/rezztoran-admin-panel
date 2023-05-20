import { END_POINTS } from "@constants/end-points";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IUserPost, IUserUpdate } from "@interfaces/user.interface";
import { service } from "@config/axios";

const getUser = async () => {
  const URL = END_POINTS.USER_CONTOLLER.USER_LIST;
  const response = await service.get(URL);
  return response.data.content;
};

export const useGetUser = () => {
  const { data, isLoading, refetch } = useQuery(["getUser"], () => getUser(), {
    refetchOnWindowFocus: false,
    cacheTime: 10,
    staleTime: 5,
  });
  return { data, isLoading, refetch };
};

const postUser = async (values: IUserPost) => {
  const response = await service.post(
    END_POINTS.USER_CONTOLLER.CREATE_USER_BY_ROLE,
    values
  );
  return response.data;
};

export const usePostUser = () => {
  return useMutation(postUser);
};

const updateUser = async (values: IUserUpdate) => {
  const URL = `${END_POINTS.USER_CONTOLLER.UPDATE_USER}`;
  const response = await service.put(URL, values);
  return response.data;
};

export const useUpdateUser = () => {
  return useMutation(updateUser);
};

const deleteUser = async (id: string) => {
  const URL = `${END_POINTS.USER_CONTOLLER.DELETE_USER}/${id}`;
  const response = await service.delete(URL);
  return response.data;
};

export const useDeleteUser = () => {
  return useMutation(deleteUser);
};
