import React from "react";

import S from "./styles.module.scss";

interface ITopUserRanking {
  name: string;
  surname: string;
  revenue: string;
  position: number;
}

const TopUserRanking: React.FC<ITopUserRanking> = ({
  name,
  revenue,
  position,
  surname,
}) => {
  return (
    <li className={S.li}>
      <span>{position}</span>
      {position === 1 && <img id={S.crown} src="crown.svg" alt="coroa" />}
      <div className={S.user}>
        <h1>{surname}</h1>
      </div>
      <p data-name-podium>{name}</p>
      <span data-revenue-podium className={S.revenue}>
        {revenue}
      </span>
    </li>
  );
};

export default TopUserRanking;
