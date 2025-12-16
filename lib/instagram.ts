export interface InstagramPost {
    id: string;
    caption: string;
    media_url: string;
    permalink: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    thumbnail_url?: string; // For videos
}

export const getInstagramPosts = async (): Promise<InstagramPost[]> => {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    // Default Mock Data (Enhanced Fallback) - Used when no token or API error
    const MOCK_DATA: InstagramPost[] = [
        {
            id: 'mock1',
            caption: '아씨 고원 트레킹, 카자흐스탄의 대자연을 만나보세요! 🏔️ #트립소다 #카자흐스탄여행',
            media_url: '/images/tour_assy.png',
            permalink: 'https://www.instagram.com/tripsoda_kz/',
            media_type: 'IMAGE'
        },
        {
            id: 'mock2',
            caption: '차른 캐년의 웅장함, 사진으로 담을 수 없는 감동입니다. 🏜️',
            media_url: '/images/tour_charyn_1765783988719.png',
            permalink: 'https://www.instagram.com/tripsoda_kz/',
            media_type: 'IMAGE'
        },
        {
            id: 'mock3',
            caption: '빅 알마티 호수(BAO)의 에메랄드 빛 물결 💎',
            media_url: '/images/tour_bao.png',
            permalink: 'https://www.instagram.com/tripsoda_kz/',
            media_type: 'IMAGE'
        },
        {
            id: 'mock4',
            caption: '콜사이 호수에서 즐기는 평화로운 뱃놀이 🛶',
            media_url: '/images/tour_kolsai_1765784008248.png',
            permalink: 'https://www.instagram.com/tripsoda_kz/',
            media_type: 'IMAGE'
        }
    ];

    if (!accessToken) {
        console.warn('INSTAGRAM_ACCESS_TOKEN is missing. Returning mock data.');
        return MOCK_DATA;
    }

    try {
        const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink,thumbnail_url&access_token=${accessToken}&limit=4`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch Instagram posts: ${response.statusText}`);
        }

        const data = await response.json();

        // Filter out items without media_url if necessary, though basic display usually has them
        const posts: InstagramPost[] = data.data || [];

        // If API returns empty list (e.g. new account), return mock to avoid empty section
        if (posts.length === 0) return MOCK_DATA;

        return posts;
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        return MOCK_DATA; // Fail gracefully to mock data
    }
};
