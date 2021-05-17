/**
 * es6 class
 */
class Parent {
  constructor(name) {
    this.name = name;
  }
  say = function say() {
    console.log("say: I am Mom, My name is " + this.name);
  };
}

class Child extends Parent {
  constructor(sex, ...arg) {
    super(...arg);
    this.sex = sex;
  }
  say = function say() {
    console.log("say: I am Child, My name is " + this.name);
  };
  cry() {
    console.log("cry: I am not good , sex is " + this.sex);
  }
}

const childIns = new Child(1, "Aid");
childIns.todo = function todo() {
  console.log("log: I am working! todo ... ");
};
childIns.say = function say() {
  console.log("write: Sorry,I only can write!");
};

const parentIns = new Parent("Cod");

console.log("childIns", childIns);
console.log("childIns.say", childIns.say.name);
childIns.say();
childIns.cry();
childIns.todo();

console.log("parentIns", parentIns);
console.log("parentIns.say", parentIns.say.name);
parentIns.say();
// parentIns.cry();

const childIns2 = new Child(0, "Nora");
console.log("childIns2", childIns2);
console.log("childIns2.say", childIns2.say.name);
childIns2.say();
childIns2.cry();
