import { IMenuModel } from "./i-menu-model";

export interface IUser <T>{
  id?: number;
  email?: string;
  namaDepan?: string;
  namaBelakang?: string;
  aksesMenuModel?: IMenuModel;
}
