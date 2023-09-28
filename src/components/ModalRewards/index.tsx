import React, { useEffect } from "react";
import S from "./styles.module.scss";
import Rodal from "rodal";
import CardsRewards from "../CardsRewards";

interface IModalRewards {
  user?: string | undefined;
  deposit_formatted?: string | undefined;
  surname?: string | undefined;
  position?: string | undefined;
  registrations?: string | undefined;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  deposits?: number | undefined,
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
                <h1>{deposit_formatted}</h1>
                <span>Dépositos</span>
              </div>
              <div className={S.profile__revenue__info}>
                <h1>{registrations}</h1>
                <span>CADASTROS</span>
              </div>
            </div>
          </div>
          <div className={S.rewards__title}>
            <h1>Missões</h1>
          </div>
          <CardsRewards deposits={deposits}/>
        </div>
      </Rodal>
    </div>
  );
};

export default ModalRewards;