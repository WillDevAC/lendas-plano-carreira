import React, { useRef, useState, MouseEvent, TouchEvent } from "react";

import S from "./styles.module.scss";
import CardReward from "../CardReward";

interface ICardsRewards {
  deposits?: number | undefined,
}

const CardsRewards: React.FC<ICardsRewards> = ({ deposits }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartX(touch.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={carouselRef}
      className={S.card__container}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <CardReward reward="+150K DÉPOSITOS" deposits={deposits} reward_porcentage={150000} reward_desc="AirPods ou 1.5K no pix."/>
      <CardReward reward="+400K DÉPOSITOS" deposits={deposits} reward_porcentage={400000} reward_desc="PS5 ou 4K no pix."/>
      <CardReward reward="+900K DÉPOSITOS" deposits={deposits} reward_porcentage={900000} reward_desc="Ingresso (campeonato brasileiro) ou 9K no pix."/>
      <CardReward reward="+1.5M DÉPOSITOS" deposits={deposits} reward_porcentage={1500000} reward_desc="Ingresso + acompanhante (Premier League) ou 15K no pix."/>
      <CardReward reward="+2.5M DÉPOSITOS" deposits={deposits} reward_porcentage={2500000} reward_desc="Passagem + hospedagem (Hard Rock Cancun) ou 25K no pix."/>
      <CardReward reward="+4M DÉPOSITOS" deposits={deposits} reward_porcentage={4000000} reward_desc="Viagem dos sonhos (roteiro 30 dias) ou 40K no pix"/>
      <CardReward reward="+20M DÉPOSITOS" deposits={deposits} reward_porcentage={20000000} reward_desc="Carro de elite ou 200K no pix ou 1.6K (10 anos)"/>
      <CardReward reward="+80M DÉPOSITOS" deposits={deposits} reward_porcentage={80000000} reward_desc="Apartamento (nordeste) ou 800K no pix ou 6K (10 anos)"/>
      <CardReward reward="+150M DÉPOSITOS" deposits={deposits} reward_porcentage={150000000} reward_desc="Ferrari ou Lamborghini ou 1.5M no pix ou 12.5K (10 anos)"/>
      <CardReward reward="+300M DÉPOSITOS" deposits={deposits} reward_porcentage={300000000} reward_desc="Mansão de luxo ou 3M no pix ou 25K (10 anos)"/>
    </div>
  );
};

export default CardsRewards;
