const readline = require('readline');
let setA, setB, choice;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//main Menu
function mainMenu(){
  console.log("\nSelect an option (1-9):\n");
  console.log("1. Set Operations");
  console.log("2. Relation & Function Tools");
  console.log("3. Matrix Operations");
  console.log("4. Number Theory Algorithms");
  console.log("5. Proof Assistant");
  console.log("6. Counting and Probability Simulator");
  console.log("7. Digital Logic Circuit Simulator");
  console.log("8. Algorithmic Suite");
  console.log("9. Exit\n");

  rl.question("\nEnter your choice: ", (choice) => {
    let selectedOption = parseInt(choice.trim());
    switch (selectedOption) {
      case 1: 
        setOperations();
        break;
      case 2:
        relationFunctionTools();
        break;
      case 3:
        matrixOperations();
        break;  
      case 4:
        numberTheoryAlgorithms();
        break;
      case 5:
        proofAssistant();
        break;
      case 6:
        countingProbabilitySimulator();
        break;
      case 7:
        digitalLogicCircuitSimulator();
        break;
      case 8:
        algorithmicSuite();
        break;
      case 9:
        console.log("Exiting program.");
        rl.close(); //exit the program
        break;
      default:
        console.log("Invalid choice. Please select a valid option.");
        mainMenu(); //prompt the user again
        break;
    }
  });
}

function setOperations(){
    console.log("\n--- Set Operations ---");
    rl.question("Enter elements of Set A (comma separated): ", (inputA) => {
      setA = new Set(inputA.split(',').map(item => item.trim()));
    rl.question("Enter elements of Set B (comma separated): ", (inputB) => {
      setB = new Set(inputB.split(',').map(item => item.trim()));
  
        //perform set operations
        const union = new Set([...setA, ...setB]);
        const intersection = new Set([...setA].filter(x => setB.has(x)));
        const differenceA_B = new Set([...setA].filter(x => !setB.has(x)));
        const differenceB_A = new Set([...setB].filter(x => !setA.has(x)));
  
        //results
        console.log("\nSet A:", [...setA]);
        console.log("Set B:", [...setB]);
        console.log("\nSet Operations Results:");
        console.log("Union (A ∪ B):", [...union]);
        console.log("Intersection (A ∩ B):", [...intersection]);
        console.log("Difference (A - B):", [...differenceA_B]);
        console.log("Difference (B - A):", [...differenceB_A]);
        mainMenu();  //to back to menu
      });
    });
  }


  function relationFunctionTools(){
    console.log("\n--- Relation & Function Tools ---");
    rl.question("Enter a set of ordered pairs (e.g., (1,2) (2,3) (3,4)): ", (input) => {
      let relation = input.match(/\(\d+,\d+\)/g); // Extract ordered pairs
      if (!relation){
        console.log("Invalid input format. Try again.");
        return relationFunctionTools();
      }
  
      relation = relation.map(pair => pair.replace(/[()]/g, "").split(",").map(Number)); //convert to array of tuples
      console.log("Relation:", relation);
  
      let domain = [...new Set(relation.map(pair => pair[0]))];
      let range = [...new Set(relation.map(pair => pair[1]))];
      console.log("Domain:", domain);
      console.log("Range:", range);
  
      //check relation properties
      checkEmptyRelation(relation);
      checkUniversalRelation(relation, domain);
      checkIdentityRelation(relation, domain);
      checkInverseRelation(relation);
      checkReflexive(relation, domain);
      checkSymmetric(relation);
      checkTransitive(relation);
      mainMenu();
    });
  }
  
  //check if a relation is empty
  function checkEmptyRelation(relation){
    console.log("Empty Relation:", relation.length === 0 ? "Yes" : "No");
  }
  //check if a relation is universal (contains all possible pairs)
  function checkUniversalRelation(relation, domain){
    let allPairs = [];
    domain.forEach(x => {
      domain.forEach(y => {
        allPairs.push([x, y]);
      });
    });
    let isUniversal = allPairs.every(pair => relation.some(r => r[0] === pair[0] && r[1] === pair[1]));
    console.log("Universal Relation:", isUniversal ? "Yes" : "No");
  }
  //check if a relation is an identity relation (only pairs of form (x, x))
  function checkIdentityRelation(relation, domain){
    let identityPairs = domain.map(x => [x, x]);
    let isIdentity = relation.every(pair => identityPairs.some(r => r[0] === pair[0] && r[1] === pair[1]));
    console.log("Identity Relation:", isIdentity ? "Yes" : "No");
  }
  //find the inverse of a relation (swap each (a, b) to (b, a))
  function checkInverseRelation(relation) {
    let inverse = relation.map(([a, b]) => [b, a]);
    console.log("Inverse Relation:", inverse);
  }
  //check if a relation is reflexive
  function checkReflexive(relation, domain){
    let reflexivePairs = domain.map(x => [x, x]);
    let isReflexive = reflexivePairs.every(pair => relation.some(r => r[0] === pair[0] && r[1] === pair[1]));
    console.log("Reflexive Relation:", isReflexive ? "Yes" : "No");
  }
  //check if a relation is symmetric
  function checkSymmetric(relation){
    let isSymmetric = relation.every(([a, b]) => a === b || relation.some(([x, y]) => x === b && y === a));
    console.log("Symmetric Relation:", isSymmetric ? "Yes" : "No");
  }
  //check if a relation is transitive
  function checkTransitive(relation){
    let isTransitive = true;
    for (let [a, b] of relation) {
      for (let [c, d] of relation) {
        if (b === c && !relation.some(([x, y]) => x === a && y === d)){
          isTransitive = false;
          break;
        }
      }
    }
    console.log("Transitive Relation:", isTransitive ? "Yes" : "No");
  }


