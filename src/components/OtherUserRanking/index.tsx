import React from "react";

import S from "./styles.module.scss";

interface IOtherUserRanking {
  position: number;
  name: string;
  revenue: string;
}

const OtherUserRanking: React.FC<IOtherUserRanking> = ({
  position,
  name,
  revenue,
}) => {
  return (
    <>
      <li className={S.other__li}>
      <span>#{position}</span>
      <p data-name>{name}</p>
      <span data-revenue className={S.revenue}>
        {revenue}
      </span>
    </li>
    
    </>
  );
};

export default OtherUserRanking;
