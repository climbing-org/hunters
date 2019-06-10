import User from './user';


export default class Event {
    name: string;
    slug: string;
    seo_hashtag: string;
    seo_title: string;
    seo_keywords: string;
    seo_description: string;
    content: string;
    created_at: Date;
    logo: string;
    results: string;
    sportsmans: any;
    judges: any;
    requests: number[];
    author: string;
    date_from: Date;
    date_to: Date;
}