function matrixOperations(){
    console.log("\n--- Matrix Operations ---");
    console.log("1. Addition");
    console.log("2. Subtraction");
    console.log("3. Multiplication");
    console.log("4. Solve Linear Equations");
  
    rl.question("Select a matrix operation (1-5): ", (choice) => {
      let operation = parseInt(choice.trim());
  
      switch (operation) {
        case 1:
        case 2:
        case 3:
            inputTwoMatrices(operation);
            break;
        case 4:
            solveLinearEquations();
            break;
        default:
            console.log("Invalid choice. Returning to main menu.");
            mainMenu();
      }
    });
  }
  
  //solve linear equations using Gaussian elimination
  function solveLinearEquations(){
    rl.question("Enter number of equations (n x n system): ", (n) => {
      let size = parseInt(n.trim());
      
      if (!size || size <= 0) {
        console.log("Invalid input. Returning to menu.");
        return matrixOperations();
      }
  
      console.log(`Enter the ${size}x${size} coefficient matrix (A) row by row:`);
      readMatrix(size, size, (A) => {
        console.log(`Enter the ${size}x1 constant matrix (B) row by row:`);
        readMatrix(size, 1, (B) => {
          let solution = gaussianElimination(A, B);
          if (solution){
            console.log("Solution:", solution);
          }else{
            console.log("No unique solution found.");
          }
          mainMenu();
        });
      });
    });
  }
  //gaussian Elimination for solving AX = B
  function gaussianElimination(A, B){
    let n = A.length;
    let augmentedMatrix = A.map((row, i) => [...row, B[i][0]]);
  
    //forward Elimination
    for (let i = 0; i < n; i++){
      //find the pivot row and swap
      let maxRow = i;
      for (let k = i + 1; k < n; k++){
        if (Math.abs(augmentedMatrix[k][i]) > Math.abs(augmentedMatrix[maxRow][i])){
          maxRow = k;
        }
      }
      [augmentedMatrix[i], augmentedMatrix[maxRow]] = [augmentedMatrix[maxRow], augmentedMatrix[i]];
      //make leading coefficient 1
      let pivot = augmentedMatrix[i][i];
      if (pivot === 0) return null; //no unique solution
      for (let j = i; j <= n; j++){
        augmentedMatrix[i][j] /= pivot;
      }
      //make other rows leading coefficients 0
      for (let k = 0; k < n; k++){
        if (k !== i){
          let factor = augmentedMatrix[k][i];
          for (let j = i; j <= n; j++) {
            augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
          }
        }
      }
    }
    //extract solution
    return augmentedMatrix.map(row => row[n]);
  }
  //input for operations that require two matrices
  function inputTwoMatrices(operation){
    rl.question("Enter rows and columns (e.g., 2 2 for 2x2): ", (size) =>{
      let [rows, cols] = size.trim().split(" ").map(Number);
      
      if (!rows || !cols){
        console.log("Invalid input. Returning to menu.");
        return matrixOperations();
      }
      console.log(`Enter first ${rows}x${cols} matrix row by row:`);
      readMatrix(rows, cols, (matrixA) => {
        console.log(`Enter second ${rows}x${cols} matrix row by row:`);
        readMatrix(rows, cols, (matrixB) => {
          switch (operation) {
            case 1:
              console.log("Result (Addition):", addMatrices(matrixA, matrixB));
              break;
            case 2:
              console.log("Result (Subtraction):", subtractMatrices(matrixA, matrixB));
              break;
            case 3:
              console.log("Result (Multiplication):", multiplyMatrices(matrixA, matrixB));
              break;
          }
          mainMenu();
        });
      });
    });
  }
  //function to read a matrix from user input
  function readMatrix(rows, cols, callback){
    let matrix = [];
    let rowIndex = 0;
  
    function readRow(){
      if (rowIndex < rows){
        rl.question(`Row ${rowIndex + 1}: `, (row) => {
          let values = row.trim().split(" ").map(Number);
          if (values.length !== cols) {
            console.log(`Invalid row. Enter exactly ${cols} numbers.`);
            return readRow();
          }
          matrix.push(values);
          rowIndex++;
          readRow();
        });
      }else{
        callback(matrix);
      }
    }
    readRow();
  }


  function numberTheoryAlgorithms(){
    console.log("\n--- Number Theory Algorithms ---");
    console.log("1. Compute GCD");
    console.log("2. Compute LCM");
    console.log("3. Modular Exponentiation");
    console.log("4. Check Prime Number");
    console.log("5. Factorization");
    console.log("6. Compute Modular Inverse");
  
    rl.question("Select an option (1-6): ", (choice) => {
      let option = parseInt(choice.trim());
  
      switch (option){
        case 1:
          computeGCD();
          break;
        case 2:
          computeLCM();
          break;
        case 3:
          modularExponentiation();
          break;
        case 4:
          checkPrime();
          break;
        case 5:
          factorization();
          break;
        case 6:
          modularInverse();
          break;
        default:
          console.log("Invalid choice. Returning to main menu.");
          mainMenu();
      }
    });
  }
  //compute GCD using euclidean algo
  function computeGCD(){
    rl.question("Enter two numbers (e.g., 56 98): ", (input) => {
      let [a, b] = input.trim().split(" ").map(Number);
      if (!a || !b) {
        console.log("Invalid input. Try again.");
        return computeGCD();
      }
      console.log(`GCD(${a}, ${b}) = ${gcd(a, b)}`);
      mainMenu();
    });
  }
  
  function gcd(a, b){
    return b === 0 ? a : gcd(b, a % b);
  }
  //compute LCM
  function computeLCM(){
    rl.question("Enter two numbers (e.g., 12 15): ", (input) => {
      let [a, b] = input.trim().split(" ").map(Number);
      if (!a || !b) {
        console.log("Invalid input. Try again.");
        return computeLCM();
      }
      console.log(`LCM(${a}, ${b}) = ${Math.abs(a * b) / gcd(a, b)}`);
      mainMenu();
    });
  }
  
  //modular exponentiation
  function modularExponentiation(){
    rl.question("Enter base, exponent, and modulus (e.g., 2 10 1000): ", (input) => {
      let [base, exp, mod] = input.trim().split(" ").map(Number);
      if (!base || !exp || !mod){
        console.log("Invalid input. Try again.");
        return modularExponentiation();
      }
      console.log(`(${base}^${exp}) mod ${mod} = ${modExp(base, exp, mod)}`);
      mainMenu();
    });
  }
  
  function modExp(base, exp, mod){
    let result = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) result = (result * base) % mod;
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return result;
  }
  //check if a number is prime
  function checkPrime(){
    rl.question("Enter a number to check: ", (num) => {
      num = parseInt(num.trim());
      if (num <= 1) {
        console.log(`${num} is not a prime number.`);
        return mainMenu();
      }
      console.log(`${num} is ${isPrime(num) ? "a prime" : "not a prime"} number.`);
      mainMenu();
    });
  }
  
  function isPrime(n){
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }
  //factorization
  function factorization(){
    rl.question("Enter a number to factorize: ", (num) => {
      num = parseInt(num.trim());
      console.log(`Factors of ${num}: ${getFactors(num).join(", ")}`);
      mainMenu();
    });
  }
  
  function getFactors(n){
    let factors = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        factors.push(i);
        if (i !== n / i) factors.push(n / i);
      }
    }
    return factors.sort((a, b) => a - b);
  }
  
  //compute modular inverse 
  function modularInverse(){
    rl.question("Enter a and m (for ax ≡ 1 mod m): ", (input) => {
      let [a, m] = input.trim().split(" ").map(Number);
      let inv = modInverse(a, m);
      console.log(inv === -1 ? "No modular inverse exists." : `Modular Inverse: ${inv}`);
      mainMenu();
    });
  }
  
  function modInverse(a, m){
    let [gcd, x] = extendedGCD(a, m);
    return gcd === 1 ? ((x % m + m) % m) : -1;
  }
  
  function extendedGCD(a, b){
    if (b === 0) return [a, 1, 0];
    let [gcd, x1, y1] = extendedGCD(b, a % b);
    return [gcd, y1, x1 - Math.floor(a / b) * y1];
  }

  function proofAssistant(){
    console.log("\n--- Proof Assistant ---");
    console.log("1. Direct Proof");
    console.log("2. Proof by Contrapositive");
    console.log("3. Proof by Contradiction");
    console.log("4. Proof by Induction");
    console.log("5. Enter a Statement for Proof");
  
    rl.question("Select an option (1-5): ", (choice) => {
      let option = parseInt(choice.trim());
  
      switch (option){
        case 1:
          directProof();
          break;
        case 2:
          contrapositiveProof();
          break;
        case 3:
          contradictionProof();
          break;
        case 4:
          inductionProof();
          break;
        case 5:
          userDefinedProof();
          break;
        default:
          console.log("Invalid choice. Returning to main menu.");
          mainMenu();
      }
    });
  }
  
  //user input for proof steps
  function userDefinedProof(){
    rl.question("\nEnter a mathematical statement to prove or disprove: ", (statement) => {
      statement = statement.trim().toLowerCase();
  
      console.log(`\nAnalyzing statement: "${statement}"`);
      
      //check for keywords and suggest proof techniques
      if (statement.includes("even") && statement.includes("squared")){
        console.log("\nSuggestion: Use **Direct Proof**.");
        console.log("If n is even, then n can be written as 2k. Squaring both sides gives (2k)^2 = 4k^2, which is even.");
      } 
      else if (statement.includes("odd") && statement.includes("squared")){
        console.log("\nSuggestion: Use **Contrapositive Proof**.");
        console.log("Prove: If n² is odd, then n must be odd. Assume n is even, then n² is even, contradicting the assumption.");
      } 
      else if (statement.includes("√2") || statement.includes("irrational")){
        console.log("\nSuggestion: Use **Proof by Contradiction**.");
        console.log("Assume √2 is rational (p/q form), show that both p and q must be even, contradicting their coprimeness.");
      } 
      else if (statement.includes("sum of first") || statement.includes("n natural numbers")){
        console.log("\nSuggestion: Use **Mathematical Induction**.");
        console.log("Prove base case (n=1), assume true for n=k, and prove for n=k+1 using S(k+1) = S(k) + (k+1).");
      }else{
        console.log("\nUnable to determine an automatic proof method.");
        console.log("Consider using **Direct Proof, Contrapositive Proof, Contradiction, or Induction** based on the structure.");
      }
      mainMenu();
    });
  }


  function countingProbabilitySimulator(){
    console.log("\n--- Counting and Probability Simulator ---");
    console.log("1. Factorial (n!)");
    console.log("2. Permutations (nPr)");
    console.log("3. Combinations (nCr)");
    console.log("4. Probability Simulation (Dice, Coin, Cards)");
  
    rl.question("Select an option (1-4): ", (choice) => {
      let option = parseInt(choice.trim());
  
      if (isNaN(option) || option < 1 || option > 4){
        console.log("Invalid choice. Please enter a number between 1 and 4.");
        return countingProbabilitySimulator(); //retry input
      }
  
      switch (option){
        case 1:
          factorialCalculation();
          break;
        case 2:
          permutationCalculation();
          break;
        case 3:
          combinationCalculation();
          break;
        case 4:
          probabilitySimulation();
          break;
      }
    });
  }
  
  //factorial calcu n!
  function factorialCalculation(){
    rl.question("Enter a number (n): ", (input) => {
      let n = parseInt(input.trim());
  
      if (isNaN(n) || n < 0) {
        console.log("Invalid input! Please enter a non-negative integer.");
        return factorialCalculation(); 
      }
  
      let result = factorial(n);
      console.log(`Factorial of ${n} (n!) = ${result}`);
      mainMenu();
    });
  }
  
  //permutations calcu nPr
  function permutationCalculation(){
    rl.question("Enter n: ", (inputN) => {
      rl.question("Enter r: ", (inputR) => {
        let n = parseInt(inputN.trim());
        let r = parseInt(inputR.trim());
  
        if (isNaN(n) || isNaN(r) || r > n || n < 0 || r < 0) {
          console.log("Invalid input! Ensure n ≥ r ≥ 0.");
          return permutationCalculation(); 
        }
  
        let perm = factorial(n) / factorial(n - r);
        console.log(`Permutations (nPr) = ${perm}`);
        mainMenu();
      });
    });
  }
  
  //combinations calcu nCr
  function combinationCalculation(){
    rl.question("Enter n: ", (inputN) => {
      rl.question("Enter r: ", (inputR) => {
        let n = parseInt(inputN.trim());
        let r = parseInt(inputR.trim());
  
        if (isNaN(n) || isNaN(r) || r > n || n < 0 || r < 0){
          console.log("Invalid input! Ensure n ≥ r ≥ 0.");
          return combinationCalculation(); 
        }
  
        let comb = factorial(n) / (factorial(r) * factorial(n - r));
        console.log(`Combinations (nCr) = ${comb}`);
        mainMenu();
      });
    });
  }
  
  //probability simulation
  function probabilitySimulation(){
    console.log("\n--- Probability Simulation ---");
    console.log("1. Roll a Dice");
    console.log("2. Flip a Coin");
    console.log("3. Draw a Random Card");
  
    rl.question("Select an option (1-3): ", (choice) => {
      let option = parseInt(choice.trim());
  
      if (isNaN(option) || option < 1 || option > 3){
        console.log("Invalid choice. Please enter a number between 1 and 3.");
        return probabilitySimulation(); // Retry input
      }
  
      switch (option){
        case 1:
          console.log(`You rolled a ${Math.floor(Math.random() * 6) + 1}! 🎲`);
          break;
        case 2:
          console.log(`Coin flip result: ${Math.random() < 0.5 ? "Heads" : "Tails"}! 🪙`);
          break;
        case 3:
          let suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
          let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
          let card = `${ranks[Math.floor(Math.random() * ranks.length)]} of ${suits[Math.floor(Math.random() * suits.length)]}`;
          console.log(`You drew the ${card} 🃏`);
          break;
      }
      mainMenu();
    });
  }
  
  //factorial function
  function factorial(num){
    if (num === 0 || num === 1) return 1;
    return num * factorial(num - 1);
  }

  function digitalLogicCircuitSimulator(){
    console.log("\n--- Digital Logic Circuit Simulator ---");
    console.log("1. AND Gate");
    console.log("2. OR Gate");
    console.log("3. NOT Gate");
    console.log("4. XOR Gate");
    console.log("5. NAND Gate");
    console.log("6. NOR Gate");
  
    rl.question("Select an option (1-6): ", (choice) => {
      let option = parseInt(choice.trim());
  
      if (isNaN(option) || option < 1 || option > 6) {
        console.log("Invalid choice. Please enter a number between 1 and 6.");
        return digitalLogicCircuitSimulator(); // Retry input
      }
  
      switch (option){
        case 1:
          andGate();
          break;
        case 2:
          orGate();
          break;
        case 3:
          notGate();
          break;
        case 4:
          xorGate();
          break;
        case 5:
          nandGate();
          break;
        case 6:
          norGate();
          break;
      }
    });
  }
  //AND gate
  function andGate(){
    rl.question("Enter value for A (0 or 1): ", (a) => {
      rl.question("Enter value for B (0 or 1): ", (b) => {
        a = parseInt(a.trim());
        b = parseInt(b.trim());
  
        if ((a !== 0 && a !== 1) || (b !== 0 && b !== 1)){
          console.log("Invalid input! Enter only 0 or 1.");
          return andGate(); 
        }
  
        let result = a & b;
        console.log(`A AND B = ${result}`);
        mainMenu();
      });
    });
  }
  //OR gate
  function orGate(){
    rl.question("Enter value for A (0 or 1): ", (a) => {
      rl.question("Enter value for B (0 or 1): ", (b) => {
        a = parseInt(a.trim());
        b = parseInt(b.trim());
  
        if ((a !== 0 && a !== 1) || (b !== 0 && b !== 1)){
          console.log("Invalid input! Enter only 0 or 1.");
          return orGate(); 
        }
  
        let result = a | b;
        console.log(`A OR B = ${result}`);
        mainMenu();
      });
    });
  }
  //NOT gate
  function notGate(){
    rl.question("Enter value for A (0 or 1): ", (a) => {
      a = parseInt(a.trim());
  
      if (a !== 0 && a !== 1) {
        console.log("Invalid input! Enter only 0 or 1.");
        return notGate();
      }
  
      let result = ~a & 1; //convert to 0 or 1
      console.log(`NOT A = ${result}`);
      mainMenu();
    });
  }
  //XOR gate
  function xorGate(){
    rl.question("Enter value for A (0 or 1): ", (a) => {
      rl.question("Enter value for B (0 or 1): ", (b) => {
        a = parseInt(a.trim());
        b = parseInt(b.trim());
  
        if ((a !== 0 && a !== 1) || (b !== 0 && b !== 1)){
          console.log("Invalid input! Enter only 0 or 1.");
          return xorGate(); 
        }
  
        let result = a ^ b;
        console.log(`A XOR B = ${result}`);
        mainMenu();
      });
    });
  }
  //NAND gate
  function nandGate(){
    rl.question("Enter value for A (0 or 1): ", (a) => {
      rl.question("Enter value for B (0 or 1): ", (b) => {
        a = parseInt(a.trim());
        b = parseInt(b.trim());
  
        if ((a !== 0 && a !== 1) || (b !== 0 && b !== 1)) {
          console.log("Invalid input! Enter only 0 or 1.");
          return nandGate(); // Retry input
        }
  
        let result = !(a & b) ? 1 : 0;
        console.log(`A NAND B = ${result}`);
        mainMenu();
      });
    });
  }
  //NOR gate
  function norGate(){
    rl.question("Enter value for A (0 or 1): ", (a) => {
      rl.question("Enter value for B (0 or 1): ", (b) => {
        a = parseInt(a.trim());
        b = parseInt(b.trim());
  
        if ((a !== 0 && a !== 1) || (b !== 0 && b !== 1)){
          console.log("Invalid input! Enter only 0 or 1.");
          return norGate(); // Retry input
        }
  
        let result = !(a | b) ? 1 : 0;
        console.log(`A NOR B = ${result}`);
        mainMenu();
      });
    });
  }


