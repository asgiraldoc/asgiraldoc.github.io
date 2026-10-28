// All visible text, English and Spanish side by side. Edit here, not in the pages.
import type { Lang } from '../config';

export interface Text {
  en: string;
  es: string;
}

export const ui = {
  nav: {
    research: { en: 'Research', es: 'Investigación' },
    publications: { en: 'Publications', es: 'Publicaciones' },
    software: { en: 'Software', es: 'Software' },
    projects: { en: 'Projects', es: 'Proyectos' },
    cv: { en: 'CV', es: 'CV' },
    about: { en: 'About', es: 'Sobre mí' },
    contact: { en: 'Contact', es: 'Contacto' },
  },
  skip: { en: 'Skip to content', es: 'Saltar al contenido' },
  menu: { en: 'Menu', es: 'Menú' },
  theme: { en: 'Toggle color theme', es: 'Cambiar tema de color' },
  footer: {
    note: {
      en: 'Built with Astro. Source on GitHub.',
      es: 'Hecho con Astro. Código en GitHub.',
    },
  },
  viewAll: { en: 'All publications', es: 'Todas las publicaciones' },
  downloadCv: { en: 'Download CV (PDF)', es: 'Descargar CV (PDF)' },
  scholar: { en: 'Google Scholar', es: 'Google Scholar' },
  email: { en: 'Email', es: 'Correo' },
  selected: { en: 'Recent publications', es: 'Publicaciones recientes' },
  lines: { en: 'Research lines', es: 'Líneas de investigación' },
  readMore: { en: 'Read more', es: 'Ver más' },
  preprint: { en: 'Preprint', es: 'Preprint' },
  thesis: { en: 'PhD thesis', es: 'Tesis doctoral' },
  fullText: { en: 'Full text', es: 'Texto completo' },
} satisfies Record<string, Text | Record<string, Text>>;

export const home = {
  eyebrow: {
    en: 'Infectious disease genomics · Evolution · Bioinformatics',
    es: 'Genómica de enfermedades infecciosas · Evolución · Bioinformática',
  },
  role: {
    en: 'PhD in Biology (Temple University, 2026) · Visiting Scholar, Escalante Lab',
    es: 'PhD en Biología (Temple University, 2026) · Investigador visitante, Laboratorio Escalante',
  },
  statement: {
    en: 'I study the evolution of infectious disease agents, mainly malaria and other haemosporidian parasites, and mpox virus, combining comparative and population genomics, phylogenomics and machine learning. I also build the software that makes those analyses reproducible.',
    es: 'Estudio la evolución de agentes de enfermedades infecciosas, principalmente la malaria y otros parásitos hemosporidios, y el virus mpox, combinando genómica comparada y poblacional, filogenómica y aprendizaje automático. También desarrollo el software que hace reproducibles estos análisis.',
  },
  legend: {
    en: 'Genomes produced or improved in my research',
    es: 'Genomas producidos o mejorados en mi investigación',
  },
  alignmentLabel: {
    en: 'Decorative illustration: a schematic phylogeny of haemosporidian parasites next to their aligned DNA sequences.',
    es: 'Ilustración decorativa: una filogenia esquemática de parásitos hemosporidios junto a sus secuencias de ADN alineadas.',
  },
};

export interface Line {
  id: string;
  title: Text;
  summary: Text;
  body: Text[];
  tags: string[];
}

export const researchIntro: Text = {
  en: 'My work connects genome-scale data with evolutionary questions about pathogens, and with the computational methods needed to answer them.',
  es: 'Mi trabajo conecta datos a escala genómica con preguntas evolutivas sobre patógenos, y con los métodos computacionales necesarios para responderlas.',
};

