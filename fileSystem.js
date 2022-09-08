class Node{
    constructor(name, type, parent){
        this.name = name;
        this.type = type;
        this.parent = parent;
        this.content = this.type == 'file' ? 'empty' : 'This is directory'; 
        this.list = new LinkedList();
        this.next = null;
        this.prev = null;
    }

    getName(){
        return this.name;
    }
    getParentName(){
        return this.parent.getName();
    }
    getParentNode(){
        return this.parent;
    }
    getChildNodeList(){
        return this.list;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    append(node){
        if (this.head == null) this.head = node;
        else if(this.tail == null) {
            this.head = node;
            this.head.next = this.tail;
        }
        else {
            this.tail.next = node;
            this.tail = this.tail.next;
        }
    }

    

}