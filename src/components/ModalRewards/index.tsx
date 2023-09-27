import React from "react";

import S from "./styles.module.scss";

import Rodal from "rodal";

interface IModalRewards {
  setVisible: Function;
  visible: boolean;
}

const ModalRewards: React.FC<IModalRewards> = ({ setVisible, visible }) => {
  const hideModalRewards = () => {
    setVisible(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div>
      <Rodal
        visible={visible}
        onClose={hideModalRewards}
        className={S.custom_modal}
      >
        <div className={S.modal_content}>Content</div>
      </Rodal>
    </div>
  );
};

export default ModalRewards;
