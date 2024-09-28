export function useSetSeoData({ title, description, image = 'https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/rozne/60760009.jpg', type='podstrona' }) {
  const route = useRoute();
  const formattedTitle = title.toLowerCase();

  useHead({
    title: `Gluciak.pl | ${formattedTitle}`,
  });

  useSeoMeta({
    description: `Filip Szczęch - ${description}`,
    ogTitle: `Gluciak.pl - ${formattedTitle}`,
    ogDescription: `Zobacz ${formattedTitle} na stronie Filip Szczęch.`,
    ogImage: image,
    ogUrl: `https://gluciak.pl${route.fullPath}`,
    twitterTitle: `Filip Szczęch - ${type}: ${formattedTitle}`,
    twitterDescription: `Portfolio Filip Szczęch - ${description}`,
    twitterImage: image,
    twitterCard: 'summary_large_image',
  });
}