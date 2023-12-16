// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives

let age: number;

age = 12;

let userName: string | string[];

userName = "Max";

let isInstructor: boolean;

isInstructor = true;

// More complex types

let hobbies: string[] | Array<string>;

hobbies = ["Sports", "Cooking"];

type Person = {
	name: string;
	age: number;
}; // type help us to create type definition.

let person: Person;

person = {
	name: "Max",
	age: 32,
};

// person = {
//   isEmployee: true
// };

let people: Person[];

// Type inference - if we declare value at same time of creating a variable then Typescript define type itself we don't need to give type ourself

let course: string | number = "React - The Complete Guide";

course = 12341;

// Functions & types

function add(a: number, b: number) {
	// is equivalent to
	// function add(a: number, b: number): number
	return a + b;
}

function printOutput(value: any) {
	// function print(): void
	// print is a predefine function in typescript so we need to use different function name
	console.log(value);
}

// Generics

function insertAtBeginning<T>(array: T[], value: T) {
	// Here 'T' is an generic type which is only accessible in this function.
	// Generic type help us to match same type in function.
	const newArray = [value, ...array];
	return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(["a", "b", "c"], "d");

// updatedArray[0].split('');
