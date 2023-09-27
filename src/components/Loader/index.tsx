import React from 'react';

import S from "./styles.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={S.loaderContainer}>
        <img src="logo.svg" alt="Logo" />
    </div>
  );
}

export default Loader;