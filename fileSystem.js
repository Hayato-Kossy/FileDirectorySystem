class Node{
    constructor(name, attribute){
        this.name = name;
        this.attribute = attribute;
        this.parent = null;
        this.list = new LinkedList();
        this.next = null;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
    }

    static popFront(self){
        this.head = this.head.next;
    }

    append(name, attribute){
        let newNode = new Node(name, attribute);
        if (this.head == null) {
            this.head = newNode;
            return this.head;
        }
        let iterator = this.head;
        while (iterator.next != null) {
            iterator = iterator.next;
        }
        
        iterator.next = newNode;
        iterator = iterator.next
        //return this.head;
    }

    preappend(name, attribute){
        let newNode = new Node(name, attribute);
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
            ans += "/" + iterator.name;
            iterator = iterator.next;
        }

        return "/"+ans.substring(1);
    }

    search(name){
        let iterator = this.head;

        while (iterator != null){
            if (iterator.name == name) {
                break;
            }
        return iterator;
        }
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
        this.root = new Node("root", "Directory");
        this.currentDir = this.root;
    }

    touch(name){
        if (this.currentDir.list.search(name) == null){
            this.currentDir.list.append(name, "File");

            return `created ${name} file`
        }

        return `${name} file has already exists.`
    }

    mkdir(name){
        if (this.currentDir.list.search(name) != null){
            this.currentDir.list.append(name, "Directory");

            return `created ${name} directory.`
        }

        return `${name} directory is already exists.`
    }

    ls(){
        return ":"+this.currentDir.name + this.currentDir.list.printList();
    }

    cd(directoryName){
        if (this.currentDir.list.search(directoryName) == null || this.currentDir.list.search(directoryName).next.attribute == "File") return `no such ${directoryName} directory.`
        //else if (directoryName == ".." && ) 
        else this.currentDir = this.currentDir.list.search(directoryName);
        return  `changed current directory. you are on ${directoryName} directory.`
    }

    pwd(){

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
console.log(File.touch("R"));
console.log(File.mkdir("R"));
console.log(File.mkdir("python"));
console.log(File.mkdir("java"));
console.log(File.mkdir("javascript"));
console.log(File.mkdir("Go"));
console.log(File.ls());
console.log(File.cd("Go"));

