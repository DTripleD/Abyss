import React, { useState } from "react";
import styles from "./Head.module.scss";
import tick2 from "../../images/tick2.png";
import { Position } from "../Main/types";
import icons from "../../images/icons.svg";

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
    <div className={styles.wrapper}>
      <div className={styles.leftSide}>
        <p className={styles.leftText}>Services</p>
        <p className={styles.amount}>0</p>
      </div>
      <div className={styles.rightSide}>
        <button className={styles.coloredButton} type="button">
          <p>list view</p>
        </button>
        <button
          className={styles.rightButtonWithImage}
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
            <div className={styles.tooltipWrapper}>
              <p className={styles.tooltip}>Go to center</p>
            </div>
          )}
        </button>

        <button
          className={styles.rightButton}
          type="button"
          onClick={minusSize}
        >
          <p>-</p>
        </button>

        <div className={styles.dropdownWrapper}>
          <button
            type="button"
            className={styles.rightMiddleButton}
            onClick={() => setDisplayDropDown(true)}
          >
            <p>{scale * 100}%</p>
          </button>

          {displayDropDown && (
            <div className={styles.dropdown}>
              {scaleVars.map((el: number) => (
                <button
                  className={styles.option}
                  type="button"
                  onClick={() => {
                    setDisplayDropDown(false);
                    setScale(el);
                  }}
                >
                  <p>{el * 100}%</p>
                  {scale === el ? <img src={tick2} alt="selected" /> : null}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className={styles.rightButton} type="button" onClick={plusSize}>
          <p>+</p>
        </button>
      </div>
    </div>
  );
};

export default Head;
