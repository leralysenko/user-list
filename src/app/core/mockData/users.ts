import { UserTypes } from "../constants/userType";
import { User } from "../models/user";

export const usersData: User[] = [
    {
        id: 1,
        userName: 'pavlokoval',
        firstName: 'Pavlo',
        lastName: 'Koval',
        email: 'pavlok@gmail.com',
        password: 'pavlokov7',
        userType: UserTypes.admin
    },
    {
        id: 2,
        userName: 'alexlitvin',
        firstName: 'Alex',
        lastName: 'Litvin',
        email: 'alexl@gmail.com',
        password: 'alexlitvin7',
        userType: UserTypes.driver
    },
    {
        id: 3,
        userName: 'nastyaplokha',
        firstName: 'Nastya',
        lastName: 'Plokha',
        email: 'nastyap@gmail.com',
        password: 'nastyaplokha7',
        userType: UserTypes.driver
    }
]