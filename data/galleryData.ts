export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  bgImage: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: 'analytics',
    title: 'ANALYTICS',
    subtitle: 'REAL-TIME METRICS & USER INSIGHTS',
    buttonText: 'View Dashboard',
    buttonHref: '#',
    bgImage: 'https://images.unsplash.com/photo-1738330094168-6e9728731ce8?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
  {
    id: 'ai-workflow',
    title: 'AI WORKFLOW',
    subtitle: 'AUTOMATED LLM PIPELINE INTEGRATION',
    buttonText: 'Explore API',
    buttonHref: '#',
    bgImage: 'https://images.unsplash.com/photo-1775342989484-32de64ef79c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
  {
    id: 'security',
    title: 'SECURITY',
    subtitle: 'ENTERPRISE-GRADE DATA ENCRYPTION',
    buttonText: 'Inspect Vault',
    buttonHref: '#',
    bgImage: 'https://plus.unsplash.com/premium_photo-1764687667190-1e7016253b61?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
  {
    id: 'automation',
    title: 'AUTOMATION',
    subtitle: 'SEAMLESS BACKGROUND CRON JOBS',
    buttonText: 'Check Logs',
    buttonHref: '#',
    bgImage: 'https://images.unsplash.com/photo-1738694201360-7007fd2575b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
  {
    id: 'integrations',
    title: 'INTEGRATIONS',
    subtitle: 'ONE-CLICK THIRD-PARTY WEBHOOKS',
    buttonText: 'View Docs',
    buttonHref: '#',
    bgImage: 'https://plus.unsplash.com/premium_photo-1661816432228-7637c8b2a0a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
];