function Parent(name) {
  this.name = name;
}

Parent.prototype.sex = 0;

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
// function Child(age) {
//     this.age = age;
// }
// Child.prototype = new Parent();
// const child1 = new Child(10);
// const child2 = new Child(11);
// const par = new Parent();
// par.sex = 1;
// child1.__proto__.name = "child1";
// console.log("child1", child1);
// console.log("child2", child2);

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

// function Child(age, name) {
//   Parent.call(this, name);
//   this.age = age;
// }
// const child1 = new Child(10, "new child1");
// const child2 = new Child(11, "new child2");
// console.log("child1", child1, child1.__proto__);
// console.log("child2", child2);

let obj = {
  name: "name",
  age: 0,
};
for (const i in obj) {
  console.log("in", i);
}

// let arr = ["1", "2", "3"];
// for (const i of arr) {
//   console.log("of", i);
// }
// arr.forEach(element => {
//   console.log('element',element);
// });

var arr = [1, 2, 3];
arr.length = 6;
console.log(arr); //[1,2,3,undefined*3]
console.log("5 in arr", 5 in arr, arr); //false
arr[5] = undefined;
console.log("5 in arr", 5 in arr, arr); //true

// Object.defineProperties(obj, {
//   sex: {
//     enumerable: true,
//     value: 0,
//   },
// });
// console.log("obj", obj, obj.hasOwnProperty("sex"));

var http = require("http");
var server = http.createServer(); //创建服务器
server.on("request", function (req, res) {
  // request.headers  打印全部请求头信息--对象形式
  // request.rawHeaders  全部头信息--数组形式
  // request.httpVersion  请求的协议方式
  // request.method  请求的方式
  // request.url  请求的路径

  console.log(req.headers);
  res.write("Hello Word!");
  res.end();
});
server.listen(9090, function () {
  console.log("http://localhost:9090", "服务器已开启");
});
