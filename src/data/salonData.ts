export const SALON_INFO = {
  name: 'IRA UNISEX SALON',
  location: 'Mumbai, India',
  tagline: 'Your experience. Your review. Made easy.',
  reviewUrl:
    'https://www.google.com/search?sca_esv=6a0a97182983e41a&cs=0&sxsrf=APpeQnsWXM8WPr2RIS1iLhbgRH9S568B8A:1789721014509&q=ira+unisex+salon+mumbai+reviews&uds=AJ5uw1__bT1YXpg5cPC5Wc0Y_eZkHLj4AWiZ8mvwdpby4CJY7X5-yPFt010EcnE7iEJhaDSCkiZt6A1WgCtKOgzHsNj_-CScVDJuEK5bOP66sXO3BbzyfEgRPguiJQxARPLV6iWrJVGNt1v0O0BBit2_CBfMJ-0VCuRJzl3plEkwHCRe2mO8lwUyisePCx8sHCpOpum9rEiso8srTLXbJBHJpqVSvOOLgxyMMiXKRhESiI4bByYGInsvz1Awx0VWQ-9w-N8jPjSxANgDiw2MKh9WWyvs271yzadl2eUrveXi6gF_-IDXNF4KN0O9TJUYi2KzFOVZYNHVIMWFBMm5YIR1ixdmW1CDPJJb6G4QwaKekZPuKx-xhkj2NuTkZ7oQTE0WjG263W8A7fPpkoA7OHJgqIJlJ-aAcXXnSUJ8BmYxUj4lzUfv67E&sa=X&ved=2ahUKEwiN_8Oq3veWAxWOiuEIHau1BcoQk8gLegQIIhAB&biw=360&bih=720&d',
};

export const SALON_SERVICES = [
  { id: 'haircut', label: 'Haircut & Styling', category: 'Hair' },
  { id: 'hair-spa', label: 'Hair Spa & Treatment', category: 'Hair' },
  { id: 'hair-color', label: 'Hair Color & Highlights', category: 'Hair' },
  { id: 'beard-grooming', label: 'Beard Trim & Grooming', category: 'Grooming' },
  { id: 'facial', label: 'Facial & Skincare', category: 'Face' },
  { id: 'mani-pedi', label: 'Manicure & Pedicure', category: 'Nails' },
  { id: 'threading-waxing', label: 'Threading & Waxing', category: 'Grooming' },
  { id: 'head-massage', label: 'Head & Shoulder Massage', category: 'Relaxation' },
  { id: 'something-else', label: 'Something else', category: 'Other', isCustom: true },
];

export const STANDOUT_OPTIONS = [
  'SERVICE',
  'STAFF',
  'QUALITY',
  'CLEANLINESS',
  'AMBIENCE',
  'PROFESSIONALISM',
  'ATTENTION TO DETAIL',
  'VALUE',
  'OVERALL EXPERIENCE',
  'NOTHING SPECIFIC',
  'OTHER',
] as const;
