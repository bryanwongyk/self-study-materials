console.log('Time to get started...');

function add(n1: number, n2: number, showResult: boolean, phrase: string) {
    if (showResult){
        const result = n1 + n2;
        console.log(phrase + result);
    } else {
        return n1 + n2
    }
}

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is: ';

// Object types
const person: {
	name: string;
	age: number;
} = {
	name: 'Max',
	age: 30
};

console.log(person);

// Array types
const person2 = {
	name: 'Max',
    age: 30,
    hobbies: ['Sports', 'Cooking']
};

let favouriteActivities: string[];
favouriteActivities = ['Sports']

add(number1, number2, printResult, resultPhrase);