// Static grey athlete silhouette SVGs as data URIs
// No external dependencies, no cartoon avatars

function createSilhouette(initials: string, variant: 'athlete' | 'trainer' | 'recruiter' | 'pro' = 'athlete'): string {
  const bgColors = {
    athlete: '#1a1a1a',
    trainer: '#1a1a1a',
    recruiter: '#1a1a1a',
    pro: '#1a1a1a',
  };

  const accentColors = {
    athlete: '#3a3a3a',
    trainer: '#3a3a3a',
    recruiter: '#3a3a3a',
    pro: '#3a3a3a',
  };

  const bg = bgColors[variant];
  const accent = accentColors[variant];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="${bg}"/>
    <circle cx="100" cy="75" r="35" fill="${accent}"/>
    <ellipse cx="100" cy="165" rx="55" ry="45" fill="${accent}"/>
    <text x="100" y="82" text-anchor="middle" fill="#666" font-family="system-ui,sans-serif" font-size="28" font-weight="700">${initials}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const AVATARS = {
  // Athletes
  marcus: createSilhouette('MJ', 'athlete'),
  jamal: createSilhouette('JW', 'athlete'),
  deandre: createSilhouette('DT', 'athlete'),
  terrell: createSilhouette('TG', 'athlete'),
  khalil: createSilhouette('KR', 'athlete'),
  davonte: createSilhouette('DC', 'athlete'),
  isaiah: createSilhouette('IB', 'athlete'),
  trevon: createSilhouette('TH', 'athlete'),
  malik: createSilhouette('MS', 'athlete'),
  jordan: createSilhouette('JP', 'athlete'),
  // Trainers
  mike: createSilhouette('MD', 'trainer'),
  sarah: createSilhouette('SJ', 'trainer'),
  ray: createSilhouette('RL', 'trainer'),
  // Recruiters
  john: createSilhouette('JS', 'recruiter'),
  patricia: createSilhouette('PW', 'recruiter'),
  david: createSilhouette('DM', 'recruiter'),
  // Pro comparisons
  mahomes: createSilhouette('PM', 'pro'),
  allen: createSilhouette('JA', 'pro'),
  lamar: createSilhouette('LJ', 'pro'),
} as const;
