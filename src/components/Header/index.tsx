import React from "react";

import { ShoppingCart } from "@phosphor-icons/react";

import S from "./styles.module.scss";

const Header: React.FC = () => {
  return (
    <header className={S.header}>
      <img src="logo.svg" alt="Logo Lendas Bet" />
      <button>
        <ShoppingCart size={20} />
        Marketplace
      </button>
    </header>
  );
};

export default Header;
