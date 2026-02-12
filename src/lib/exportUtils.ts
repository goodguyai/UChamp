// Export utilities for generating CSV downloads

export function downloadCSV(filename: string, headers: string[], rows: string[][]): void {
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function exportAthleteReport(athlete: {
  name: string;
  position: string;
  school: string;
  gradYear: number;
  height: string;
  weight: number;
  reliabilityScore: number;
  stats: Record<string, number>;
  recentWorkouts: { date: string; type: string; duration: number; verified: boolean }[];
}): void {
  const headers = ['Field', 'Value'];
  const rows: string[][] = [
    ['Name', athlete.name],
    ['Position', athlete.position],
    ['School', athlete.school],
    ['Graduation Year', String(athlete.gradYear)],
    ['Height', athlete.height],
    ['Weight', `${athlete.weight} lbs`],
    ['Reliability Score', String(athlete.reliabilityScore)],
    ['', ''],
    ['--- PERFORMANCE STATS ---', ''],
    ...Object.entries(athlete.stats).map(([key, val]) => [key, String(val)]),
    ['', ''],
    ['--- RECENT WORKOUTS ---', ''],
    ...athlete.recentWorkouts.map(w => [w.date, `${w.type}, ${w.duration} min, ${w.verified ? 'Verified' : 'Pending'}`]),
  ];
  downloadCSV(`${athlete.name.replace(/\s+/g, '_')}_Report.csv`, headers, rows);
}

export function exportSearchResults(athletes: {
  name: string;
  position: string;
  school: string;
  gradYear: number;
  reliabilityScore: number;
  stats: Record<string, number>;
}[]): void {
  const headers = ['Name', 'Position', 'School', 'Class', 'Reliability', '40-Yard', 'Bench', 'Vertical'];
  const rows = athletes.map(a => [
    a.name, a.position, a.school, String(a.gradYear), String(a.reliabilityScore),
    String(a.stats.fortyYardDash || 'N/A'), String(a.stats.bench || 'N/A'), String(a.stats.vertical || 'N/A'),
  ]);
  downloadCSV('UChamp_Search_Results.csv', headers, rows);
}
