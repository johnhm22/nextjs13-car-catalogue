import { MouseEvent } from 'react';

export interface ICustomButton {
  title: string;
  containerStyles?: string;
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  btnType?: 'button' | 'submit';
  textStyles?: string;
  rightIcon?: string;
}

export interface ICarData {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: 'a';
  year: number;
}

export type CarState = ICarData & { message?: string };

export interface IFilterProps {
  manufacturer: string;
  year: number;
  fuel: string;
  limit: number;
  model: string;
}

export interface IOptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: IOptionProps[];
}

export interface IShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}