export const lines: Line[] = [
  {
    id: 'plasmodium',
    title: {
      en: 'Genomics and phylogenomics of Plasmodium',
      es: 'Genómica y filogenómica de Plasmodium',
    },
    summary: {
      en: 'Reconstructing the evolutionary history of human malaria parasites from high-quality genomes.',
      es: 'Reconstrucción de la historia evolutiva de los parásitos de la malaria humana a partir de genomas de alta calidad.',
    },
    body: [
      {
        en: 'My doctoral thesis, New Insights into Plasmodium Evolution: How Genomics and Evolutionary Biology Contribute to Understanding Malaria, combines genome assembly, phylogenomics and molecular evolution. I generated the first chromosome-level de novo genome assembly of Plasmodium gonderi, a malaria parasite of African monkeys. Phylogenomic analyses with this genome place the common ancestor of Plasmodium vivax within the radiation of Asian primate malarias, supporting an Asian origin for this widespread species. Time-tree analyses also date the origin of the Laverania clade, which includes P. falciparum, to the period of the radiation of its great-ape hosts.',
        es: 'Mi tesis doctoral, New Insights into Plasmodium Evolution: How Genomics and Evolutionary Biology Contribute to Understanding Malaria, combina ensamblaje de genomas, filogenómica y evolución molecular. Generé el primer ensamblaje genómico de novo a nivel de cromosoma de Plasmodium gonderi, un parásito de la malaria de monos africanos. Los análisis filogenómicos con este genoma ubican al ancestro común de Plasmodium vivax dentro de la radiación de las malarias de primates asiáticos, lo que respalda un origen asiático para esta especie. Los análisis de árboles de tiempo también fechan el origen del clado Laverania, que incluye a P. falciparum, en el periodo de la radiación de sus hospederos, los grandes simios.',
      },
      {
        en: 'In a companion review I performed the species-tree reconstruction from more than 1,000 genes that frames the deep divergence between the subgenus Plasmodium and Laverania, and the distinct molecular adaptations of each lineage.',
        es: 'En una revisión complementaria realicé la reconstrucción del árbol de especies a partir de más de 1,000 genes que enmarca la divergencia profunda entre el subgénero Plasmodium y Laverania, y las adaptaciones moleculares propias de cada linaje.',
      },
    ],
    tags: ['Comparative genomics', 'Phylogenomics', 'Time-trees', 'Genome assembly'],
  },
  {
    id: 'haemosporida',
    title: {
      en: 'Diversity of haemosporidian and related blood parasites',
      es: 'Diversidad de hemosporidios y otros parásitos sanguíneos',
    },
    summary: {
      en: 'Birds, reptiles and mammals as hosts: species limits, cryptic diversity and life cycles.',
      es: 'Aves, reptiles y mamíferos como hospederos: límites de especie, diversidad críptica y ciclos de vida.',
    },
    body: [
      {
        en: 'I study the diversity of Haemoproteus and related parasites in wildlife. Using complete mitochondrial genomes, we resolved nine parasite lineages in North American owls, including two new to science, and linked a widespread lineage to Haemoproteus syrnii. The data also showed that a presumed single species is a complex of cryptic species.',
        es: 'Estudio la diversidad de Haemoproteus y parásitos relacionados en fauna silvestre. Con genomas mitocondriales completos resolvimos nueve linajes de parásitos en búhos de Norteamérica, dos de ellos nuevos para la ciencia, y vinculamos un linaje ampliamente distribuido con Haemoproteus syrnii. Los datos también mostraron que una supuesta especie única es un complejo de especies crípticas.',
      },
      {
        en: 'As a graduate researcher on the NSF-funded project Assessing the systematics and diversity of Haemosporida in African lizards (2022–2026), I developed a machine-learning model to infer haplotypes from target-sequencing data.',
        es: 'Como investigador graduado en el proyecto financiado por la NSF Assessing the systematics and diversity of Haemosporida in African lizards (2022–2026), desarrollé un modelo de aprendizaje automático para inferir haplotipos a partir de datos de secuenciación dirigida.',
      },
      {
        en: 'During my master’s work at the Universidad Nacional de Colombia (GERPH) I characterized the Haemoproteus columbae apicoplast genome, the first for the genus, and described the complete experimental life cycle of H. columbae in its natural pigeon host and louse-fly vector. For Haemogregarina in Colombian turtles, I assembled the mitochondrial genome from raw reads to design new markers that revealed hidden diversity.',
        es: 'Durante mi maestría en la Universidad Nacional de Colombia (GERPH) caractericé el genoma del apicoplasto de Haemoproteus columbae, el primero del género, y describí el ciclo de vida experimental completo de H. columbae en su hospedero natural, la paloma, y su vector, la mosca hipobóscida. Para Haemogregarina en tortugas colombianas ensamblé el genoma mitocondrial a partir de lecturas crudas para diseñar nuevos marcadores que revelaron diversidad oculta.',
      },
    ],
    tags: ['Haemoproteus', 'Mitochondrial genomes', 'Cryptic species', 'Host–parasite systems'],
  },
  {
    id: 'mpox',
    title: {
      en: 'Molecular surveillance and evolution of mpox virus',
      es: 'Vigilancia molecular y evolución del virus mpox',
    },
    summary: {
      en: 'Genomic tools to track the transmission and evolution of mpox virus.',
      es: 'Herramientas genómicas para rastrear la transmisión y evolución del virus mpox.',
    },
    body: [
      {
        en: 'As a graduate researcher on the CDC-funded project Developing an evidence-based molecular surveillance system for mpox (2023–2024; PI: Dr. Ananias A. Escalante), I developed SNP panels for the mpox virus (MPXV) and carried out tip-dating analyses with BEAST2 to support molecular surveillance.',
        es: 'Como investigador graduado en el proyecto financiado por los CDC Developing an evidence-based molecular surveillance system for mpox (2023–2024; IP: Dr. Ananias A. Escalante), desarrollé paneles de SNP para el virus mpox (MPXV) y realicé análisis de tip-dating con BEAST2 para apoyar la vigilancia molecular.',
      },
    ],
    tags: ['MPXV', 'SNP panels', 'Tip-dating', 'BEAST2'],
  },
  {
    id: 'methods',
    title: {
      en: 'Computational methods and machine-learning tools',
      es: 'Métodos computacionales y herramientas de aprendizaje automático',
    },
    summary: {
      en: 'Pipelines and models in Python and R that turn genomic data into reproducible biological results.',
      es: 'Flujos de trabajo y modelos en Python y R que convierten datos genómicos en resultados biológicos reproducibles.',
    },
    body: [
      {
        en: 'As a bioinformatician I design and implement analysis software. The HmtG-PacBio pipeline uses a variational autoencoder to classify PacBio HiFi long reads from the whole mitochondrial genome, separating distinct parasite haplotypes and species in a single mixed-infection sample. It characterized infections in birds, reptiles and mammals that standard barcoding missed.',
        es: 'Como bioinformático diseño e implemento software de análisis. El pipeline HmtG-PacBio usa un autoencoder variacional para clasificar lecturas largas PacBio HiFi del genoma mitocondrial completo, separando haplotipos y especies de parásitos distintos dentro de una misma muestra de infección mixta. Caracterizó infecciones en aves, reptiles y mamíferos que el código de barras estándar no detectó.',
      },
      {
        en: 'Since 2023 I have developed reproducible pathogen-genomics workflows on the Galaxy platform as part of the multi-institutional BRC Analytics / Galaxy Project (Penn State, Temple, Johns Hopkins, UCSC and TACC; NIH-funded). I also write teaching material on pangenomics, phylogenetic model selection and hybrid genome assembly.',
        es: 'Desde 2023 desarrollo flujos de trabajo reproducibles de genómica de patógenos en la plataforma Galaxy, como parte del proyecto multiinstitucional BRC Analytics / Galaxy Project (Penn State, Temple, Johns Hopkins, UCSC y TACC; financiado por los NIH). También elaboro material didáctico sobre pangenómica, selección de modelos filogenéticos y ensamblaje híbrido de genomas.',
      },
    ],
    tags: ['Python', 'R', 'Machine learning', 'Galaxy', 'Workflows'],
  },
];

