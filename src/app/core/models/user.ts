import { UserTypes } from "../constants/userType";

export interface User {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: UserTypes;
}
