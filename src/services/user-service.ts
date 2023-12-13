import { IUserRegister } from '~/components/forms/register-form';
export interface UserView {
    id: number;
    name: string;
    phone: string;
    email: string;
    birthDate: string;
    gender: string;
    country: string;
    state: string;
}
export interface IUser extends UserView {
    password: string;
    confirmPassword: string;
}

export async function getUsersLocalStorare(): Promise<IUser[]> {
    const users = await localStorage.getItem('users');
    if (users) {
        return JSON.parse(users) as IUser[];
    }
    return [] as IUser[];
}

export async function setUsersLocalStorage(users: IUser[]) {
    await localStorage.setItem('users', JSON.stringify(users));
}

export async function addUserLocalStorage(user: IUserRegister) {
    const users = await getUsersLocalStorare();
    const newId = users.length + 1;
    const newUser: IUser = { ...user, id: newId };
    users.push(newUser);
    await setUsersLocalStorage(users);
}

export async function deleteUserLocalStorage(id: number) {
    const users = await getUsersLocalStorare();
    const newUsers = users.filter((user) => user.id !== id);
    await setUsersLocalStorage(newUsers);
}

export async function userExistsLocalStorage(email: string): Promise<boolean> {
    const users = await getUsersLocalStorare();
    return users.some((user) => user.email === email);
}

export async function findUserByEmailLocalStorage(
    emailOrPhone: string
): Promise<IUser | undefined> {
    const users = await getUsersLocalStorare();
    return users.find((user) => user.email === emailOrPhone || user.phone);
}

export type LoginReturnType = { sucess: true; user: UserView } | { sucess: false };

export async function loginLocalStorage(
    emailOrPhone: string,
    password: string
): Promise<LoginReturnType> {
    const user = await findUserByEmailLocalStorage(emailOrPhone);

    if (user) {
        if (user.password !== password) {
            return {
                sucess: false,
            };
        }
        const userAuth: UserView = {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            birthDate: user.birthDate,
            gender: user?.gender,
            country: user.country,
            state: user.state,
        };
        return {
            sucess: true,
            user: userAuth,
        };
    }
    return {
        sucess: false,
    };
}
