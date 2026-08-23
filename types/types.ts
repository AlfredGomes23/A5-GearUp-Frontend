export type IUser = {
    success : boolean,
    message : string,
    data : {
            id : string,
            name : string,
            email : string,
            status : string,
            role : string,
            phone: string;
            photoUrl: string
            createdAt : string,
            updatedAt : string,
    }
}

export type NavbarProps = {
    user : IUser
}
export interface NavItem {
  label: string;
  href: string;
}