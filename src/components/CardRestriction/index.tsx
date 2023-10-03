import React from "react";
import S from "./styles.module.scss";
import { Trash } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";


interface ICardRestriction {
  name: string;
}

const CardRestriction: React.FC<ICardRestriction> = ({ name }) => {
  const queryClient = useQueryClient();
  const deleteRestriction = useMutation(
    async () => {
      try {
        await axios.get(
          `https://fraternidadesim.com/backend/exclude_restriction.php?afiliate=${name}`
        );
      } catch (error) {
        console.error("Erro na exclusão:", error);
      }
    },
    {
      onSuccess: () => {
        toast.success("Restrição excluida!")
        queryClient.invalidateQueries("getRestrictionsList");
      },
    }
  );

  return (
    <>
      <div className={S.card__restriction}>
      <span>{name}</span>
      <div className={S.card__restriction__action}>
        <button
          title="Botão de excluir"
          onClick={() => deleteRestriction.mutate()}
          disabled={deleteRestriction.isLoading}
          
        >
          {deleteRestriction.isLoading ? "Excluindo..." : <Trash size={25} />}
        </button>
      </div>
    </div>
    </>
  );
};

export default CardRestriction;
