import React, { useState } from "react";

import S from "./styles.module.scss";

import TopUserRanking from "../TopUserRanking";
import OtherUserRanking from "../OtherUserRanking";

import { useQuery } from "react-query";

import axios from "axios";

interface IRankListResponse {
  user: string;
  deposits: string;
  deposit_formatted: string;
  surname: string;
  position: string;
}
const RankingList: React.FC = () => {
  const [topRankingList, setTopRankingList] = useState<IRankListResponse[]>([]);
  const [otherRankingList, setOtherRankList] = useState<IRankListResponse[]>(
    []
  );

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

  return (
    <main className={S.RankingContainer}>
      <section className={S.topRanking}>
        <div className={S.podium}>
          <ul>
            {topRankingList.map((list) => (
              <TopUserRanking
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
          {otherRankingList.map((list) => (
            <OtherUserRanking
              position={parseInt(list.position)}
              name={list.user}
              revenue={list.deposit_formatted}
            />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default RankingList;
