import { IUserRegister } from '~/components/forms/register-form';

export interface IUser {
    id: number;
    name: string;
    phone: string;
    email: string;
    birthDate: string;
    gender: string;
    country: string;
    state: string;
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
