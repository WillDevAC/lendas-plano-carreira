import React, { useState } from "react";
import S from "./styles.module.scss";
import { LockOpen } from "@phosphor-icons/react";
import CardRestriction from "../CardRestriction";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import Loader from "../Loader";
import { toast } from "react-toastify";


interface IRestrictionsResponse {
  name: string;
}

const UserRankingListAdmin: React.FC = () => {
  const queryClient = useQueryClient();

  const [afiliate, setAfiliate] = useState<IRestrictionsResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const { isLoading } = useQuery("getRestrictionsList", () => {
    return axios
      .get("https://fraternidadesim.com/backend/get_restriction.php")
      .then((response) => {
        setAfiliate(response.data);
      });
  });

  const handleOpen = () => {
    var user_afiliate = prompt("Digite o nome de usuário do afiliado:");

    if (user_afiliate) {
      setLoading(true);
      axios
        .get(
          `https://fraternidadesim.com/backend/add_restriction.php?afiliate=${user_afiliate}`
        )
        .then(() => {
          toast.success("Restrição adicionada com sucesso!");
          queryClient.invalidateQueries("getRestrictionsList");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Erro na solicitação GET:", error);
        });
    }
  };

  return (
    <>
      <main className={S.main}>
        <section className={S.new__restriction}>
          <button onClick={() => handleOpen()}>
            <LockOpen size={25} />
            Nova Restrição
          </button>
        </section>
        <div className={S.list__restritions}>
          {afiliate.length === 0 ? (
            <h5>Não foram encontradas restrições.</h5>
          ) : (
            afiliate.map((response) => <CardRestriction name={response.name} />)
          )}
        </div>
      </main>
      {isLoading && <Loader />}
      {loading && <Loader />}
    </>
  );
};

export default UserRankingListAdmin;
