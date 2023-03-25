import { ResponseModel } from "./response-model";

export interface SingleServiceResponce<T> extends ResponseModel {
    data:T;

}
