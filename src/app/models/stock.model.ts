import { BasicData } from "./data.model";

export interface Stock extends BasicData {
    name: string;
    description: string;
    price: number;
    quantity: number;
}