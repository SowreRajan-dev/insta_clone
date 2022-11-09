import {Comment} from "../Comment/Comment"
export interface Post {
    likes: number;
    description: string;
    profile_name: string;
    image_url: string;
    profile_url: string;
    comments:Comment[];
};
 
