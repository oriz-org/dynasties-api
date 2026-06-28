// @ts-check
import { defineConfig } from 'astro/config';
import orizFleet from '@oriz/api-fleet-template';

export default defineConfig({
  output: 'static',
  site: 'https://dynasties.oriz.in',
  integrations: [
    orizFleet({
      apiName: 'dynasties',
      apiTitle: 'Indian Dynasties API',
      apiDescription:
        'Free static API for 39 Indian historical dynasties spanning 544 BCE to 1949 CE with 261 rulers, capitals, regions, and notable achievements.',
      stats: '39 dynasties · 261 rulers · 544 BCE - 1949 CE · CC BY-SA',
      themeColor: 'emerald',
      githubRepo: 'oriz-org/dynasties-api',
      sampleEndpoint: '/dynasties/mauryan.json',
      dataDirs: ['dynasties'],
      indexFiles: ['index.json', 'all.json', 'timeline.json', 'eras.json'],
      sampleResponse: {
        slug: 'mauryan',
        name: 'Mauryan Empire',
        alt_names: ['Maurya Dynasty'],
        period: {
          start: -322,
          end: -185,
          start_era: 'BCE',
          end_era: 'BCE',
        },
        region: 'South Asia (most of subcontinent)',
        capitals: ['Pataliputra'],
        rulers: [
          {
            name: 'Chandragupta Maurya',
            reign_start: -322,
            reign_end: -298,
            notes: 'Founder; tutored by Chanakya/Kautilya',
          },
          {
            name: 'Ashoka the Great',
            reign_start: -268,
            reign_end: -232,
            notes: 'Embraced Buddhism after Kalinga War; dhamma edicts',
          },
        ],
        religion:
          'Hinduism, Buddhism, Jainism (pluralistic; Ashoka patronised Buddhism)',
        predecessor: 'nanda',
        successor: 'shunga',
        notable_achievements: [
          'First pan-Indian empire',
          "Ashoka's rock and pillar edicts",
          'Spread of Buddhism to Sri Lanka and Central Asia',
        ],
        notes: '',
      },
    }),
  ],
});
