import React, { useState, MouseEvent, useRef, useEffect } from "react";
import styles from "./main.module.scss";
import arrowLeft from "../../images/arrow left.png";
import arrowRight from "../../images/arrow right.png";
import arrowUp from "../../images/arrow up.png";
import arrowDown from "../../images/arrow down.png";
import Categories from "../Categories";
import { Position } from "./types";
import { categoriesInterface } from "../Categories/types";

interface MainProps {
  scale: number;
  elementPosition: Position;
  setElementPosition: (value: Position) => void;
  setElementWidth: (value: number) => void;
}

const Main: React.FC<MainProps> = ({
  scale,
  elementPosition,
  setElementPosition,
  setElementWidth,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [categories, setCategories] = useState<categoriesInterface[]>([]);
  const [draggingPosition, setDraggingPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    setIsDragging(true);
    setDraggingPosition({
      x: e.clientX - elementPosition.x,
      y: e.clientY - elementPosition.y,
    });
  };

  const handleMouseMove = (e: MouseEvent<EventTarget>) => {
    if (isDragging) {
      const newX = (e as MouseEvent<HTMLElement>).clientX - draggingPosition.x;
      const newY = (e as MouseEvent<HTMLElement>).clientY - draggingPosition.y;
      setElementPosition({ x: newX, y: newY });
    }
  };
  const draggableElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (draggableElementRef.current) {
      // Получите доступ к свойству clientWidth
      const elementWidth = draggableElementRef.current.clientWidth;
      setElementWidth(elementWidth);
    }
  }, [draggableElementRef, categories]);

  return (
    <div className={styles.wrapper} onMouseLeave={() => setIsDragging(false)}>
      <div className={styles.arrowTop}>
        <img src={arrowUp} alt="top" />
      </div>
      <div className={styles.arrowBottom}>
        <img src={arrowDown} alt="bottom" />
      </div>
      <div className={styles.arrowLeft}>
        <img src={arrowLeft} alt="left" />
      </div>
      <div className={styles.arrowRight}>
        <img src={arrowRight} alt="right" />
      </div>
      <div
        className={styles.draggable}
        onMouseMove={handleMouseMove}
        style={{
          transform: `translate(${elementPosition.x}px, ${elementPosition.y}px) scale(${scale})`,
        }}
        ref={draggableElementRef}
        onMouseDown={handleMouseDown}
        onMouseUp={() => {
          setIsDragging(false);
        }}
      >
        <Categories categories={categories} setCategories={setCategories} />
      </div>
    </div>
  );
};

export default Main;