export interface Tool {
  name: string;
  kind: Text;
  description: Text;
  tags: string[];
  href: string;
  cta: Text;
}

export const softwareIntro: Text = {
  en: 'Tools, pipelines and tutorials I develop or maintain. Most are written in Python and R and are openly available.',
  es: 'Herramientas, flujos de trabajo y tutoriales que desarrollo o mantengo. La mayoría está escrita en Python y R y está disponible abiertamente.',
};

export const tools: Tool[] = [
  {
    name: 'HmtG-PacBio-Pipeline',
    kind: { en: 'Pipeline', es: 'Pipeline' },
    description: {
      en: 'Machine-learning workflow (variational autoencoder) that sorts PacBio HiFi mitochondrial reads into parasite haplotypes and species, including mixed infections.',
      es: 'Flujo de trabajo con aprendizaje automático (autoencoder variacional) que clasifica lecturas mitocondriales PacBio HiFi en haplotipos y especies de parásitos, incluidas infecciones mixtas.',
    },
    tags: ['Python', 'PacBio HiFi', 'VAE'],
    href: 'https://asgiraldoc.github.io/HmtG-PacBio-Pipeline/index.html',
    cta: { en: 'Documentation', es: 'Documentación' },
  },
  {
    // TODO: describe your own contribution to PAL2NAL (guide, scripts, examples).
    name: 'PAL2NAL',
    kind: { en: 'Workflow', es: 'Flujo de trabajo' },
    description: {
      en: 'Codon-based alignment of coding sequences using PAL2NAL.',
      es: 'Alineamiento de secuencias codificantes basado en codones con PAL2NAL.',
    },
    tags: ['Alignment', 'Codons'],
    href: 'https://github.com/asgiraldoc/BioLabTemple/tree/main/PAL2NAL',
    cta: { en: 'GitHub', es: 'GitHub' },
  },
  {
    name: 'Galaxy · BRC Analytics',
    kind: { en: 'Community project', es: 'Proyecto comunitario' },
    description: {
      en: 'BRC Analytics brings reference genomic data for pathogens, hosts and vectors together with Galaxy workflows that run on shared infrastructure. I develop reproducible pathogen-genomics workflows for the project.',
      es: 'BRC Analytics reúne datos genómicos de referencia de patógenos, hospederos y vectores con flujos de trabajo de Galaxy que corren en infraestructura compartida. Desarrollo flujos de trabajo reproducibles de genómica de patógenos para el proyecto.',
    },
    tags: ['Galaxy', 'Workflows', 'Open science'],
    href: 'https://brc-analytics.org',
    cta: { en: 'brc-analytics.org', es: 'brc-analytics.org' },
  },
];

