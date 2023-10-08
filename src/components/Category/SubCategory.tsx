import React, { useState, useEffect } from "react";
import css from "./categories.module.scss";
import { vars, categoriesInterface } from "./types";
import Popup from "../Popup/Popup";
import icons from "../../images/icons.svg";

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
    <div className={css.categories}>
      {subCategories?.map((subCategory: categoriesInterface) => {
        if (subCategory.type === vars.input) {
          return (
            <div className={css.subCategoriesWrapper} key={subCategory.id}>
              <div className={css.categoryWrapper}>
                <input
                  type="text"
                  placeholder="Subcategory name"
                  value={subCategory.name}
                  className={css.input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    changeSubCategoryName(subCategory.id, e.target.value)
                  }
                />{" "}
                <button
                  className={`${css.add} ${css.cross_red}`}
                  onClick={() =>
                    removeSubCategory(subCategory.id, subCategory.parent)
                  }
                >
                  <svg width="15" height="15">
                    <use href={icons + "#icon-cross"}></use>
                  </svg>
                </button>
                <button
                  className={`${css.add} ${css.checkmark}`}
                  onClick={() => changeSybCategoryType(subCategory.id)}
                >
                  <svg width="15" height="15">
                    <use href={icons + "#checkmark"}></use>
                  </svg>
                </button>
              </div>

              {subCategory.subCategories?.length ? (
                <div className={css.categories}>
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
              className={css.subCategoriesWrapper}
              key={subCategory.id}
              onMouseEnter={() => findLevel(subCategory.id)}
            >
              <div className={css.categoryWrapper}>
                <p
                  className={css.subCategoryName}
                  style={{
                    backgroundColor: colors[findLevel(subCategory.id) || 1],
                  }}
                >
                  {subCategory.name}
                </p>
                <button
                  className={css.add}
                  onClick={() => {
                    subCategory.subCategories.length
                      ? addSubCategory(subCategory.id)
                      : setDisplayPopup(subCategory.id);
                  }}
                >
                  <svg width="15" height="15">
                    <use href={icons + "#icon-plus"}></use>
                  </svg>
                </button>
                <button
                  className={css.add}
                  onClick={() => changeSybCategoryType(subCategory.id)}
                >
                  <svg width="15" height="15">
                    <use href={icons + "#icon-pencil"}></use>
                  </svg>
                </button>

                <button
                  className={`${css.add} ${css.cross_red}`}
                  onClick={() =>
                    removeSubCategory(subCategory.id, subCategory.parent)
                  }
                >
                  <svg width="15" height="15">
                    <use href={icons + "#icon-cross"}></use>
                  </svg>
                </button>
              </div>

              {subCategory.subCategories?.length ? (
                <div className={css.categories}>
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
