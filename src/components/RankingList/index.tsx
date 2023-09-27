import React, { useState } from "react";
import TopUserRanking from "../TopUserRanking";
import OtherUserRanking from "../OtherUserRanking";
import { useQuery } from "react-query";
import axios from "axios";

import S from "./styles.module.scss";

interface IRankListResponse {
  user: string;
  deposits: string;
  deposit_formatted: string;
  surname: string;
  position: string;
}

const RankingList: React.FC = () => {
  const [topRankingList, setTopRankingList] = useState<IRankListResponse[]>([]);
  const [otherRankingList, setOtherRankList] = useState<IRankListResponse[]>([]);
  const [showMore, setShowMore] = useState<number>(10);

  const { isLoading } = useQuery("getRankingList", () => {
    return axios
      .get("https://fraternidadesim.com/backend/")
      .then((response) => {
        setTopRankingList(response.data.TopRanking);
        setOtherRankList(response.data.Others);
      });
  });

  if (isLoading) {
    console.log("carregando...");
  }

  const handleShowMore = () => {
    setShowMore((prevShowMore) => prevShowMore + 10);
  };

  return (
    <main className={S.RankingContainer}>
      <section className={S.topRanking}>
        <div className={S.podium}>
          <ul>
            {topRankingList.slice(0, showMore).map((list, index) => (
              <TopUserRanking
                key={index}
                name={list.user}
                surname={list.surname}
                position={parseInt(list.position)}
                revenue={list.deposit_formatted}
              />
            ))}
          </ul>
        </div>
      </section>
      <div className={S.otherRanking}>
        <ul data-aos="fade-right">
          {otherRankingList.slice(0, showMore).map((list, index) => (
            <OtherUserRanking
              key={index}
              position={parseInt(list.position)}
              name={list.user}
              revenue={list.deposit_formatted}
            />
          ))}
        </ul>
        {showMore < otherRankingList.length && (
          <div className={S.More}>
            <button onClick={handleShowMore}>Mostrar mais resultados</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default RankingList;
