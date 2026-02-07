export interface User {
  id: number;
  username: string;
  hashedpassword: string;
}

export interface Set {
  reps: number;
}

export interface Exercise {
  exercisename: string;
  goaledsets?: number;
  goaledreps?: number;
  actualsets?: Set[];
}

export interface Routine {
  id: number;
  routinename: string;
  exercises: Exercise[];
  userId: number;
}

export interface Workout {
  id: number;
  routine: Routine;
  date: string; 
  exercises: Exercise[]; 
}