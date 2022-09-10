let CLITextInput = document.getElementById("CLITextInput");
let CLITextOutputDiv = document.getElementById("CLIOutputDiv");

CLITextInput.addEventListener("keyup", (event) => submitSerch(event));

let fileDirectory = [];

function submitSerch(event){
    if (event.key == "Enter"){
        let parsedStringInputArray = FileSystem.commandLineParser(CLITextInput.value);

        FileSystem.appendEchoParagraph(CLITextOutputDiv);
        CLITextInput.value = '';

        FileSystem.appendResultParagraph(CLITextOutputDiv, FileSystem.evaluatedResultsStringFromParsedStringInputArray(parsedStringInputArray));
    }
}
class FileDirectory{
    constructor(name, attribute){
        this.name = name;
        this.attribute = attribute;
        this.isCurrent = false;
    }
}
class FileSystem{

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
                <span style='color: turquoise'>FileSystem</span>: ${message}
            </p>
            `;    
        return;    
    }

    static ls(){
        let fileDirectoryLength = fileDirectory.length;
        let path = "root";

        for (let i = 0; i < fileDirectoryLength; i++){
            path += "/" + fileDirectory[i].name;
        }

        return path;
    }

    static cd(directoryName){  
        for (let i = 0; i < fileDirectory.length; i++){
            if (fileDirectory[i].name == directoryName && fileDirectory[i].attribute == "Directory") {
                fileDirectory[i].isCurrent = true;
                return `changed current directory!! you are on ${fileDirectory[i].name}`;
            }
        }
        return "error no such name directory"
    }

    print(){

    }

    setContent(){

    }

    static mkdir(newDirectoryName){
        let newDirectory = new FileDirectory(newDirectoryName, "Directory");
        fileDirectory.push(newDirectory);

        return `created ${newDirectoryName} directory!!`
    }

    static touch(newFileName){
        let newFile = new FileDirectory(newFileName, "File");
        fileDirectory.push(newFile);

        return `created ${newFileName} file!!`
    }

    static pwd(){
        let fileDirectoryLength = fileDirectory.length;
        let path = "root";

        for (let i = 0; i < fileDirectoryLength; i++){
            path += "/" + fileDirectory[i].name;
        }

        return path;
    }

    rm(){
        
    }

    static evaluatedResultsStringFromParsedStringInputArray(parsedStringInputArray){
        let result = "";
        console.log(parsedStringInputArray);
        let argA = parsedStringInputArray[1];
        //let argB = argsArray[1];
        let commandName = parsedStringInputArray[0];

        if (commandName == "mkdir" ) result = this.mkdir(argA);
        else if (commandName == "cd" ) result = this.cd(argA);
        else if (commandName == "touch" ) result = this.touch(argA);
        else if (commandName == "ls" ) result = this.ls();


        else console.log("MTools.evaluatedResultsStringFromParsedStringInputArray:: invalid command name")

        return result;
    }
}