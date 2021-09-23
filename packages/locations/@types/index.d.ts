import { colleges } from './colleges';
import { schools } from './schools';
import { departments } from './departments';
import { combinations } from './combinations';
export declare const getColleges: (institution: string | undefined) => ILocation[];
export declare const getSchools: (college?: string | undefined) => ILocation[];
export { colleges, schools, departments, combinations };