function algorithmicSuite(){
    console.log("\n--- Algorithmic Suite ---");
    console.log("1. Sorting Algorithms");
    console.log("2. Graph Algorithms");
    console.log("3. Other Algorithms");
  
    rl.question("Select an option (1-3): ", (choice) => {
      let option = parseInt(choice.trim());
  
      if (isNaN(option) || option < 1 || option > 3) {
        console.log("Invalid choice. Please enter a number between 1 and 3.");
        return algorithmicSuite(); 
      }
  
      switch (option) {
        case 1:
          sortingAlgorithms();
          break;
        case 2:
          graphAlgorithms();
          break;
        case 3:
          otherAlgorithms();
          break;
      }
    });
  }
  //sorting algo
  function sortingAlgorithms(){
    console.log("\n--- Sorting Algorithms ---");
    console.log("1. Bubble Sort");
    console.log("2. Selection Sort");
    console.log("3. Merge Sort");
  
    rl.question("Select an option (1-3): ", (choice) => {
      let option = parseInt(choice.trim());
  
      if (isNaN(option) || option < 1 || option > 3) {
        console.log("Invalid choice. Please enter a number between 1 and 3.");
        return sortingAlgorithms(); 
      }
  
      rl.question("Enter a list of numbers separated by commas: ", (input) => {
        let arr = input.split(",").map(item => parseInt(item.trim()));
  
        if (arr.some(isNaN)) {
          console.log("Invalid input. Please enter only numbers.");
          return sortingAlgorithms(); 
        }
  
        switch (option){
          case 1:
            bubbleSort(arr);
            break;
          case 2:
            selectionSort(arr);
            break;
          case 3:
            mergeSort(arr);
            break;
        }
      });
    });
  }
  //bubble sort algo
  function bubbleSort(arr){
    let n = arr.length;
    for (let i = 0; i < n - 1; i++){
      for (let j = 0; j < n - i - 1; j++){
        if (arr[j] > arr[j + 1]){
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    console.log("Sorted List (Bubble Sort):", arr);
    mainMenu();
  }
  //selection sort algo
  function selectionSort(arr){
    let n = arr.length;
    for (let i = 0; i < n - 1; i++){
      let minIdx = i;
      for (let j = i + 1; j < n; j++){
        if (arr[j] < arr[minIdx]){
          minIdx = j;
        }
      }
      let temp = arr[minIdx];
      arr[minIdx] = arr[i];
      arr[i] = temp;
    }
    console.log("Sorted List (Selection Sort):", arr);
    mainMenu();
  }
  
  //merge sort algo
  function mergeSort(arr){
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
  
    return merge(left, right);
  }
  
  function merge(left, right){
    let result = [];
    let i = 0;
    let j = 0;
  
    while (i < left.length && j < right.length){
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
  
    return result.concat(left.slice(i)).concat(right.slice(j));
  }

  //graph algo BFS and DFS
  function graphAlgorithms(){
    console.log("\n--- Graph Algorithms ---");
    console.log("1. Breadth-First Search (BFS)");
    console.log("2. Depth-First Search (DFS)");
  
    rl.question("Select an option (1-2): ", (choice) => {
      let option = parseInt(choice.trim());
  
      if (isNaN(option) || option < 1 || option > 2){
        console.log("Invalid choice. Please enter a number between 1 and 2.");
        return graphAlgorithms(); // Retry input
      }
  
      rl.question("Enter the graph as a space-separated list of edges (e.g., 'A B, B C, A C'): ", (edgesInput) => {
        const edges = edgesInput.split(',').map(edge => edge.trim().split(' '));
        const graph = buildGraph(edges);
  
        rl.question("Enter the starting node: ", (startNode) => {
          switch (option) {
            case 1:
              breadthFirstSearch(graph, startNode);
              break;
            case 2:
              depthFirstSearch(graph, startNode);
              break;
          }
        });
      });
    });
  }
  
  //build graph from edges
  function buildGraph(edges) {
    const graph = {};
    edges.forEach(([node1, node2]) => {
      if (!graph[node1]) graph[node1] = [];
      if (!graph[node2]) graph[node2] = [];
      graph[node1].push(node2);
      graph[node2].push(node1); //since undirected graph
    });
    return graph;
  }
  //BFS
  function breadthFirstSearch(graph, startNode){
    let visited = new Set();
    let queue = [startNode];
  
    console.log(`Breadth-First Search starting from node ${startNode}:`);
  
    while (queue.length > 0) {
      const node = queue.shift();
      if (!visited.has(node)) {
        console.log(node);
        visited.add(node);
        queue.push(...graph[node]);
      }
    }
    mainMenu();
  }
  //DFS
  function depthFirstSearch(graph, startNode){
    let visited = new Set();
    let stack = [startNode];
  
    console.log(`Depth-First Search starting from node ${startNode}:`);
  
    while (stack.length > 0) {
      const node = stack.pop();
      if (!visited.has(node)) {
        console.log(node);
        visited.add(node);
        stack.push(...graph[node]);
      }
    }
  
    mainMenu();
  }
  
  //other algo
  function otherAlgorithms(){
    console.log("\n--- Other Algorithms ---");
    console.log("1. Binary Search");
    console.log("2. Euclidean Algorithm (GCD)");
    console.log("3. Fibonacci Sequence");
  
    rl.question("Select an option (1-3): ", (choice) => {
      let option = parseInt(choice.trim());
  
      if (isNaN(option) || option < 1 || option > 3){
        console.log("Invalid choice. Please enter a number between 1 and 3.");
        return otherAlgorithms(); 
      }
  
      switch (option){
        case 1:
          rl.question("Enter a sorted list of numbers separated by commas: ", (input) => {
            let arr = input.split(",").map(item => parseInt(item.trim()));
            rl.question("Enter the target number: ", (target) => {
              binarySearch(arr, parseInt(target));
            });
          });
          break;
        case 2:
          rl.question("Enter two numbers to find the GCD (separated by a comma): ", (input) => {
            let numbers = input.split(",").map(num => parseInt(num.trim()));
            euclideanAlgorithm(numbers[0], numbers[1]);
          });
          break;
        case 3:
          rl.question("Select Fibonacci method: 1 for Iterative, 2 for Recursive: ", (method) => {
            rl.question("Enter the value of n (position in Fibonacci sequence): ", (n) => {
              let num = parseInt(n.trim());
              if (method == "1") {
                fibonacciIterative(num);
              } else if (method == "2") {
                console.log("Fibonacci (Recursive):", fibonacciRecursive(num));
                mainMenu();
              } else {
                console.log("Invalid choice for Fibonacci method.");
                mainMenu();
              }
            });
          });
          break;
      }
    });
  } 
  //binary search algo
  function binarySearch(arr, target){
    let low = 0;
    let high = arr.length - 1;
  
    while (low <= high){
      let mid = Math.floor((low + high) / 2);
  
      if (arr[mid] === target) {
        console.log(`Found ${target} at index ${mid}`);
        return mainMenu();
      } else if (arr[mid] < target){
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  
    console.log(`${target} not found in the array.`);
    mainMenu();
  }
  
  //euclidean algo
  function euclideanAlgorithm(a, b){
    while (b != 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    console.log(`The GCD is: ${a}`);
    mainMenu();
  }
  
  //fibonacci iterative
  function fibonacciIterative(n){
    let a = 0, b = 1, temp;
    if (n <= 0) {
      console.log("Fibonacci number:", 0);
      return mainMenu();
    }
    for (let i = 2; i <= n; i++) {
      temp = a + b;
      a = b;
      b = temp;
    }
    console.log(`Fibonacci number at position ${n} (Iterative):`, b);
  mainMenu();
}

//fibonacci recursive
function fibonacciRecursive(n) {
  if (n <= 1) return n;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}
  

//call the main menu initially
mainMenu();
//export functions for testing purposes
module.exports = {
  setOperations,
  relationFunctionTools,
  matrixOperations,
  numberTheoryAlgorithms,
  proofAssistant,
  countingProbabilitySimulator,
  digitalLogicCircuitSimulator,
  algorithmicSuite
};