import React from "react";
import css from "./Popup.module.scss";

interface PopupProps {
  onCategoryClick: () => void;
}

const Popup: React.FC<PopupProps> = ({ onCategoryClick }) => {
  return (
    <div className={css.popup}>
      <p className={css.popupHeader}>What do you want to create?</p>
      <div className={css.popupButtonsWrapper}>
        <button
          type="button"
          className={css.popupButton}
          onClick={onCategoryClick}
        >
          Category
        </button>
        <button type="button" className={css.popupButton}>
          Service
        </button>
      </div>
    </div>
  );
};

export default Popup;
