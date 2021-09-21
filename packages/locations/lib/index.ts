import { colleges } from './colleges';
import { schools } from './schools';
import { departments } from './departments';
import { combinations } from './combinations';

export const getColleges = (institution: string | undefined) =>
  colleges[institution || 'UR'];
export const getSchools = (college?: string) => {
  if (!college) {
    let allSchools: ILocation[] = [];
    for (const school in schools) {
      allSchools.concat(schools[school]);
    }
  } else return schools[college];
};

export { colleges, schools, departments, combinations };
