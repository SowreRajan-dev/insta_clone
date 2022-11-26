export interface Comment { 
    text: string;
    from: string;
    username: string;
    likes: number;
    profile_image_url: string;
    postedBy: {
        username: string;
        profile: string;
    }

}