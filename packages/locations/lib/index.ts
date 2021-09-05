'use strict';

interface ILocation {
  text: string;
  abbr: string;
}
interface ILocationContainer {
  [key: string]: ILocation[];
}

export const colleges: ILocationContainer = {
  UR: [
    {
      text: 'College of Science & Technology',
      abbr: 'CST',
    },
    {
      text: 'College of Business & Economics',
      abbr: 'CBE',
    },
    {
      text: 'College of Arts and Social Sciences',
      abbr: 'CASS',
    },
    {
      text: 'College of Agriculture, Animal Sciences and Veterinary Medicine',
      abbr: 'CAVM',
    },
    {
      text: 'College of Education',
      abbr: 'CE',
    },
    {
      text: 'College of Medecine and Health Siences',
      abbr: 'CMHS',
    },
  ],
  '': [],
};

export const schools: ILocationContainer = {
  '': [],
  CST: [
    {
      text: 'School of Engineering',
      abbr: 'ENG',
    },
    {
      text: 'School of Science',
      abbr: 'SCI',
    },
    {
      text: 'School of Architecture and Built Environment',
      abbr: 'SABE',
    },
    {
      text: 'School of ICT',
      abbr: 'SICT',
    },
    {
      text: 'School of Mining and Geology',
      abbr: 'SMG',
    },
  ],
  CBE: [
    {
      text: 'School of Business',
      abbr: 'SB',
    },
    {
      text: 'School of Economics',
      abbr: 'SE',
    },
  ],
  CASS: [
    {
      text: ' School of Law',
      abbr: 'SL',
    },
    {
      text: 'School of Journalism and Communication',
      abbr: 'SJC',
    },

    {
      text: ' School of Governance',
      abbr: 'SOG',
    },
    {
      text: 'School of Arts and Languages',
      abbr: 'SAL',
    },
  ],
  CAMV: [
    {
      text: ' School of Agriculture and Food Sciences',
      abbr: 'SAFC',
    },
    {
      text: 'School of Agricultural Engineering',
      abbr: 'SAE',
    },
    {
      text: ' School of Veterinary Medicine',
      abbr: 'SVM',
    },
    {
      text: ' School of Forestry, Biodiversity and Biological Sciences',
      abbr: 'SFBBS',
    },
  ],
  CE: [
    {
      text: ' School of Education',
      abbr: 'SEDU',
    },
    {
      text: 'School of Inclusive and Special Needs Education',
      abbr: 'SISE',
    },
    {
      text: ' School of Open and Distance Learning',
      abbr: 'SODL',
    },
  ],
  CMHS: [
    {
      text: 'School of Nursing and Midwifery',
      abbr: 'SNAM',
    },
    {
      text: 'School of Health Sciences',
      abbr: 'SHS',
    },
    {
      text: 'School of Dentistry',
      abbr: 'SDENT',
    },
    {
      text: 'School of Public Health',
      abbr: 'SPH',
    },
    {
      text: 'School of Medicine and Pharmacy',
      abbr: 'SMAP',
    },
  ],
};

