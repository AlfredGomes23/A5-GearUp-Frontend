export type IUserRes = {
    success: boolean,
    message: string,
    data: {
        id: string,
        name: string,
        email: string,
        status: string,
        role: string,
        phone?: string;
        photoUrl?: string
        createdAt: string,
        updatedAt: string,
    }
};
export type IUser = {
    id: string,
    name: string,
    email: string,
    status: string,
    role: string,
    phone?: string;
    photoUrl?: string
    createdAt: string,
    updatedAt: string,
};


export type NavbarProps = {
    user: IUserRes
}
export interface NavItem {
    label: string;
    href: string;
}