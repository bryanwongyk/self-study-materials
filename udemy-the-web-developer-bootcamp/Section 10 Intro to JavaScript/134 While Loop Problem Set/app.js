var problem1 = -10;
var problem2 = 10;
var problem3 = 300;
var problem4 = 5;

//problem 1
console.log("Problem 1:");
while (problem1 <= 19){
    console.log(problem1);
    problem1++;
}

//problem 2
console.log("Problem 2:");
while (problem2<=40){
    if (problem2%2 === 0){
        console.log(problem2);   
    }
    problem2++;
}

//problem 3
console.log("Problem 3:");
while (problem3<=333){
    if (problem3%2 === 1){
        console.log(problem3);
    }
    problem3++;
}

//problem 4
console.log("Problem 4:");
while (problem4 <=50){
    if ((problem4%5 === 0) && (problem4%3 === 0)){
        console.log(problem4);
    }
    problem4++;
}