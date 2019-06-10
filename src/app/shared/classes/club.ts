

export default class Club {
    name: string;
    slug: string;
    seo_hashtag: string;
    seo_title: string;
    seo_keywords: string;
    seo_description: string;
    content: string;
    created_at: Date;
    region: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
    working_hours: object;
    logo: string;
    sportsmans: any;
    judges: any;
    requests: number[];
    author: string;
}
