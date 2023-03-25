import { DropDownModel } from "./drop-down-model";

export interface CategoryNameModel {
    id:string;
    name:string;
    navMenuCssClass:string;
    collapseNavMenu:true;
    dropDown:DropDownModel[]
}
