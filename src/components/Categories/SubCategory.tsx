import React, { useState, useEffect } from "react";
import styles from "./categories.module.scss";
import plus from "../../images/plus.png";
import orangeCross from "../../images/orange cross.png";
import tick from "../../images/tick.png";
import edit from "../../images/something.png";
import redCross from "../../images/red cross.png";
import { vars, categoriesInterface } from "./types";
import Popup from "../Popup";

interface SubCategoryProps {
  subCategories: categoriesInterface[] | undefined;
  changeSubCategoryName: (id: number, value: string) => void;
  removeSubCategory: (id: number, parent: number | null) => void;
  changeSybCategoryType: (id: number) => void;
  addSubCategory: (id: number) => void;
  categories: categoriesInterface[];
  lastId: number;
  colors: string[];
  setColors: (value: string[]) => void;
}

function findNestedLevelById(
  data: categoriesInterface[],
  idToFind: number,
  currentLevel = 0
): number | null {
  for (const item of data) {
    if (item.id === idToFind) {
      return currentLevel;
    }

    if (item.subCategories.length > 0) {
      const level = findNestedLevelById(
        item.subCategories,
        idToFind,
        currentLevel + 1
      );
      if (level !== null) {
        return level;
      }
    }
  }

  return null;
}

const SubCategory: React.FC<SubCategoryProps> = ({
  subCategories,
  changeSubCategoryName,
  removeSubCategory,
  changeSybCategoryType,
  addSubCategory,
  categories,
  lastId,
  colors,
  setColors,
}) => {
  const [displayPopup, setDisplayPopup] = useState<boolean | number>(false);

  const findLevel = (id: number): number => {
    const nestedLevel = findNestedLevelById(categories, id);
    return nestedLevel || 1;
  };

  useEffect(() => {
    const nestedLevel: number = findLevel(lastId - 1);
    if (nestedLevel > colors.length - 1) {
      setColors([
        ...colors,
        `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`,
      ]);
    }
  }, [lastId, colors]);

  return (
    <div className={styles.categories}>
      {subCategories?.map((subCategory: categoriesInterface) => {
        if (subCategory.type === vars.input) {
          return (
            <div className={styles.subCategoriesWrapper} key={subCategory.id}>
              <div className={styles.categoryWrapper}>
                <input
                  type="text"
                  placeholder="Subcategory name"
                  value={subCategory.name}
                  className={styles.input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    changeSubCategoryName(subCategory.id, e.target.value)
                  }
                />{" "}
                <button
                  className={styles.add}
                  onClick={() =>
                    removeSubCategory(subCategory.id, subCategory.parent)
                  }
                >
                  <img src={orangeCross} alt="remove" />
                </button>
                <button
                  className={styles.add}
                  onClick={() => changeSybCategoryType(subCategory.id)}
                >
                  <img src={tick} alt="ok" />
                </button>
              </div>

              {subCategory.subCategories?.length ? (
                <div className={styles.categories}>
                  <SubCategory
                    subCategories={subCategory.subCategories}
                    changeSubCategoryName={changeSubCategoryName}
                    removeSubCategory={removeSubCategory}
                    changeSybCategoryType={changeSybCategoryType}
                    addSubCategory={addSubCategory}
                    categories={categories}
                    lastId={lastId}
                    colors={colors}
                    setColors={setColors}
                  />
                </div>
              ) : null}
            </div>
          );
        } else {
          return (
            <div
              className={styles.subCategoriesWrapper}
              key={subCategory.id}
              onMouseEnter={() => findLevel(subCategory.id)}
            >
              <div className={styles.categoryWrapper}>
                <p
                  className={styles.subCategoryName}
                  style={{
                    backgroundColor: colors[findLevel(subCategory.id) || 1],
                  }}
                >
                  {subCategory.name}
                </p>
                <button
                  className={styles.add}
                  onClick={() => {
                    subCategory.subCategories.length
                      ? addSubCategory(subCategory.id)
                      : setDisplayPopup(subCategory.id);
                  }}
                >
                  <img src={plus} alt="add" />
                </button>
                <button
                  className={styles.add}
                  onClick={() => changeSybCategoryType(subCategory.id)}
                >
                  <img src={edit} alt="edit" />
                </button>

                <button
                  className={styles.add}
                  onClick={() =>
                    removeSubCategory(subCategory.id, subCategory.parent)
                  }
                >
                  <img src={redCross} alt="remove" />
                </button>
              </div>

              {subCategory.subCategories?.length ? (
                <div className={styles.categories}>
                  <SubCategory
                    subCategories={subCategory.subCategories}
                    changeSubCategoryName={changeSubCategoryName}
                    removeSubCategory={removeSubCategory}
                    changeSybCategoryType={changeSybCategoryType}
                    addSubCategory={addSubCategory}
                    categories={categories}
                    lastId={lastId}
                    colors={colors}
                    setColors={setColors}
                  />
                </div>
              ) : null}

              {displayPopup === subCategory.id && (
                <Popup
                  onCategoryClick={() => {
                    addSubCategory(subCategory.id);
                    setDisplayPopup(false);
                  }}
                />
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default SubCategory;
