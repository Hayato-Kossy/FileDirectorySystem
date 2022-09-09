let CLITextInput = document.getElementById("CLITextInput");
let CLITextOutputDiv = document.getElementById("CLIOutputDiv");

CLITextInput.addEventListener("keyup", (event) => submitSerch(event));

function submitSerch(event){
    if (event.key == "Enter"){
        let parsedStringInputArray = MTools.commandLineParser(CLITextInput.value);

        MTools.appendEchoParagraph(CLITextOutputDiv);
        CLITextInput.value = '';

        MTools.appendResultParagraph(CLITextOutputDiv, MTools.evaluatedResultsStringFromParsedStringInputArray(parsedStringInputArray));
    }
}

class MTools{
    static commandLineParser(CLITextInputString){
        let parsedStringInputArray = CLITextInputString.trim().split(" ");

        return parsedStringInputArray;
    }

    static appendEchoParagraph(parentDiv){
        parentDiv.innerHTML +=
            `
            <p class="m-0"> 
            <span style='color:green'>student</span>
            <span style='color:magenta'>@</span>
            <span style='color:blue'>recursionist</span>
            : ${CLITextInput.value} 
            </p>
            `;
        return;
    }

    static appendResultParagraph(parentDiv, message){
        parentDiv.innerHTML +=
            `
            <p class="m-0">
                <span style='color: turquoise'>MTools</span>: ${message}
            </p>
            `;    
        return;    
    }

    static evaluatedResultsStringFromParsedStringInputArray(parsedStringInputArray){
        let result = 0;
        let argsArray = parsedStringInputArray[2].split(",").map(stringArgument=>Number(stringArgument));
        let argA = argsArray[0];
        let argB = argsArray[1];
        let commandName = parsedStringInputArray[1];

        if (commandName == "add" ) result = argA+argB;
        else if (commandName == "subtract" ) result = argA-argB;
        else if (commandName == "multiply" ) result = argA*argB;
        else if (commandName == "divide" ) result =  argA/argB;
        else if (commandName == "exp" ) result = Math.pow(argA, argB);
        else if (commandName == "log" ) result = Math.log(argB)/Math.log(argA);
        else if (commandName == "sqrt" ) result = Math.sqrt(argA);
        else if (commandName == "abs" ) result = Math.abs(argA); 
        else if (commandName == "round" ) result = Math.round(argA);
        else if (commandName == "ceil" ) result = Math.ceil(argA);
        else if (commandName == "floor" ) result = Math.floor(argA); 
        else if (commandName == "fibo" ) result = Option.fibo(argA); 
        else if (commandName == "gcd" ) result = Option.gcd(argA, argB);

        else console.log("MTools.evaluatedResultsStringFromParsedStringInputArray:: invalid command name")

        return "your result is: "+result;
    }
}

class Option{
    static fibo(number){
        if (number < 2) return number;
        return this.fibo(number - 1) + this.fibo(number - 2);
    }
    
    static gcd(a, b){
        console.log(b)
        if (b == 0) return a;
        return this.gcd(b, a % b);
    }
}

