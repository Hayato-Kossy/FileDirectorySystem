class Node{
    constructor(name, attribute, parent){
        this.name = name;
        this.attribute = attribute;
        this.parent = parent;
        this.content = "No data";
        this.next = null;
        this.list = new LinkedList();
    }
}

class LinkedList{
    constructor(){
        this.head = null;
    }
    
    popFront(){
        if (this.head == null) return;
        this.head = this.head.next;
        let iterator = this.head;
        while (iterator != null){
            //nextを消した
            iterator = iterator.next;
        }
    }

    popLast(){
        if (this.head == null) return;
        let iterator = this.head;
        while (iterator.next.next != null) {
            iterator = iterator.next;
        }
    }

    append(name, attribute, parent){
        let newNode = new Node(name, attribute, parent);
        if (this.head == null) {
            this.head = newNode;
            return this.head;
        }
        let iterator = this.head;
        while (iterator.next != null) {
            iterator = iterator.next;
        }
        
        iterator.next = newNode;
        iterator = iterator.next;
    }


    preappend(name, attribute, parent){
        let newNode = new Node(name, attribute, parent);
        if (this.head == null) {
            this.head = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        
        //return this.head;
    }

    printList(){
        let iterator = this.head;
        let ans = "";

        while (iterator != null) {
            ans += " " + iterator.name;
            iterator = iterator.next;
        }

        return ans.substring(1);
    }

    search(name){
        let iterator = this.head;

        while (iterator != null){
            if (iterator.name === name) break;
            
            iterator = iterator.next;
        }
        return iterator;
    }

    remove(name){
        let iterator = this.head;
        while(iterator.next != null){
            if (iterator.next.name === name) break;
            iterator = iterator.next;
        }

        iterator.next = iterator.next.next;
    }
}

class FileSystem{
    constructor(){
        this.root = new Node("root", "Directory", null);
        this.currentDir = this.root;
    }

    touch(name, parent = this.currentDir){
        if (this.currentDir.list.search(name) === null){
            this.currentDir.list.append(name, "File", parent);

            return `created ${name} file.`
        }

        return `${name} file has already exists.`
    }

    mkdir(name, parent = this.currentDir){
        if (this.currentDir.list.search(name) === null){
            this.currentDir.list.append(name, "Directory", parent);

            return `created ${name} directory.`
        }
        return `${name} directory is already exists.`
    }

    ls(){
        return ":" + this.currentDir.list.printList();
    }

    cd(directoryName){
        if (directoryName == ".." && this.currentDir.parent == null) return "no parent directory. now you are on root directory."
        else if (directoryName == ".." &&  this.currentDir.parent != null) {
            this.currentDir = this.currentDir.parent;
            return  `changed current directory. you are on ${this.currentDir.name} directory.`;
        }
        else if (this.currentDir.list.search(directoryName) === null) return `no such ${directoryName} directory.`;
        else this.currentDir = this.currentDir.list.search(directoryName);
        return  `changed current directory. you are on ${directoryName} directory.`;
    }

    pwd(){
        let iterator = this.currentDir;
        let ans = "";
        while (iterator != this.root){
            ans = iterator.name + '/' + ans;
            iterator = iterator.parent;
        }
        return `:${this.root.name}/${ans}`;
    }

    print(name){
        if (this.currentDir.list.search(name) === null) return "no such file or directory.";

        return `${name}'s data is ` + this.currentDir.list.search(name).content;
    }

    setContent(name, content){
        if (this.currentDir.list.search(name) === null) return "no such file or directory.";
        this.currentDir.list.search(name).content = content;
        return "added " + this.currentDir.list.search(name).content + " on " + `${name}`;
    }

    rm(fileName){
        if (this.currentDir.list.search(fileName) === null　|| this.currentDir.list.head.attribute == "Directory") return "no such file under current directory.";
        else if (this.currentDir.list.head.name === fileName){
            this.currentDir.list.popFront();
            return `deleted ${fileName} file.`
        }
        else {
            this.currentDir.list.remove(fileName)
            return `deleted ${fileName} file.`;
        }
    }
}
let List = new LinkedList();
let File = new FileSystem();

// console.log(List.append("root"))
// console.log(List.append("ばか"))
// console.log(List.append("クズ"))

// console.log(List.popFront())
// console.log(List);

// console.log(File.pwd());
// console.log(File.mkdir("R"));
// console.log(File.mkdir("python"));
// console.log(File.mkdir("java"));
// console.log(File.mkdir("javascript"));
// console.log(File.mkdir("javascript"));
// console.log(File.mkdir("Go"));
// console.log(File.pwd());
// console.log(File.ls());
// console.log(File.cd("python"));
// console.log(File.touch("test.R")); 
// console.log(File.touch("ML.R"));
// console.log(File.mkdir("Go"));
// console.log(File.ls());
// console.log(File.cd(".."));
// console.log(File.cd(".."));
// console.log(File.pwd());
// console.log(File.mkdir("test"));
// console.log(File.cd("test"));
// console.log(File.touch("test.py"));
// console.log(File.mkdir("test2"));
// console.log(File.touch("test2.py"));
// console.log(File.pwd());
// console.log(File.ls());
// console.log(File.setContent("test.py","こんにちは"));
// console.log(File.print("test.py"));
// console.log(File.rm("test.py"));
// console.log(File.ls());
// console.log(File.print("test.py"));
// console.log(File.mkdir("test3"));
// console.log(File.cd(".."));
// console.log(File.pwd());
// console.log(File.ls());



// 例題
// pythonディレクトリの下にtest.pyとtest2.pyを作ってlsコマンドで表示してください

console.log("-------不正解--------")
//間違いの例
//ディレクトリとファイルの作成
console.log(File.mkdir("python"));
console.log(File.touch("test.py"));
console.log(File.touch("test2.py"));

//回答の確認
console.log(File.ls());


console.log("-------正解--------")
File = new FileSystem();
//正解の例
//ディレクトリとファイルの作成
console.log(File.mkdir("python"));
console.log(File.cd("python"));
console.log(File.touch("test.py"));
console.log(File.touch("test2.py"));

//回答の確認
console.log(File.ls());

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