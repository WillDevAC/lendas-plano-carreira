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

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <>
      <li className={S.other__li}>
        <span>#{position}</span>
        <p data-name>{name}</p>
        <span data-revenue className={S.revenue}>
          {formatter.format(revenue)}
        </span>
      </li>
    </>
  );
};

export default OtherUserRanking;
