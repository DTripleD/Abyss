export enum vars {
  input = "input",
  ultimate = "ultimate",
}

export interface categoriesInterface {
  type: vars;
  name: string;
  id: number;
  subCategories: categoriesInterface[];
  parent: number | null;
}
