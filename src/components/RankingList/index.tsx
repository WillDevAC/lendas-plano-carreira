import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import S from "./styles.module.scss";
import Loader from "../Loader";
import ModalRewards from "../ModalRewards";
import TopUserRanking from "../TopUserRanking";
import OtherUserRanking from "../OtherUserRanking";

interface IRankListResponse {
  user: string;
  deposits: string;
  deposit_formatted: string;
  surname: string;
  position: string;
  registrations: string;
}

const RankingList: React.FC = () => {
  const [topRankingList, setTopRankingList] = useState<IRankListResponse[]>([]);
  const [otherRankingList, setOtherRankList] = useState<IRankListResponse[]>(
    []
  );
  const [showMore, setShowMore] = useState<number>(10);
  const [visible, setVisible] = useState(false);
  const [selectedUserData, setSelectedUserData] =
    useState<IRankListResponse | null>(null);

  const { isLoading } = useQuery("getRankingList", () => {
    return axios
      .get("https://fraternidadesim.com/backend/")
      .then((response) => {
        setTopRankingList(response.data.TopRanking);
        setOtherRankList(response.data.Others);
      });
  });

  const showModalRewards = (userData: IRankListResponse | null) => {
    setSelectedUserData(userData);
    setVisible(true);
    document.body.classList.add("no-scroll");
  };

  const handleShowMore = () => {
    setShowMore((prevShowMore) => prevShowMore + 10);
  };

  return (
    <>
      <main className={S.RankingContainer}>
        <section className={S.topRanking}>
          <div className={S.podium}>
          <h1>Ranking afiliados</h1>
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
              <div key={index} onClick={() => showModalRewards(list)}>
                <OtherUserRanking
                  position={parseInt(list.position)}
                  name={list.user}
                  revenue={list.deposit_formatted}
                />
              </div>
            ))}
          </ul>
          {showMore < otherRankingList.length && (
            <div className={S.More}>
              <button onClick={handleShowMore}>Mostrar mais resultados</button>
              {visible && (
                <ModalRewards
                  setVisible={setVisible}
                  visible={visible}
                  {...selectedUserData}
                />
              )}
            </div>
          )}
        </div>
      </main>
      {isLoading && <Loader />}
    </>
  );
};

export default RankingList;
