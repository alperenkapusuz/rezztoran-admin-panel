import { END_POINTS } from "@constants/end-points";
import { useMutation } from "@tanstack/react-query";
import { ILoginFormData } from "@interfaces/auth.interface";
import { service } from "@config/axios";

const postLogin = async (values: ILoginFormData) => {
  const response = await service.post(END_POINTS.AUTH_CONTROLLER.LOGIN, values);
  return response.data;
};

export const usePostLogin = () => {
  return useMutation(postLogin);
};
