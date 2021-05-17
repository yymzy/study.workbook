function Person() {
  this.say = function () {
    console.log("say:", "I am human beings!");
  };
}

function Parent(name) {
  this.name = name;
  this.no = 0;
  this.abilities = ["say", "cry"];
}

Parent.prototype.say = function () {
  console.log("say:", "My name is " + this.name + " and no. is " + this.no);
};

const p = new Parent("Parent Nike");

/**
 * 一、原型链继承：
 * 重点：让新实例的原型等于父类的实例。
 * 特点：
 * 1、新实例可继承属性：构造函数属性，父类构造函数属性，父类原型上的属性
 *
 * 缺点：
 * 1、新实例无法向构造函数传参；
 * 2、继承单一；
 * 3、所有实例都会共享父类的实例的属性(一个实例修改原型上的属性，所有实例的原型上的属性都会改变)
 */

function Child1(no) {
  this.no = no;
  this.isChild = true;
}

Child1.prototype = new Parent();
Child1.prototype.cry = function () {
  console.log("cry:", "no." + this.no + " wo wo ... ");
};

const c1_1 = new Child1(1);
const c1_2 = new Child1(2);
c1_1.abilities.push("smile"); // 所有实例的abilities属性将会受到影响

console.log("p", p);
p.say();

console.log("c1_1", c1_1);
c1_1.say();
c1_1.cry();

console.log("c1_2", c1_2);
c1_2.say();
c1_2.cry();

/**
 * 二、借用构造函数继承
 * 重点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
 * 特点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。
 *      2、解决了原型链继承缺点1、2、3。
 *　　　 3、可以继承多个构造函数属性（call多个）。
 * 　　　4、在子实例中可向父实例传参。
 * 缺点：1、只能继承父类构造函数的属性。
 *      2、无法实现构造函数的复用。（每次用每次都要重新调用）
 *      3、每个新实例都有父类构造函数的副本，臃肿。
 */

function Child2(name, no) {
  Parent.call(this, name);
  Person.call(this); // 多继承
  this.no = no;
}

const c2_1 = new Child2("Child2_1", 3);
const c2_2 = new Child2("Child2_2", 4);
c2_1.abilities.push("smile"); // 独立原型内存，不会影响其他实例

console.log("c2_1", c2_1);
c2_1.say();
console.log("c2_2", c2_2);

/**
 * 三、组合继承（组合原型链继承和借用构造函数继承）（常用）
 * 重点：结合了两种模式的优点，传参和复用
 * 特点：1、可以继承父类原型上的属性，可以传参，可复用。
 *      2、每个新实例引入的构造函数属性是私有的。
 * 缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。
 */

function Child3(name, no) {
  Parent.call(this, name);
  this.no = no;
}
Child3.prototype = new Parent();

const c3_1 = new Child3("Child3_1", 5);
const c3_2 = new Child3("Child3_2", 6);
c3_1.abilities.push("smile");

console.log("c3_1", c3_1);
c3_1.say();
console.log("c3_2", c3_2);
c3_2.say();

/**
 * 四、原型式继承
 * 重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。
 * 特点：类似于复制一个对象，用函数来包装。
 * 缺点：1、所有实例都会继承原型上的属性。
 *      2、无法实现复用。（新实例属性都是后面添加的）
 */
// 函数容器
function fnContent(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
const p4_1 = new Parent("Child4_1");
const p4_2 = new Parent("Child4_2");
const c4_1 = fnContent(p4_1);
const c4_2 = fnContent(p4_2);
c4_1.no = 7;
c4_2.no = 8;
c4_1.abilities.push("smile");

console.log("c4_1", c4_1);
c4_1.say();
console.log("c4_2", c4_2);
c4_2.say();

/**
 * 五、寄生式继承
 * 重点：就是给原型式继承外面套了个壳子。
 * 特点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
 * 缺点：没用到原型，无法复用。
 */

function fnContentWrapper(o, name, no) {
  const child = fnContent(o);
  child.name = name;
  child.no = no;
  return child;
}
const p5_1 = new Parent();
const child5_1 = fnContentWrapper(p5_1, "Child5_1", 9);
const p5_2 = new Parent();
const child5_2 = fnContentWrapper(p5_2, "Child5_2", 10);
child5_1.abilities.push("smile");

console.log("child5_1", child5_1);
child5_1.say();
console.log("child5_2", child5_2);
child5_2.say();

/**
 * 六、寄生组合式继承（常用）
 * 寄生：在函数内返回对象然后调用
 * 组合：1、函数的原型等于另一个实例。2、在函数中用apply或者call引入另一个构造函数，可传参
 * 重点：修复了组合继承的问题
 */

function inheritPrototype(child, parent) {
  const child6 = fnContent(parent.prototype);
  child6.constructor = child;
  child.prototype = child6;
}

function Child6(name, no) {
  Parent.call(this, name);
  this.no = no;
}

inheritPrototype(Child6, Parent);

const child6_1 = new Child6("Child6_1", 11);
const child6_2 = new Child6("Child6_2", 12);
child6_1.abilities.push("smile");

console.log("child6_1", child6_1);
child6_1.say();
console.log("child6_2", child6_2);
child6_2.say();
