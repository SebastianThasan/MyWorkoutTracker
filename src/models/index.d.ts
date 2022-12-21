import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerGroup = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Group, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly groupName: string;
  readonly workoutsRelationship?: (Workout | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGroup = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Group, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly groupName: string;
  readonly workoutsRelationship: AsyncCollection<Workout>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Group = LazyLoading extends LazyLoadingDisabled ? EagerGroup : LazyGroup

export declare const Group: (new (init: ModelInit<Group>) => Group) & {
  copyOf(source: Group, mutator: (draft: MutableModel<Group>) => MutableModel<Group> | void): Group;
}

type EagerWorkout = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Workout, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly workoutName: string;
  readonly groupID: string;
  readonly setsRelationship?: (Set | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkout = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Workout, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly workoutName: string;
  readonly groupID: string;
  readonly setsRelationship: AsyncCollection<Set>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Workout = LazyLoading extends LazyLoadingDisabled ? EagerWorkout : LazyWorkout

export declare const Workout: (new (init: ModelInit<Workout>) => Workout) & {
  copyOf(source: Workout, mutator: (draft: MutableModel<Workout>) => MutableModel<Workout> | void): Workout;
}

type EagerSet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Set, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly setNumber: number;
  readonly weight: number;
  readonly reps: number;
  readonly workoutID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Set, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly setNumber: number;
  readonly weight: number;
  readonly reps: number;
  readonly workoutID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Set = LazyLoading extends LazyLoadingDisabled ? EagerSet : LazySet

export declare const Set: (new (init: ModelInit<Set>) => Set) & {
  copyOf(source: Set, mutator: (draft: MutableModel<Set>) => MutableModel<Set> | void): Set;
}