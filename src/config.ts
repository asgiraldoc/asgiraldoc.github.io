// Single source of truth for identity, links and analytics.
export const site = {
  url: 'https://asgiraldoc.github.io',
  name: 'Axl S. Cepeda',
  shortName: 'Axl S. Cepeda',
  email: 'axl.giraldo@temple.edu',
  gaId: 'G-9D67NSSH9Y',
  links: {
    scholar: 'https://scholar.google.com/citations?user=Mxpv7hMAAAAJ&hl=en',
    github: 'https://github.com/asgiraldoc',
    linkedin: 'https://www.linkedin.com/in/AxlCepeda420',
    lab: 'https://igem.temple.edu/people/person/c0ca56d9e60be58ca9380514ed8ac51d',
    igem: 'https://igem.temple.edu/',
    temple: 'https://www.temple.edu/',
    gerph: 'https://ciencias.bogota.unal.edu.co/grupos_de_investigacion/biologia/gerph/',
    brc: 'https://brc-analytics.org',
    // TODO: add ORCID URL once the ORCID iD exists.
    orcid: '',
  },
  cv: '/cv/CV_Axl-Cepeda.pdf', // replace this file to update the CV
} as const;

export type Lang = 'en' | 'es';
export const langs: Lang[] = ['en', 'es'];
