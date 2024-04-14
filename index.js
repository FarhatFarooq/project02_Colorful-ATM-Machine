#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 5000;
let myPin = 1234;
// Print welcome message
console.log(chalk.blueBright("\n \tWelcome to Farhat Farooq - ATM Machine\n \t"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code:")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.greenBright("\nPin is Correct, Login Successfully!\n"));
    // console.log(`Current Account Balance is ${myBalance}`)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellow("Select an operation"),
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.yellow("Select a withdrawl method:"),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk.yellow("Select Amount:"),
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.green(`${fastCashAns.fastCash} Withdraw Successfully`));
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.yellow("Enter the amount to withdraw:")
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.green(`${amountAns.amount} Withdraw Successfully`));
                console.log(chalk.bgBlue(`Your Remaining Balance is: ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.green(`Your Account Balance is: ${myBalance}`));
    }
}
else {
    console.log(chalk.red("Pin is Incorrect, Try Again!"));
}