export const departments: ILocationContainer = {
  '': [],
  // CMHS

  SNAM: [
    {
      text: ' General Nursing',
      abbr: 'GNUR',
    },
    {
      text: 'Midwifery',
      abbr: 'MIDW',
    },
    {
      text: 'Mental Health Nursing',
      abbr: 'MHN',
    },
  ],
  SMAP: [
    {
      text: ' General Medicine',
      abbr: 'GMED',
    },
    {
      text: 'Clinical Psychology',
      abbr: 'CLIP',
    },
    {
      text: 'Pharmacy',
      abbr: 'PHAR',
    },
  ],
  SPH: [
    {
      text: 'Human Nutrition and Dietetics',
      abbr: 'HND',
    },
    {
      text: 'Environmental Health Sciences',
      abbr: 'EHS',
    },
  ],
  SHS: [
    {
      text: 'Physiotherapy',
      abbr: 'PHYSIO',
    },
    {
      text: 'Anaesthesia',
      abbr: 'ANAE',
    },
    {
      text: 'Ophthalmology',
      abbr: 'OPHT',
    },
    {
      text: 'Prosthetics and Orthotics',
      abbr: 'PAO',
    },
    {
      text: 'Medical Imaging Sciences',
      abbr: 'MIS',
    },
    {
      text: 'Biomedical Laboratory Sciences',
      abbr: 'BLS',
    },
    {
      text: 'Clinical Medicine and Community Health',
      abbr: 'CMACH',
    },
    {
      text: 'Occupational Therapy',
      abbr: 'OCCT',
    },
  ],
  SDENT: [
    {
      text: 'Restorative and prosthetics',
      abbr: 'RAP',
    },
  ],

  // CAVM
  SFBBS: [
    {
      text: ' School of Forestry, Biodiversity and Biological Sciences',
      abbr: 'SFBBS',
    },
  ],
  SVM: [
    {
      text: 'Animal Production',
      abbr: 'AP',
    },
    {
      text: 'Veterinary Medicine',
      abbr: 'VM',
    },
  ],
  SAE: [
    {
      text: 'Agricultural Mechanization',
      abbr: 'AM',
    },
    {
      text: 'Irrigation and Drainagen',
      abbr: 'IAD',
    },
    {
      text: 'Forestry and Nature Conservation',
      abbr: 'FNC',
    },
  ],
  SAFC: [
    {
      text: 'Crop Sciences',
      abbr: 'CROS',
    },
    {
      text: 'Soil Sciences',
      abbr: 'SS',
    },
    {
      text: 'Agricultural Economics and Rural Development',
      abbr: 'AERD',
    },
  ],

  // CE
  SODL: [
    {
      text: 'Educational Studies',
      abbr: 'EDUS',
    },
    {
      text: 'African Virtual University Centre',
      abbr: 'AVUC',
    },
    {
      text: 'Pan African Tele-Education Network',
      abbr: 'PATN',
    },
  ],
  SISE: [
    {
      text: 'Special Needs Education Studies',
      abbr: 'SNES',
    },
    {
      text: 'Disability, Rehabilitation and Inclusion Studies',
      abbr: 'DRIS',
    },
  ],
  SEDU: [
    {
      text: 'Foundations, Management & Curriculum Studies',
      abbr: 'FMCS',
    },
    {
      text: 'Humanities and Language Education',
      abbr: 'HLE',
    },
    {
      text: 'Maths, Science and Physical Education',
      abbr: 'MSPE',
    },
    {
      text: 'Early Childhood&Primary Education',
      abbr: 'ECE',
    },
  ],
  // CBE
  SB: [
    {
      text: 'Business Information Technoloy',
      abbr: 'BIT',
    },
    {
      text: 'Finance',
      abbr: 'FIN',
    },
    {
      text: 'Accounting',
      abbr: 'ACC',
    },
    {
      text: 'Marketing and Human Resources',
      abbr: 'MHR',
    },
    {
      text: 'Banking and Insurance',
      abbr: 'BAI',
    },
    {
      text: 'Procurement, Logistics and Transport Management',
      abbr: 'PLTM',
    },
  ],
  SE: [
    {
      text: 'Economics',
      abbr: 'ECON',
    },

    {
      text: 'Applied Statistics',
      abbr: 'STATS',
    },
  ],

  // CASS
  SL: [
    {
      text: ' School of Law',
      abbr: 'SL',
    },
  ],
  SOG: [
    {
      text: 'Development Studies',
      abbr: 'DEVS',
    },
    {
      text: 'Governance and Pulic Administration',
      abbr: 'GPA',
    },
    {
      text: 'History and Heritage Studies',
      abbr: 'HHS',
    },
    {
      text: 'Political Science and International Relations',
      abbr: 'PSIR',
    },
    {
      text: 'Social and Military Sciences ',
      abbr: 'SAMS',
    },
    {
      text: 'Social Sciences ',
      abbr: 'SOCS',
    },
  ],
  SJC: [
    {
      text: 'School of Journalism and Communication',
      abbr: 'SJC',
    },
  ],
  SAL: [
    {
      text: 'Modern Languages',
      abbr: 'ML',
    },
  ],

  // CST
  ENG: [
    {
      text: 'Electrical and Electronics Engineering',
      abbr: 'EEE',
    },
    {
      text: 'Transportation Engineering',
      abbr: 'TRANS',
    },
    {
      text: 'Surveying and Geomatics Engineering',
      abbr: 'SGE',
    },
    {
      text: 'Mechanical Engineering',
      abbr: 'ME',
    },
    {
      text: 'Civil Engineering',
      abbr: 'CIV',
    },
  ],
  SABE: [
    {
      text: 'CONSTRUCTION MANAGEMENT ',
      abbr: 'CMAN',
    },
    {
      text: ' ESTATE MANAGEMENT AND VALUATION',
      abbr: 'EMV',
    },
    {
      text: ' GEOGRAPHY AND URBAN PLANNING',
      abbr: 'GUP',
    },
    {
      text: ' ARCHITECTURE',
      abbr: 'ARC',
    },
  ],
  SICT: [
    {
      text: 'COMPUTER AND SOFTWARE ENGINEERING ',
      abbr: 'CSE',
    },
    {
      text: 'INFORMATION TECHNOLOGY',
      abbr: 'IT',
    },
    {
      text: 'INFORMATION SYSTEMS',
      abbr: 'IS',
    },
    {
      text: 'COMPUTER SCIENCE',
      abbr: 'CS',
    },
  ],
  SCI: [
    {
      text: 'Biology',
      abbr: 'BIO',
    },
    {
      text: 'Chemistry',
      abbr: 'CHEM',
    },
    {
      text: 'Mathematics',
      abbr: 'MATH',
    },
    {
      text: 'Physics',
      abbr: 'PHY',
    },
  ],
};

