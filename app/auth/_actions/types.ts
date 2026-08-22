
export type LoginState = {
    success: boolean;
    statusCode: number;
    message: string,
    data: { accessToken: string, refreshToken: string }
}

export type RegisterState = {
    success: boolean;
    statusCode: number;
    message: string,
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            activeStatus: string;
            role: string;
            createdAt: Date | string;
            updatedAt: Date | string;
            profile: {
                id: string;
                profilePhoto: string;
                bio: string;
                userId: string;
                createdAt: Date | string;
                updatedAt: Date | string;
            }
        }
    }
}
