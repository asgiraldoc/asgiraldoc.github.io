// Italicize Latin names (genera and species) in any display text. Use with set:html.
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const GENERA = 'Plasmodium|Haemoproteus|Haemogregarina|Haemocystidium|Leucocytozoon|Hepatocystis|Leptospira|Podocnemis|Laverania';
const EPITHETS = 'vivax|falciparum|gonderi|syrnii|columbae|vogli|reichenowi|knowlesi|interrogans|malariae|ovale';

const TAXA = new RegExp(
  [
    `Haemoproteus \\(Haemoproteus\\) (?:${EPITHETS})`, // subgenus form
    `\\b(?:${GENERA})\\b(?: (?:${EPITHETS})\\b)?`, // genus, optionally with epithet
    `\\b[PHL]\\. (?:${EPITHETS})\\b`, // abbreviated binomial, e.g. P. vivax
  ].join('|'),
  'g',
);

export const it = (text: string) => escape(text).replace(TAXA, (m) => `<i>${m}</i>`);
