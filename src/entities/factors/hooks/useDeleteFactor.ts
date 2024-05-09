import {useCallback} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFactor } from "../api/index";

export const useDeleteFactor = () => {

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<any, Error, string>({
    mutationFn: deleteFactor,
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