export const tutorials: Tool[] = [
  {
    name: 'Macro-evolutionary Pangenomics',
    kind: { en: 'Tutorial', es: 'Tutorial' },
    description: {
      en: 'A Plasmodium case study of pangenome analysis across the monkey-parasite clade.',
      es: 'Un caso de estudio en Plasmodium de análisis de pangenoma en el clado de parásitos de monos.',
    },
    tags: ['Pangenomics', 'Plasmodium'],
    href: 'https://github.com/asgiraldoc/Macro-evolutionary-Pangenomics-of-the-Plasmodium-monkey-clade.git',
    cta: { en: 'GitHub', es: 'GitHub' },
  },
  {
    name: 'Phylogenetic substitution models',
    kind: { en: 'Tutorial', es: 'Tutorial' },
    description: {
      en: 'Maximum-likelihood model comparison in orthopoxviruses.',
      es: 'Comparación de modelos de máxima verosimilitud en ortopoxvirus.',
    },
    tags: ['Maximum likelihood', 'Phylogenetics'],
    href: 'https://github.com/asgiraldoc/MaximumLikelihood-EvolutionaryGeneticsPhylogenetics.git',
    cta: { en: 'GitHub', es: 'GitHub' },
  },
  {
    name: 'Hybrid genome assembly',
    kind: { en: 'Workshop', es: 'Taller' },
    description: {
      en: 'Hybrid assembly of Leptospira interrogans serovar Copenhageni.',
      es: 'Ensamblaje híbrido de Leptospira interrogans serovar Copenhageni.',
    },
    tags: ['Assembly', 'Long + short reads'],
    href: 'https://github.com/asgiraldoc/Leptospira_GenomeAssembly_Workshop.git',
    cta: { en: 'GitHub', es: 'GitHub' },
  },
];

