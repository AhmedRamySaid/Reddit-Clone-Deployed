// User data
export interface User {
    email: string;
    username: string;
    profile_picture_link?: string | null;
    about_me?: string | null;
    created_on: Date;
}