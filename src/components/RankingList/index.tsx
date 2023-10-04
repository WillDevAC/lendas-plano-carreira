import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import S from "./styles.module.scss";
import Loader from "../Loader";
import ModalRewards from "../ModalRewards";
import TopUserRanking from "../TopUserRanking";
import OtherUserRanking from "../OtherUserRanking";

interface IRankListResponse {
  user: string;
  deposits: number;
  deposit_formatted: string;
  surname: string;
  position: string;
  registrations: string;
}

const RankingList: React.FC = () => {
  const [topRankingList, setTopRankingList] = useState<IRankListResponse[]>([]);
  const [otherRankingList, setOtherRankList] = useState<IRankListResponse[]>([]);
  const [showMore] = useState<number>(10);
  const [visible, setVisible] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState<IRankListResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [visibleResults, setVisibleResults] = useState<number>(10); 
  const [noResults, setNoResults] = useState<boolean>(false); 

  const { isLoading } = useQuery("getRankingList", () => {
    return axios.get("https://fraternidadesim.com/backend/").then((response) => {
      setTopRankingList(response.data.TopRanking);
      setOtherRankList(response.data.Others);
    });
  });

  useEffect(() => {
    setVisibleResults(10);
  }, [searchTerm]);

  useEffect(() => {
    setNoResults(
      otherRankingList.filter((list) =>
        list.user.toLowerCase().includes(searchTerm.toLowerCase())
      ).length === 0
    );
  }, [otherRankingList, searchTerm]);

  const showModalRewards = (userData: IRankListResponse | null) => {
    setSelectedUserData(userData);
    setVisible(true);
    document.body.classList.add("no-scroll");
  };

  const handleShowMore = () => {
    setVisibleResults((prevVisibleResults) => prevVisibleResults + 10);
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
          <div className={S.otherRankingSearch}>
            <input
              type="search"
              placeholder="Pesquisar afiliado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul data-aos="fade-right">
            {otherRankingList
              .filter((list) =>
                list.user.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(0, visibleResults)
              .map((list, index) => (
                <div key={index} onClick={() => showModalRewards(list)}>
                  <OtherUserRanking
                    position={parseInt(list.position)}
                    name={list.user}
                    revenue={list.deposit_formatted}
                  />
                </div>
              ))}
          </ul>
          {searchTerm === "" && visibleResults < otherRankingList.length && (
            <div className={S.More}>
              <button onClick={handleShowMore}>Mostrar mais resultados</button>
            </div>
          )}
          {visible && (
                <ModalRewards
                  setVisible={setVisible}
                  visible={visible}
                  {...selectedUserData}
                />
              )}
          {noResults && searchTerm !== "" && (
            <h5>Nenhum afiliado encontrado.</h5>
          )}
        </div>
      </main>
      {isLoading && <Loader />}
    </>
  );
};

export default RankingList;
