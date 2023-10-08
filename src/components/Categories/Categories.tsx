import React, { useState } from "react";
import css from "./Categories.module.scss";
import SubCategory from "./SubCategory";
import { vars, categoriesInterface } from "./types";
import Popup from "../Popup/Popup";
import icons from "../../images/icons.svg";

function findCategoryById(
  root: categoriesInterface,
  idToFind: number
): categoriesInterface | undefined {
  if (root.id === idToFind) {
    return root;
  }

  if (root.subCategories) {
    for (const subCategory of root.subCategories) {
      const result = findCategoryById(subCategory, idToFind);
      if (result) {
        return result;
      }
    }
  }

  return undefined;
}

interface CategoriesProps {
  categories: categoriesInterface[];
  setCategories: (value: categoriesInterface[]) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  setCategories,
}) => {
  const [id, setId] = useState<number>(0);
  const [displayPopup, setDisplayPopup] = useState<boolean | number>(false);
  const [colors, setColors] = useState<string[]>([
    "#f96",
    "#18b2d5",
    "#b3bdc6",
  ]);

  const addCategory = (): void => {
    const copyCategories: categoriesInterface[] = [...categories];
    copyCategories.push({
      type: vars.input,
      name: "",
      id,
      parent: null,
      subCategories: [],
    });

    setId(id + 1);
    setCategories(copyCategories);
  };

  const changeCategoryName = (id: number, value: string): void => {
    const copyCategories: categoriesInterface[] = [...categories].map(
      (category) => {
        if (category.id === id) category.name = value;
        return category;
      }
    );

    setCategories(copyCategories);
  };

  const removeCategory = (id: number): void => {
    const copyCategories: categoriesInterface[] = [...categories].filter(
      (el) => el.id !== id
    );

    setCategories(copyCategories);
  };

  const changeType = (id: number): void => {
    const copyCategories: categoriesInterface[] = [...categories].map(
      (category) => {
        if (category.id === id) {
          if (category.type === vars.input) {
            category.type = vars.ultimate;
          } else {
            category.type = vars.input;
          }
        }

        return category;
      }
    );

    setCategories(copyCategories);
  };

  const changeSubCategoryName = (_id: number, value: string): void => {
    const copyCategories: categoriesInterface[] = [...categories];
    let parent: categoriesInterface | undefined = undefined;

    copyCategories.forEach((category) => {
      if (findCategoryById(category, _id)) {
        parent = findCategoryById(category, _id);
        if (parent) {
          parent.name = value;
        }
      }
    });

    setCategories(copyCategories);
  };

  const removeSubCategory = (_id: number, _parent: number | null): void => {
    const copyCategories: categoriesInterface[] = [...categories];
    let parent: categoriesInterface | undefined = undefined;

    if (_parent || _parent === 0) {
      copyCategories.forEach((category) => {
        if (findCategoryById(category, _parent)) {
          parent = findCategoryById(category, _parent);
          if (parent) {
            parent.subCategories = parent.subCategories.filter(
              (el) => el.id !== _id
            );
          }
        }
      });
    }

    setCategories(copyCategories);
  };

  const changeSybCategoryType = (_id: number): void => {
    const copyCategories: categoriesInterface[] = [...categories];
    let parent: categoriesInterface | undefined = undefined;

    copyCategories.forEach((category) => {
      if (findCategoryById(category, _id)) {
        parent = findCategoryById(category, _id);
        if (parent) {
          if (parent.type === vars.input) {
            parent.type = vars.ultimate;
          } else if (parent.type === vars.ultimate) {
            parent.type = vars.input;
          }
        }
      }
    });

    setCategories(copyCategories);
  };

  const addSubCategory = (_id: number): void => {
    const copyCategories: categoriesInterface[] = [...categories];

    let parent: categoriesInterface | undefined = undefined;

    copyCategories.forEach((category) => {
      if (findCategoryById(category, _id)) {
        parent = findCategoryById(category, _id);
        if (parent) {
          parent.subCategories = [
            ...parent.subCategories,
            {
              type: vars.input,
              name: "",
              id,
              parent: _id,
              subCategories: [],
            },
          ];
        }
      }
    });

    setId(id + 1);
    setCategories(copyCategories);
  };

  return (
    <div className={css.topWrapper}>
      <div className={css.categoriesWrapper}>
        <p className={css.text}>Categories</p>
        <button className={`${css.add} ${css.plus}`} onClick={addCategory}>
          <svg width="15" height="15">
            <use href={icons + "#icon-plus"}></use>
          </svg>
        </button>
      </div>

      <div className={css.categories}>
        {categories.map((category: categoriesInterface) => {
          if (category.type === vars.input) {
            return (
              <div key={category.id} className={css.subCategoriesWrapper}>
                <div className={css.categoryWrapper}>
                  <input
                    type="text"
                    placeholder="Category name"
                    value={category.name}
                    className={css.input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      changeCategoryName(category.id, e.target.value)
                    }
                  />{" "}
                  <button
                    className={`${css.add} ${css.cancel_orange}`}
                    onClick={() => removeCategory(category.id)}
                  >
                    <svg width="15" height="15">
                      <use href={icons + "#icon-cross"}></use>
                    </svg>
                  </button>
                  <button
                    className={`${css.add} ${css.checkmark}`}
                    onClick={() => changeType(category.id)}
                  >
                    <svg width="15" height="15">
                      <use href={icons + "#checkmark"}></use>
                    </svg>
                  </button>
                </div>
                {category.subCategories?.length ? (
                  <div className={css.categories}>
                    {category.subCategories.map(
                      (category: categoriesInterface) => (
                        <SubCategory
                          subCategories={category.subCategories}
                          changeSubCategoryName={changeSubCategoryName}
                          removeSubCategory={removeSubCategory}
                          changeSybCategoryType={changeSybCategoryType}
                          addSubCategory={addSubCategory}
                          categories={categories}
                          lastId={id}
                          colors={colors}
                          setColors={setColors}
                        />
                      )
                    )}
                  </div>
                ) : null}
              </div>
            );
          } else {
            return (
              <div key={category.id} className={css.subCategoriesWrapper}>
                <div className={css.categoryWrapper}>
                  <p className={css.categoryName}>{category.name}</p>
                  <button
                    className={css.add}
                    onClick={() =>
                      category.subCategories.length
                        ? addSubCategory(category.id)
                        : setDisplayPopup(category.id)
                    }
                  >
                    <svg width="15" height="15">
                      <use href={icons + "#icon-plus"}></use>
                    </svg>
                  </button>
                  <button
                    className={css.add}
                    onClick={() => changeType(category.id)}
                  >
                    <svg width="15" height="15">
                      <use href={icons + "#icon-pencil"}></use>
                    </svg>
                  </button>

                  <button
                    className={`${css.add} ${css.cross_red}`}
                    onClick={() => removeCategory(category.id)}
                  >
                    <svg width="15" height="15">
                      <use href={icons + "#icon-cross"}></use>
                    </svg>
                  </button>
                </div>

                {category.subCategories?.length ? (
                  <div className={css.categories}>
                    <SubCategory
                      subCategories={category.subCategories}
                      changeSubCategoryName={changeSubCategoryName}
                      removeSubCategory={removeSubCategory}
                      changeSybCategoryType={changeSybCategoryType}
                      addSubCategory={addSubCategory}
                      categories={categories}
                      lastId={id}
                      colors={colors}
                      setColors={setColors}
                    />
                  </div>
                ) : null}
                {displayPopup === category.id && (
                  <Popup
                    onCategoryClick={() => {
                      addSubCategory(category.id);
                      setDisplayPopup(false);
                    }}
                  />
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Categories;
