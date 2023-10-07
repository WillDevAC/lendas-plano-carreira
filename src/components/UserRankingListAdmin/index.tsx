import React, { useState } from "react";
import S from "./styles.module.scss";
import { Crown, LockOpen, Trash } from "@phosphor-icons/react";
import CardRestriction from "../CardRestriction";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import Loader from "../Loader";
import { toast } from "react-toastify";

interface IRestrictionsResponse {
  name: string;
}

interface IRulesProps {
  rule: string;
}

const UserRankingListAdmin: React.FC = () => {
  const queryClient = useQueryClient();

  const [afiliate, setAfiliate] = useState<IRestrictionsResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(5); // Inicialmente, mostrar 5 cartões
  const [totalRestrictions, setTotalRestrictions] = useState(0); // Total de cartões
  const [rulesList, setRulesList] = useState<IRulesProps[]>([]);

  const { isLoading } = useQuery("getRestrictionsList", () => {
    return axios
      .get("https://fraternidadesim.com/backend/get_restriction.php")
      .then((response) => {
        const data = response.data;
        setAfiliate(data);
        setTotalRestrictions(data.length);
      });
  });

  useQuery("getRulesListNew", () => {
    return axios
      .get(`https://fraternidadesim.com/backend/get_rules.php`)
      .then((response) => {
        setRulesList(response.data);
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

  const handleOpenRule = () => {
    var user_rule = prompt("Digite a nova regra para o site: ");

    if (user_rule) {
      setLoading(true);

      axios
        .get(
          `https://fraternidadesim.com/backend/add_rule.php?rule=${user_rule}`
        )
        .then(() => {
          toast.success("Regra adicionada com sucesso!");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Erro na solicitação GET:", error);
        });
    }
  };

  const handleShowMore = () => {
    setShowMore((prevShowMore) => prevShowMore + 5);
  };

  const deleteRule = useMutation(
    async (rule: string) => {
      try {
        await axios.get(
          `https://fraternidadesim.com/backend/exclude_rule.php?rule=${rule}`
        );
      } catch (error) {
        console.error("Erro na exclusão:", error);
      }
    },
    {
      onSuccess: () => {
        toast.success("Restrição excluida!");
        queryClient.invalidateQueries("getRulesListNew");
      },
    }
  );

  return (
    <>
      <main className={S.main}>
        <section className={S.new__restriction}>
          <button onClick={() => handleOpen()}>
            <LockOpen size={25} />
            Nova Restrição
          </button>
          <button onClick={() => handleOpenRule()}>
            <Crown size={25} />
            Nova Regra
          </button>
        </section>
        <div className={S.list__restritions}>
          {afiliate.slice(0, showMore).map((response) => (
            <CardRestriction name={response.name} />
          ))}

          <div className={S.more__rules}>
            {showMore < totalRestrictions && (
              <button onClick={handleShowMore}>Mostrar mais</button>
            )}
          </div>

          <div className={S.list__rules}>
            {rulesList.map((response) => (
              <div className={S.rule_admin}>
                <span>{response.rule}</span>
                <button
                  className={S.rule__admin__button}
                  onClick={() => deleteRule.mutate(response.rule)}
                  disabled={deleteRule.isLoading}
                >
                  <Trash size={25} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      {isLoading && <Loader />}
      {loading && <Loader />}
    </>
  );
};

export default UserRankingListAdmin;
