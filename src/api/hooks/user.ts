import { END_POINTS } from "@constants/end-points";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IUserPost } from "@interfaces/user.interface";
import { service } from "@config/axios";

const getUser = async () => {
  const URL = END_POINTS.USER_CONTOLLER.USER_LIST;
  const response = await service.get(URL);
  return response.data.content;
};

export const useGetUser = () => {
  const { data, isLoading } = useQuery(["getUser"], () => getUser());
  return { data, isLoading };
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
