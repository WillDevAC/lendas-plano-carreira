import React, { useEffect } from "react";
import S from "./styles.module.scss";
import Rodal from "rodal";
import CardsRewards from "../CardsRewards";

interface IModalRewards {
  user?: string;
  deposit_formatted?: string;
  surname?: string;
  position?: string;
  registrations?: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  deposits?: number;
}

const ModalRewards: React.FC<IModalRewards> = ({
  setVisible,
  visible,
  user,
  deposit_formatted,
  position,
  surname,
  deposits,
  registrations,
}) => {
  useEffect(() => {
    if (visible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [visible]);

  const hideModalRewards = () => {
    setVisible(false);
  };

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div>
      <Rodal
        visible={visible}
        onClose={hideModalRewards}
        className={S.custom_modal}
      >
        <div className={S.modal_content}>
          <div className={S.modal__title}>
            <h1>
              <b>#{position}</b> - {user}
            </h1>
          </div>
          <div className={S.profile__information}>
            <div className={S.profile__picture}>
              <h1>{surname}</h1>
            </div>
            <div className={S.profile__revenue}>
              <div className={S.profile__revenue__info}>
                <h1>{deposits !== undefined ? formatter.format(deposits) : 'N/A'}</h1>
                <span>Dépositos</span>
              </div>
              <div className={S.profile__revenue__info}>
                <h1>{registrations !== undefined ? registrations : 'N/A'}</h1>
                <span>CADASTROS</span>
              </div>
            </div>
          </div>
          <div className={S.rewards__title}>
            <h1>Missões</h1>
          </div>
          <CardsRewards deposits={deposits !== undefined ? deposits : 0} />
        </div>
      </Rodal>
    </div>
  );
};

export default ModalRewards;
