import { BasicData } from "./data.model";

export interface User extends BasicData{
    email: string;
    password: string;
    role : string[];
}