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

export type ICategory = {
    id: string;
    name: string;
};

export type IGear = {
    id: string;
    title: string;
    description: string;
    brand: string;
    isAvailable: boolean;
    stock: number;
    pricePerDay: number;
    category: ICategory;
    provider: {
        id: string;
        email: string;
        phone?: string | null;
    };
    createdAt: string;
    updatedAt: string;
};

export type IMetaData = {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
};

export type IListRes<T> = {
    success: boolean;
    message: string;
    data: T[];
    metaData: IMetaData;
};

export type ISingleRes<T> = {
    success: boolean;
    message: string;
    data: T;
};

export type IRental = {
    id: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: string;
    gear: {
        id: string;
        title: string;
        brand?: string;
        category?: ICategory;
        provider?: {
            id: string;
            email: string;
            phone?: string | null;
        };
    };
    createdAt: string;
};