export const projectsIntro: Text = {
  en: 'Interactive work for teaching and public engagement.',
  es: 'Trabajo interactivo para docencia y divulgación.',
};

export const projects = [
  {
    id: 'game',
    title: {
      en: 'Microbial Symbiosis and Microbiomes: a game',
      es: 'Simbiosis microbiana y microbiomas: un juego',
    },
    description: {
      en: 'An exploration game in the style of classic Pokémon, built as a teaching companion for the course Microbial Symbiosis and Microbiomes (Spring 2025).',
      es: 'Un juego de exploración al estilo de los Pokémon clásicos, creado como apoyo docente para el curso Microbial Symbiosis and Microbiomes (primavera 2025).',
    },
    credit: {
      en: 'Built on open-source code by Ariel Roffé (MIT). Tilesets, fonts and music are credited to their authors in the project README.',
      es: 'Construido sobre código abierto de Ariel Roffé (MIT). Los tilesets, tipografías y música se acreditan a sus autores en el README del proyecto.',
    },
    href: '/projects/pokemon-game/',
    cta: { en: 'Play', es: 'Jugar' },
    external: true,
  },
  {
    id: 'dvk',
    title: {
      en: 'Darwin vs Kropotkin',
      es: 'Darwin vs Kropotkin',
    },
    description: {
      en: 'A cross-disciplinary essay on competition, mutual aid and the modern science of cooperation, with an interactive lab to compare evolutionary-game and ecological models.',
      es: 'Un ensayo interdisciplinario sobre competencia, ayuda mutua y la ciencia moderna de la cooperación, con un laboratorio interactivo para comparar modelos de teoría de juegos evolutiva y ecología.',
    },
    credit: { en: '', es: '' },
    href: '/projects/darwin-vs-kropotkin/',
    cta: { en: 'Read and explore', es: 'Leer y explorar' },
    external: true,
  },
];

