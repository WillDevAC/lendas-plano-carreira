import React from 'react';

import S from './styles.module.scss';

const CardRules: React.FC = () => {
  return (
    <div className={S.card__rules}>
        <h1>Regras</h1>
        <div className={S.rule}>
            <h5>Válido apenas para afiliados que tiverem jogadores ativos depositantes.</h5>
        </div>
        <div className={S.rule}>
            <h5>Todo mês os pontos da competição reiniciam a contagem.</h5>
        </div>
    </div>
  );
}

export default CardRules;