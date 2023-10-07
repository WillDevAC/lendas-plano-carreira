import React from "react";
import S from "./styles.module.scss";

interface IOtherUserRanking {
  position: number;
  name: string;
  revenue: number;
}

const OtherUserRanking: React.FC<IOtherUserRanking> = ({
  position,
  name,
  revenue,
}) => {
  // Use toLocaleString para formatar o número com duas casas decimais e remover zeros à direita.
  const formattedRevenue = revenue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <li className={S.other__li}>
        <span>#{position}</span>
        <p data-name>{name}</p>
        <span data-revenue className={S.revenue}>
          R$ {formattedRevenue}
        </span>
      </li>
    </>
  );
};

export default OtherUserRanking;
