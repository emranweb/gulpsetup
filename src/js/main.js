class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    fullName (){
        return this.name + this.age;
    }
}

const person1 = new Person("Emran", 30);


console.log(person1)