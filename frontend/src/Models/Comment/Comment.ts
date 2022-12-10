export interface Comment { 
    _id: string;
    text: string;
    postedBy: {
        _id: string;
        profile: string;
        username: string;
    }
    likes: number;
    username: string;

}