import {Comment} from "../Comment/Comment"
export interface Post {
    _id: string;
    likes: string[];
    post_desc: string;
    profile_name: string;
    image_url: string;
    profile_url: string;
    comments: Comment[];
    posted_by: [{
        _id: string;
        username: string;
        profile: string;
    }];
};
 
