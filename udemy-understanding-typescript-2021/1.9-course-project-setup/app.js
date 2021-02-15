console.log('Time to get started...');
function add(n1, n2, showResult, phrase) {
    if (showResult) {
        var result = n1 + n2;
        console.log(phrase + result);
    }
    else {
        return n1 + n2;
    }
}
var number1 = 5;
var number2 = 2.8;
var printResult = true;
var resultPhrase = 'Result is: ';
var person = {
    name: 'Max',
    age: 30
};
console.log(person);
add(number1, number2, printResult, resultPhrase);
