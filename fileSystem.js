class Node{
    constructor(name, attribute, parent){
        this.name = name;
        this.attribute = attribute;
        this.parent = parent;
        this.next = null;
        this.list = new LinkedList();
    }
}

class LinkedList{
    constructor(){
        this.head = null;
    }

    popFront(){
        this.head = this.head.next;
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
    }


    preappend(name, attribute, parent){
        let newNode = new Node(name, attribute, parent);
        if (this.head == null) {
            this.head = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        
        return this.head;
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
        let temp = iterator;

        while (iterator.next != null){
            if (iterator.name == name) break;
            temp = iterator;
            iterator = iterator.next;
        }
        
        temp.next = iterator.next;
        iterator.next = temp;
        return iterator;
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
        return this.currentDir.list.printList();
    }

    cd(directoryName){
        if (directoryName == ".." && this.currentDir.parent == null) return "no parent directory. now you are on root directory."
        else if (directoryName == ".." &&  this.currentDir.parent != null) {
            this.currentDir = this.currentDir.parent;
            return  `changed current directory. you are on ${this.currentDir.name} directory.`
        }
        else if (this.currentDir.list.search(directoryName) === null) return `no such ${directoryName} directory.`
        else this.currentDir = this.currentDir.list.search(directoryName);
        return  `changed current directory. you are on ${directoryName} directory.`
    }

    pwd(){
        let iterator = this.currentDir;
        let ans = "";
        while (iterator != this.root){
            ans = iterator.name + '/' + ans;
            iterator = iterator.parent;
        }
        return ":" + this.root.name +"/"+ ans;
    }

    print(){

    }

    setContent(){

    }

    rm(){

    }
}

let File = new FileSystem();
//console.log(List);
console.log(File.pwd());
console.log(File.mkdir("R"));
console.log(File.mkdir("python"));
console.log(File.mkdir("java"));
console.log(File.mkdir("javascript"));
console.log(File.mkdir("javascript"));
console.log(File.mkdir("Go"));
console.log(File.pwd());
console.log(File.ls());
console.log(File.cd("python"));
// console.log(File.mkdir("MachineLearning"));
// console.log(File.cd("MachineLearning"));
console.log(File.touch("test.R")); 
console.log(File.touch("ML.R"));
console.log(File.mkdir("Go"));
console.log(File.ls());
console.log(File.cd(".."));
console.log(File.cd(".."));
console.log(File.pwd());
console.log(File.mkdir("test"));
console.log(File.cd("test"));
console.log(File.touch("test.py"));
console.log(File.mkdir("test2"));
console.log(File.cd("test2"));
console.log(File.pwd());