export const combinations: ILocationContainer = {
  '': [],

  // SNAM
  GNUR: [
    {
      text: ' General Nursing',
      abbr: 'GNUR',
    },
  ],
  MIDW: [
    {
      text: 'Midwifery',
      abbr: 'MIDW',
    },
  ],
  MHN: [
    {
      text: 'Mental Health Nursing',
      abbr: 'MHN',
    },
  ],
  // SNAM END

  // SMAP
  GMED: [
    {
      text: ' General Medicine',
      abbr: 'GMED',
    },
  ],
  CLIP: [
    {
      text: 'Clinical Psychology',
      abbr: 'CLIP',
    },
  ],
  PHAR: [
    {
      text: 'Pharmacy',
      abbr: 'PHAR',
    },
  ],
  // SMAP END

  // SPH
  ND: [
    {
      text: 'Human Nutrition and Dietetics',
      abbr: 'HND',
    },
  ],
  EHS: [
    {
      text: 'Environmental Health Sciences',
      abbr: 'EHS',
    },
  ],
  // SPH END

  // SHS
  PHYSIO: [
    {
      text: 'Physiotherapy',
      abbr: 'PHYSIO',
    },
  ],
  ANAE: [
    {
      text: 'Anaesthesia',
      abbr: 'ANAE',
    },
  ],
  OPHT: [
    {
      text: 'Ophthalmology',
      abbr: 'OPHT',
    },
  ],
  PAO: [
    {
      text: 'Prosthetics and Orthotics',
      abbr: 'PAO',
    },
  ],
  MIS: [
    {
      text: 'Medical Imaging Sciences',
      abbr: 'MIS',
    },
  ],
  BLS: [
    {
      text: 'Biomedical Laboratory Sciences',
      abbr: 'BLS',
    },
  ],
  CMACH: [
    {
      text: 'Clinical Medicine and Community Health',
      abbr: 'CMACH',
    },
  ],
  OCCT: [
    {
      text: 'Occupational Therapy',
      abbr: 'OCCT',
    },
  ],
  // SHS END

  // SDENT
  RAP: [
    {
      text: 'Restorative and prosthetics',
      abbr: 'RAP',
    },
  ],
  // SDENT END

  // ENG
  EEE: [
    {
      text: 'Electrical Power Engineering',
      abbr: 'EPE',
    },
    {
      text: 'Electronics and Telecommunication Engineering',
      abbr: 'ETE',
    },
  ],
  CIV: [
    {
      text: 'CIV - Structural Engineering',
      abbr: 'CIV-SE',
    },
    {
      text: 'CIV - Water Resource Engineering',
      abbr: 'CIV-WE',
    },
    {
      text: 'CIV - Construction Engineering',
      abbr: 'CIV-CE',
    },
    {
      text: 'CIV - Environmental Engineering',
      abbr: 'CIV-EE',
    },
    {
      text: 'CIV - Geotechnical Engineering',
      abbr: 'CIV-GE',
    },
  ],
  TRANS: [
    {
      text: 'Transportation Engineering',
      abbr: 'TRA-ENG',
    },
  ],
  SGE: [
    {
      text: 'Surveying and Geomatics Engineering',
      abbr: 'SGE',
    },
  ],
  ME: [
    {
      text: 'Production Engineering',
      abbr: 'PRO-ENG',
    },
    {
      text: 'Plant Engineering',
      abbr: 'PLANT',
    },
    {
      text: 'Energy Engineering',
      abbr: 'ENE',
    },
  ],
  // ENG END

  // SODL
  EDUS: [
    {
      text: 'Educational Studies',
      abbr: 'EDUS',
    },
  ],
  AVUC: [
    {
      text: 'African Virtual University Centre',
      abbr: 'AVUC',
    },
  ],
  PATN: [
    {
      text: 'Pan African Tele-Education Network',
      abbr: 'PATN',
    },
  ],
  //SODL END

  // SISE
  SNES: [
    {
      text: 'Special Needs Education Studies',
      abbr: 'SNES',
    },
  ],
  DRIS: [
    {
      text: 'Disability, Rehabilitation and Inclusion Studies',
      abbr: 'DRIS',
    },
  ],
  // SISE END

  // SEDU
  FMCS: [
    {
      text: 'Foundations, Management & Curriculum Studies',
      abbr: 'FMCS',
    },
  ],
  HLE: [
    {
      text: 'Humanities and Language Education',
      abbr: 'HLE',
    },
  ],
  MSPE: [
    {
      text: 'Maths, Science and Physical Education',
      abbr: 'MSPE',
    },
  ],
  ECE: [
    {
      text: 'Early Childhood&Primary Education',
      abbr: 'ECE',
    },
  ],
  // SEDU END

  // SB
  BIT: [
    {
      text: 'Business Information Technoloy',
      abbr: 'BIT',
    },
  ],
  FIN: [
    {
      text: 'Finance',
      abbr: 'FIN',
    },
  ],
  ACC: [
    {
      text: 'Accounting',
      abbr: 'ACC',
    },
  ],
  MHR: [
    {
      text: 'Marketing and Human Resources',
      abbr: 'MHR',
    },
  ],
  BAI: [
    {
      text: 'Banking and Insurance',
      abbr: 'BAI',
    },
  ],
  PLTM: [
    {
      text: 'Procurement, Logistics and Transport Management',
      abbr: 'PLTM',
    },
  ],
  // SB END

  // SE
  ECON: [
    {
      text: 'Economics',
      abbr: 'ECON',
    },
  ],
  STATS: [
    {
      text: 'Applied Statistics',
      abbr: 'STATS',
    },
  ],
  // SE END

  // SAL
  ML: [
    {
      text: 'Translation and Interpreting',
      abbr: 'TAI',
    },

    {
      text: 'Arts and Publishing',
      abbr: 'AAP',
    },
    {
      text: 'Literature and Linguistics',
      abbr: 'LAL',
    },
    {
      text: 'Arts and Creative Industry',
      abbr: 'ACI',
    },
  ],
  // SAL END

  // SOG
  DEVS: [
    {
      text: 'Development Studies',
      abbr: 'DEVS',
    },
  ],
  GPA: [
    {
      text: 'Governance and Pulic Administration',
      abbr: 'GPA',
    },
  ],
  HHS: [
    {
      text: 'History and Heritage Studies',
      abbr: 'HHS',
    },
  ],
  PSIR: [
    {
      text: 'Political Science and International Relations',
      abbr: 'PSIR',
    },
  ],
  SAMS: [
    {
      text: 'Social and Military Sciences ',
      abbr: 'SAMS',
    },
  ],
  SOCS: [
    {
      text: 'Social Sciences ',
      abbr: 'SOCS',
    },
  ],
  // SOG END

  SL: [
    {
      text: ' School of Law',
      abbr: 'SL',
    },
  ],

  SJC: [
    {
      text: 'School of Journalism and Communication',
      abbr: 'SJC',
    },
  ],

  // SAFC
  CROS: [
    {
      text: 'Crop Sciences',
      abbr: 'CROS',
    },
  ],
  SS: [
    {
      text: 'Soil Sciences',
      abbr: 'SS',
    },
  ],
  AERD: [
    {
      text: 'Agricultural Economics and Rural Development',
      abbr: 'AERD',
    },
  ],
  // SAFC END

  // SAE
  AM: [
    {
      text: 'Agricultural Mechanization',
      abbr: 'AM',
    },
  ],
  IAD: [
    {
      text: 'Irrigation and Drainagen',
      abbr: 'IAD',
    },
  ],
  FNC: [
    {
      text: 'Forestry and Nature Conservation',
      abbr: 'FNC',
    },
  ],
  // SAE END

  // SVM
  AP: [
    {
      text: 'Animal Production',
      abbr: 'AP',
    },
  ],
  VM: [
    {
      text: 'Veterinary Medicine',
      abbr: 'VM',
    },
  ],
  // SVM END

  SFBBS: [
    {
      text: ' School of Forestry, Biodiversity and Biological Sciences',
      abbr: 'SFBBS',
    },
  ],

  // SCI
  BIO: [
    {
      text: 'Biology',
      abbr: 'BIO',
    },
  ],
  CHEM: [
    {
      text: 'Chemistry',
      abbr: 'CHEM',
    },
  ],
  MATH: [
    {
      text: 'Mathematics',
      abbr: 'MATH',
    },
  ],
  PHY: [
    {
      text: 'Physics',
      abbr: 'PHY',
    },
  ],
  // SCI END

  // SABE
  CMAN: [
    {
      text: 'CONSTRUCTION MANAGEMENT ',
      abbr: 'CMAN',
    },
  ],
  EMV: [
    {
      text: ' ESTATE MANAGEMENT AND VALUATION',
      abbr: 'EMV',
    },
  ],
  GUP: [
    {
      text: ' GEOGRAPHY AND URBAN PLANNING',
      abbr: 'GUP',
    },
  ],
  ARC: [
    {
      text: ' ARCHITECTURE',
      abbr: 'ARC',
    },
  ],
  // SABE END

  // SICT

  CSE: [
    {
      text: 'COMPUTER AND SOFTWARE ENGINEERING ',
      abbr: 'CSE',
    },
  ],
  IT: [
    {
      text: 'INFORMATION TECHNOLOGY',
      abbr: 'IT',
    },
  ],
  IS: [
    {
      text: 'INFORMATION SYSTEMS',
      abbr: 'IS',
    },
  ],
  CS: [
    {
      text: 'COMPUTER SCIENCE',
      abbr: 'CS',
    },
  ],
  // SICT END
};

export default {
  colleges,
  schools,
  departments,
  combinations,
};
