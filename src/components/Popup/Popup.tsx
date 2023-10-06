import React from "react";
import styles from "./Popup.module.scss";

interface PopupProps {
  onCategoryClick: () => void;
}

const Popup: React.FC<PopupProps> = ({ onCategoryClick }) => {
  return (
    <div className={styles.popup}>
      <p className={styles.popupHeader}>What do you want to create?</p>
      <div className={styles.popupButtonsWrapper}>
        <button
          type="button"
          className={styles.popupButton}
          onClick={onCategoryClick}
        >
          Category
        </button>
        <button type="button" className={styles.popupButton}>
          Service
        </button>
      </div>
    </div>
  );
};

export default Popup;
