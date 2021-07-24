'use strict';

exports.colleges = {
  UR: [
    {
      text: 'College of Science & Technology',
      abbr: 'CST',
      parent: 'UR',
    },
  ],
  '': [],
};

exports.schools = {
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
  ],
};

exports.departments = {
  '': [],
  SCI: [
    {
      text: 'Bio-Chemistry',
      abbr: 'BIO-CHEM',
    },
  ],
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
};

exports.combinations = {
  '': [],
  'BIO-CHEM': [
    {
      text: 'Bio-Chemistry',
      abbr: 'BIO-CHEM',
    },
  ],
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
};

module.exports = {
    colleges: this.colleges,
    schools: this.schools,
    departments: this.departments,
    combinations: this.combinations,
};
