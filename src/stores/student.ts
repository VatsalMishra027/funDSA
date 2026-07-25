import { persistentAtom } from '@nanostores/persistent';

export interface StudentProfile {
  name: string;
  interests: string[];
  progress: Record<string, boolean>;
}

const defaultProfile: StudentProfile = {
  name: '',
  interests: [],
  progress: {},
};

export const studentStore = persistentAtom<StudentProfile>(
  'bubble_sort_student_profile_v1',
  defaultProfile,
  {
    encode: JSON.stringify,
    decode: (val) => {
      try {
        return JSON.parse(val);
      } catch (e) {
        return defaultProfile;
      }
    },
  }
);

export function setStudentName(name: string) {
  const current = studentStore.get();
  studentStore.set({ ...current, name });
}

export function setStudentInterests(interests: string[]) {
  const current = studentStore.get();
  studentStore.set({ ...current, interests });
}

export function toggleStudentInterest(interest: string) {
  const current = studentStore.get();
  const hasInterest = current.interests.includes(interest);
  const updatedInterests = hasInterest
    ? current.interests.filter((i) => i !== interest)
    : [...current.interests, interest];
  studentStore.set({ ...current, interests: updatedInterests });
}

export function markModuleComplete(moduleId: string) {
  const current = studentStore.get();
  studentStore.set({
    ...current,
    progress: {
      ...current.progress,
      [moduleId]: true,
    },
  });
}

export function resetStudentProfile() {
  studentStore.set(defaultProfile);
}