export const about = {
  title: { en: 'About', es: 'Sobre mí' },
  photoAlt: {
    en: 'Portrait of Axl S. Cepeda',
    es: 'Retrato de Axl S. Cepeda',
  },
  paragraphs: [
    {
      en: 'I am an evolutionary biologist and bioinformatician from Bogotá, Colombia. I completed my BSc and MSc in Biology at the Universidad Nacional de Colombia, where I was part of the research group GERPH and learned parasitology, molecular biology and ecology. My master’s thesis characterized the genome of Haemoproteus (Haemoproteus) columbae as a tool for the evolutionary study of the order Haemosporida, and received a laureate mention.',
      es: 'Soy biólogo evolutivo y bioinformático de Bogotá, Colombia. Hice mi pregrado y maestría en Biología en la Universidad Nacional de Colombia, donde fui parte del grupo de investigación GERPH y aprendí parasitología, biología molecular y ecología. Mi tesis de maestría caracterizó el genoma de Haemoproteus (Haemoproteus) columbae como herramienta para el estudio evolutivo del orden Haemosporida, y recibió mención laureada.',
    },
    {
      en: 'I then completed my PhD in Biology at Temple University (2021–2026) in the Escalante Lab, at the Institute for Genomics and Evolutionary Medicine (iGEM), where I worked on comparative genomics and population genetics of Plasmodium. I defended in July 2026 and I am currently a visiting scholar in the same laboratory, working from Colombia.',
      es: 'Luego realicé mi doctorado en Biología en Temple University (2021–2026) en el Laboratorio Escalante, del Institute for Genomics and Evolutionary Medicine (iGEM), donde trabajé en genómica comparada y genética de poblaciones de Plasmodium. Defendí en julio de 2026 y actualmente soy investigador visitante en el mismo laboratorio, trabajando desde Colombia.',
    },
    {
      en: 'I am interested in building bridges between population genetics, ecology and evolutionary biology by interpreting pathogen genomic patterns and integrating them with environmental and epidemiological information.',
      es: 'Me interesa tender puentes entre la genética de poblaciones, la ecología y la biología evolutiva, interpretando patrones genómicos de patógenos e integrándolos con información ambiental y epidemiológica.',
    },
  ] as Text[],
  personalTitle: { en: 'Outside the lab', es: 'Fuera del laboratorio' },
  personal: {
    en: 'I listen to everything from death metal to Colombian folk music, play chess and video games, follow Millonarios FC, and read philosophy, fantasy and classic literature. I also collect tattoos that mark experiences and beliefs.',
    es: 'Escucho de todo, desde death metal hasta música folclórica colombiana, juego ajedrez y videojuegos, sigo a Millonarios FC y leo filosofía, fantasía y literatura clásica. También colecciono tatuajes que marcan experiencias y creencias.',
  } as Text,
};

export interface CvItem {
  title: Text;
  place: string;
  when: string;
  note?: Text;
}

