export interface OnboardingData {
  gender: 'male' | 'female' | null;
  name: string;
  age: number;
  height: number;
  weight: number;
  focusAreas: string[];
  goal: string | null;
  goalDuration: string;
  fitnessLevel: string | null;
  hadProgram: boolean | null;
  weeklyDays: number;
  workoutLocation: string | null;
  preferredDays: string[];
  preferredTime: string | null;
  sessionDuration: string | null;
  dietDescription: string;
  mealsPerDay: number;
  dietTypes: string[];
  allergies: string;
  healthConditions: string[];
  medications: string;
  injuries: string;
  sleepHours: number;
  workNature: string | null;
  stressLevel: number;
  focusNotes: string;
  measurements: string;
  additionalNotes: string;
}

export const initialData: OnboardingData = {
  gender: null,
  name: '',
  age: 25,
  height: 170,
  weight: 75,
  focusAreas: [],
  goal: null,
  goalDuration: '',
  fitnessLevel: null,
  hadProgram: null,
  weeklyDays: 3,
  workoutLocation: null,
  preferredDays: [],
  preferredTime: null,
  sessionDuration: null,
  dietDescription: '',
  mealsPerDay: 3,
  dietTypes: [],
  allergies: '',
  healthConditions: [],
  medications: '',
  injuries: '',
  sleepHours: 8,
  workNature: null,
  stressLevel: 5,
  focusNotes: '',
  measurements: '',
  additionalNotes: '',
};
