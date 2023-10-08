import React, { useState } from "react";
import { Position } from "../Main/types";
import icons from "../../images/icons.svg";
import css from "./Header.module.scss";

interface HeadProps {
  scale: number;
  setScale: (value: number) => void;
  scaleVars: number[];
  setElementPosition: (value: Position) => void;
  elementWidth: number;
}

const Head: React.FC<HeadProps> = ({
  scale,
  setScale,
  scaleVars,
  setElementPosition,
  elementWidth,
}) => {
  const [displayTooltip, setDisplayTooltip] = useState<boolean>(false);
  const [displayDropDown, setDisplayDropDown] = useState<boolean>(false);

  const minusSize = (): void => {
    const index: number = scaleVars.indexOf(scale);
    if (index > 0) {
      setScale(scaleVars[index - 1]);
    }
  };

  const plusSize = (): void => {
    const index: number = scaleVars.indexOf(scale);
    if (index < scaleVars.length - 1) {
      setScale(scaleVars[index + 1]);
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.leftSide}>
        <p className={css.leftText}>Services</p>
        <p className={css.amount}>0</p>
      </div>
      <div className={css.rightSide}>
        <button className={css.coloredButton} type="button">
          <p>list view</p>
        </button>
        <button
          className={css.rightButtonWithImage}
          type="button"
          onMouseEnter={() => setDisplayTooltip(true)}
          onMouseLeave={() => setDisplayTooltip(false)}
          onClick={() => {
            setElementPosition({
              x: -elementWidth / 2 + 70,
              y: 0,
            });
          }}
        >
          <svg width="15" height="15">
            <use href={icons + "#icon-compass"}></use>
          </svg>

          {displayTooltip && (
            <div className={css.tooltipWrapper}>
              <p className={css.tooltip}>Go to center</p>
            </div>
          )}
        </button>

        <button className={css.rightButton} type="button" onClick={minusSize}>
          <p>-</p>
        </button>

        <div className={css.dropdownWrapper}>
          <button
            type="button"
            className={css.rightMiddleButton}
            onClick={() => setDisplayDropDown(true)}
          >
            <p>{scale * 100}%</p>
          </button>

          {displayDropDown && (
            <div className={css.dropdown}>
              {scaleVars.map((el: number) => (
                <button
                  key={el}
                  className={css.option}
                  type="button"
                  onClick={() => {
                    setDisplayDropDown(false);
                    setScale(el);
                  }}
                >
                  <p>{el * 100}%</p>
                  {scale === el ? (
                    <svg width="15" height="15">
                      <use href={icons + "#selected"}></use>
                    </svg>
                  ) : null}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className={css.rightButton} type="button" onClick={plusSize}>
          <p>+</p>
        </button>
      </div>
    </div>
  );
};

export default Head;