export const cvPage = {
  intro: {
    en: 'The CV is the most complete and current record of my training, positions and outputs.',
    es: 'El CV es el registro más completo y actualizado de mi formación, cargos y productos.',
  } as Text,
  education: { en: 'Education', es: 'Formación' } as Text,
  experience: { en: 'Positions and experience', es: 'Cargos y experiencia' } as Text,
  projects: { en: 'Funded research projects', es: 'Proyectos de investigación financiados' } as Text,
  educationItems: [
    {
      title: { en: 'PhD in Biology', es: 'PhD en Biología' },
      place: 'Temple University, Philadelphia, USA · Institute for Genomics and Evolutionary Medicine (iGEM)',
      when: '2021 – 2026',
      note: {
        en: 'Advisor: Dr. Ananias A. Escalante. Committee: Dr. Jody Hey and Dr. Sergei L. Kosakovsky Pond. Defended 2026. Thesis: New Insights into Plasmodium Evolution: How Genomics and Evolutionary Biology Contribute to Understanding Malaria.',
        es: 'Director: Dr. Ananias A. Escalante. Comité: Dr. Jody Hey y Dr. Sergei L. Kosakovsky Pond. Sustentación: 2026. Tesis: New Insights into Plasmodium Evolution: How Genomics and Evolutionary Biology Contribute to Understanding Malaria.',
      },
    },
    {
      title: { en: 'MSc in Biology', es: 'Maestría en Ciencias – Biología' },
      place: 'Universidad Nacional de Colombia, Bogotá',
      when: '2017 – 2020',
      note: {
        en: 'Advisor: Dr. Nubia E. Matta. Thesis with Laureate distinction. Defended November 2019.',
        es: 'Directora: Dra. Nubia E. Matta. Tesis con distinción Laureada. Sustentación: noviembre de 2019.',
      },
    },
    {
      title: { en: 'BSc in Biology', es: 'Biólogo' },
      place: 'Universidad Nacional de Colombia, Bogotá',
      when: '2011 – 2016',
      note: {
        en: 'Advisor: Dr. Nubia E. Matta. Defended December 2016.',
        es: 'Directora: Dra. Nubia E. Matta. Sustentación: diciembre de 2016.',
      },
    },
  ] as CvItem[],
  experienceItems: [
    {
      title: { en: 'Visiting Scholar', es: 'Investigador visitante' },
      place: 'Temple University, Escalante Lab (iGEM)',
      when: '2026 –', // TODO: confirm start date
    },
    {
      title: { en: 'Graduate Researcher', es: 'Investigador en formación doctoral' },
      place: 'Institute for Genomics and Evolutionary Medicine (iGEM), Temple University',
      when: '2021 – 2026',
    },
    {
      title: { en: 'Teaching Assistant, General Biology I and II', es: 'Asistente de docencia, Biología General I y II' },
      place: 'Temple University',
      when: '2021 – 2023',
      note: {
        en: '2.5 years of laboratory instruction and academic support.',
        es: '2.5 años de instrucción de laboratorio y apoyo académico.',
      },
    },
    {
      title: { en: 'Forensic University Professional', es: 'Profesional Universitario Forense' },
      place: 'Instituto Nacional de Medicina Legal y Ciencias Forenses, Escuela de Medicina Legal y Ciencias Forenses, Bogotá',
      when: '2018 – 2020',
    },
  ] as CvItem[],
  projectItems: [
    {
      title: { en: 'Developing an evidence-based molecular surveillance system for mpox', es: 'Developing an evidence-based molecular surveillance system for mpox' },
      place: 'Centers for Disease Control and Prevention (CDC), USA · PI: Dr. Ananias A. Escalante',
      when: '2023 – 2024',
      note: {
        en: 'Graduate researcher: development of SNP panels for MPXV and tip-dating analyses (BEAST2) for molecular surveillance.',
        es: 'Investigador graduado: desarrollo de paneles de SNP para MPXV y análisis de tip-dating (BEAST2) para vigilancia molecular.',
      },
    },
    {
      title: { en: 'Assessing the systematics and diversity of Haemosporida in African lizards', es: 'Assessing the systematics and diversity of Haemosporida in African lizards' },
      place: 'National Science Foundation (NSF), USA · PI: Dr. Ananias A. Escalante',
      when: '2022 – 2026',
      note: {
        en: 'Graduate researcher: development of a machine-learning model for haplotype inference from target-sequencing data.',
        es: 'Investigador graduado: desarrollo de un modelo de aprendizaje automático para inferencia de haplotipos a partir de datos de secuenciación dirigida.',
      },
    },
    {
      title: { en: 'BRC Analytics / Galaxy Project', es: 'BRC Analytics / Galaxy Project' },
      place: 'Multi-institutional initiative (Penn State, Temple, Johns Hopkins, UCSC, TACC) · NIH',
      when: '2023 – present',
      note: {
        en: 'Graduate researcher: development of reproducible pathogen-genomics workflows on the Galaxy platform.',
        es: 'Investigador graduado: desarrollo de flujos de trabajo reproducibles de genómica de patógenos en la plataforma Galaxy.',
      },
    },
  ] as CvItem[],
};

export const contact = {
  title: { en: 'Contact', es: 'Contacto' } as Text,
  intro: {
    en: 'I am happy to talk about collaborations, data analysis, and parasite genomics.',
    es: 'Con gusto converso sobre colaboraciones, análisis de datos y genómica de parásitos.',
  } as Text,
  location: {
    en: 'Based in Colombia. Visiting Scholar, Escalante Lab, Temple University.',
    es: 'Radicado en Colombia. Investigador visitante, Laboratorio Escalante, Temple University.',
  } as Text,
};

export const meta = {
  description: {
    en: 'Axl S. Cepeda: PhD in Biology (Temple University, 2026) working on the evolutionary genomics of infectious diseases (malaria, haemosporidian parasites, mpox) and on bioinformatic tools with machine learning.',
    es: 'Axl S. Cepeda: PhD en Biología (Temple University, 2026) en genómica evolutiva de enfermedades infecciosas (malaria, parásitos hemosporidios, mpox) y herramientas bioinformáticas con aprendizaje automático.',
  } as Text,
};

export const pick = (t: Text, lang: Lang) => t[lang];
