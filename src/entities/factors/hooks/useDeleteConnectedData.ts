import {useCallback} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFactor, deleteFactorConnectData } from "../api/index";

export const useDeleteConnectedData = () => {

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<any, Error, string>({
    mutationFn: deleteFactorConnectData,
    onError: error => new Error(error?.message)
  });

  const handleDelete = useCallback(
    async (id: string) => {

      await mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ['FACTORS_DATA'] });
    },
    [mutateAsync]
  );

  return {
    handleDelete,
    isLoading: isPending,
  };
};
