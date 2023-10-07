import React, { useState } from "react";

import S from "./styles.module.scss";
import { useQuery } from "react-query";
import axios from "axios";

interface IRulesProps {
  rule: string;
}

const CardRules: React.FC = () => {
  const [rulesList, setRulesList] = useState<IRulesProps[]>([]);

  useQuery("getRulesList", () => {
    return axios
      .get(`https://fraternidadesim.com/backend/get_rules.php`)
      .then((response) => {
        setRulesList(response.data);
      });
  });

  return (
    <div className={S.card__rules}>
      <h1>Regras</h1>

      {rulesList.map((response) => (
        <div className={S.rule}>
          <h5>
            {response.rule}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CardRules;
