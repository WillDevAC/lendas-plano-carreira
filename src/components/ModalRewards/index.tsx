import React, { useState } from "react";

import S from "./styles.module.scss";

import Rodal from "rodal";

const ModalRewards: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };
  return (
    <div>
      <button onClick={show}>show</button>

      <Rodal visible={visible} onClose={hide} className={S.custom_modal}>
        <div className={S.modal_content}>Content</div>
      </Rodal>
    </div>
  );
};

export default ModalRewards;
