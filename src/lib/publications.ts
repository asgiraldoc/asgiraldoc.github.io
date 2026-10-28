import { load } from 'js-yaml';
import { it } from './taxa';
import raw from '../data/publications.yml?raw';

export interface Pub {
  year: number;
  authors: string[];
  title: string;
  venue: string;
  details?: string;
  doi?: string;
  status?: 'preprint' | 'thesis';
  url?: string;
}

export const publications = load(raw) as Pub[];

export const SELF = 'Cepeda, A. S.';

export const italicizeTaxa = it;

export const doiUrl = (doi: string) => `https://doi.org/${doi}`;
