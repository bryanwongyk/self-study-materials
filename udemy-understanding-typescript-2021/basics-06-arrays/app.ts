// const person: {
//   name: string;
//   age: number;
// } = {

enum Role {
  ADMIN, READ_ONLY, AUTHOR
}

const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
  role_enum: {}
} = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: [2, 'author'],
  role_enum: Role.ADMIN
};

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  // console.log(hobby.map()); // !!! ERROR !!!
}
