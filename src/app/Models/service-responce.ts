import { ResponseModel } from "./response-model";

export interface ServiceResponce<T> extends ResponseModel {
    data:T[];
   
}
