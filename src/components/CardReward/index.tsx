import React, { useState } from "react";
import S from "./style.module.scss";
import { Info, Medal } from "@phosphor-icons/react";
import { Tooltip, Whisper } from "rsuite";

interface ICardReward {
  reward_porcentage: number;
  reward: string;
  reward_desc: string;
  deposits?: number | undefined;
}

const CardReward: React.FC<ICardReward> = ({
  reward,
  deposits,
  reward_porcentage,
  reward_desc
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const number_formated =
    deposits?.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) ?? "";

  const porcent =
    reward_porcentage?.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) ?? "";

  const formattedDeposits = number_formated.replace(/,/g, "");
  const formattedPercentage = porcent.replace(/,/g, "");

  return (
    <div className={S.card}>
      {parseInt(formattedDeposits) >= parseInt(formattedPercentage) ? (
        <div className={S.status__revenue} id={S.completed}>
          <Medal size={30} />
          <span>CONCLUIDO</span>
        </div>
      ) : (
        <div className={S.status__revenue} id={S.pending}>
          <Medal size={30} />
          <span>PENDENTE</span>
        </div>
      )}
      <div
        className={S.info_reward}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <Whisper
          placement="top"
          controlId="control-id-hover"
          trigger="hover"
          open={showTooltip}
          speaker={
            <Tooltip>
              <b>RECOMPENSA: </b>
              {reward_desc}
            </Tooltip>
          }
        >
          <Info size={30} />
        </Whisper>
      </div>
      <span>{reward}</span>
    </div>
  );
};

export default CardReward;
