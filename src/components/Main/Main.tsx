import React, { useState, MouseEvent, useRef, useEffect } from "react";
import css from "./Main.module.scss";
import Categories from "../Categories/Categories";
import { categoriesInterface } from "../Categories/types";
import icons from "../../images/icons.svg";
import { Position } from "./types";

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
    <div className={css.wrapper} onMouseLeave={() => setIsDragging(false)}>
      <div className={css.arrowTop}>
        <svg width="15" height="15">
          <use href={icons + "#icon-arrow-up"}></use>
        </svg>
      </div>
      <div className={css.arrowBottom}>
        <svg width="15" height="15">
          <use href={icons + "#icon-arrow-down"}></use>
        </svg>
      </div>
      <div className={css.arrowLeft}>
        <svg width="15" height="15">
          <use href={icons + "#icon-arrow-left"}></use>
        </svg>
      </div>
      <div className={css.arrowRight}>
        <svg width="15" height="15">
          <use href={icons + "#icon-arrow-right"}></use>
        </svg>
      </div>
      <div
        className={css.draggable}
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
