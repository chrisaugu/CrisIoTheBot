function sendMessage(){
        var user = document.getElementById('userId');
        var msg = document.getElementById('msg');
        var sendBtn = document.getElementById('sendbtn');
    }

function sayHelloTo(name){
        alert("Hi, " + name);
    }

function sayHello(name, age){
        document.write(name + "is " + age + " years old");
    }
    sayHello("John ", 20)

function person(name, age, gender, color){
    this.name = name;
    this.age = age;
    this.favColor = color;
    this.gender = gender;
    this.changeName = function(name){
        this.name = name;
        }
    this.yearOfBirth = bornYear;
    }

function bornYear(){
        return 2017 - this.age;
    }

    var John = new person("John", 25);
    var James = new person("James", 21);
    var Cris = new person("Cris", 18);
    Cris.changeName("Lieasi");


function connected(){
    var connected = document.getElementByClass("state");

    }

function(e, t, n){
    t.userKey = null, t.logout = function(t){
        t === undefine && (t = !0),
        e.removeCookie("_pbSession"),
        e.cookie("playgroundcookie", 111),
        e.cookie("pbextauth", 111)},
    }

    t.login = function(n,r) {
        var i = t.f.get("loginDialog");
    }
       n === undefined && (n = !0),
       i.find(".signinButton").click(function(s) {
       e.removeCookie("playgroundcookie"),
       e.removeCookie("pbextauth");
       var o = i.find('input[name="login"]').val(),
       u = i.find('input[name="password"]').val();
       t.api.post( {
            url: "/account/signIn",dataType:"json"
       }
       , {
           username: o,
           password:u,
           rememberMe:""
       }
}