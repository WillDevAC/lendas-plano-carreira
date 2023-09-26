import React from 'react';

import S from './styles.module.scss';

const Header: React.FC = () => {
  return (
    <header className={S.header}>
        <img src="logo.svg" alt="Logo Lendas Bet" />
        <button>Solicitar premiação</button>
    </header>
  );
}

export default Header;