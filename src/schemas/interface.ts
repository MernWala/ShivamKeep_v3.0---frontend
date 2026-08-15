export interface User {
    _id: string;
    name: string;
    email: string;
    isVerified: boolean;
    picture?: {
        type: 'Buffer';
        data: number[];
    } | string;
    githubId?: string
}

export interface Note {
    _id?: string;
    title: string;
    notes: string;
    shared: boolean;
    tags: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export type AuthMode = 'Login' | 'Register';

export interface ApiResponseData {
    token?: string;
    user?: User;
    success?: true,
    message?: string;
    notes?: Note[];
    note?: Note;
}

export interface ApiResponse {
    data: ApiResponseData;
    error: string | null;
    status: number;
}

export interface ApiError {
    data: {
        message: string;
    };
    status: number;
}

export interface NewNotesObject {
    title: string;
    tags: string[];
    notes: string;
    shared: boolean
}