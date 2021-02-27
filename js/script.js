var done = 0;

function returnId(id) {

    var element = document.getElementById(id);

    if (element.classList.contains("remove")) {
        element.remove();
        length--;
        if (element.classList.contains("done")) {
            --done;
        }
    }
    else {
        element.classList.toggle("done");
        if (!element.classList.contains("done")) {
            --done;
        }
        else {
            ++done;
            if (done == length) {
                alert("all done!");
            }
        }
    }
    order();
    save();
}

function addMode() {
    var addMode = document.getElementById("addMode");
    addMode.style.visibility = "visible";
}

function add(input) {
    remove("off");
    var title = document.getElementById("title");
    var main = document.getElementById("main");
    var div = document.createElement("div");

    main.insertBefore(div, main.children[0]);
    div.setAttribute("onclick", "returnId(id)");
    div.setAttribute("id", length);
    length++;
    if (input !== '') { //onload
        div.innerHTML = input;
    }
    else {
        if (title.value == "") {
            div.innerHTML = " ";
        }
        else {
            div.innerHTML = title.value;
        }
        title.value = ""
        order();
        save();
    }
    order();

    var addMode = document.getElementById("addMode");
    addMode.style.visibility = "hidden";
}

function remove(input) {
    var main = document.getElementById("main");
    for (var i = 0; i < length; i++) {
        if (input == "off") {
            if (main.children[i].classList.contains("remove")) {
                main.children[i].classList.toggle("remove");
                console.log(i)
            }
        }
        else {
            main.children[i].classList.toggle("remove");
        }
    }
}

function edit() {
    if (confirm("Remove all?")) {
        var main = document.getElementById("main");
        while (main.childElementCount !== 0) {
            localStorage.clear();
            main.children[0].remove();
            length = 0;
            done = 0;
        }
    }
}

function order() {
    var element = document.getElementById("main");
    child = element.children;

    for (var i = 0; i < length; i++) {
        child[i].removeAttribute("id");
        child[i].setAttribute("id", i);
    }
}

function save() {
    var main = document.getElementById("main");
    child = main.children;

    localStorage.clear();

    for (var i = 0; i < length; i++) {
        var title = child[i].innerHTML;
        if (child[i].classList.contains("done")) {
            var status = 1;
        }
        else {
            var status = -1;
        }
        var newArray = [title, status];
        localStorage.setItem(i, newArray);
    }
}

function load() {
    var length = localStorage.length;
    for (var i = length-1; i >= 0; i--) {
        item = localStorage.getItem(i);
        add(item.split(",")[0]);
        if (item.split(",")[1] == 1) {
            var main = document.getElementById("main");
            main.children[0].classList.toggle("done");
            done++;
        }
    }
}
