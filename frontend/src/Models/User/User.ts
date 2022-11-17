export interface User { 
    _id: string;
    username: string;
    fullName: string;
    active: boolean;
    followers: string[],
    following: string[],
    profile:string
}