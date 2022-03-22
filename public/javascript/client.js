/* When user registing account and changing the password, the password and comfirom password
need to be matched. Also there have some rules of the password.*/
function validatePassword(checkEmpty=true){
    let pwd = document.getElementById("pwd").value;
    let cmpwd = document.getElementById("cmpwd").value;
    let userName = document.getElementById("username");
    let message = document.getElementById("message");
    if(userName === ""){
        return false;
    }
    if (pwd ==="" && cmpwd ==="" && !checkEmpty){
        return;
    }

    if (pwd !== cmpwd){
        message.innerText = "The passwords are not match.";
        return false;
    }

    if (pwd.length < 6){
        message.innerText = "The passwords at least 6 chars.";
        return false;
    }

    let specialChars = "_#$!%^<>?&*-+=(){}[]|:~@";
    let anyUpperCase = false;
    let anySpecialChar = false;
    for(let i = 0; i < pwd.length; i++){
        let c = pwd.charAt(i);
        if (c.charCodeAt(0) >= 65 && c.charCodeAt(0) <=90 ){
            anyUpperCase = true;
        }
        else if(specialChars.indexOf(c)>=0){
            anySpecialChar = true;
        }
    }
    if(!anyUpperCase){
        message.innerText = "The passwords at least 1 upper case char.";
        return false;
    }

    if(!anySpecialChar){
        message.innerText = "The passwords at least 1 special char as _#$!%^<>?&*-+=(){}[]|:~@";
        return false; 
    }
    return true;
}


/* Once Line 71, submit successfully and then send to add a folder element in the folder_list showing in the forntend page.*/
function saveFolder(folderName){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let folder = JSON.parse(this.responseText);
            // create a new folder list item
            const liNode = document.createElement("li")
            const aNode = document.createElement("a");
            aNode.setAttribute("href", "#");
            const iNode = document.createElement("i");
            iNode.setAttribute("class", "bx bx-folder");
            const spanNode = document.createElement("span");
            spanNode.setAttribute("class", "links_name");
            spanNode.innerText = folder.folderName;
            aNode.appendChild(iNode);
            aNode.appendChild(spanNode);
            liNode.appendChild(aNode);
            document.getElementById("popup").insertAdjacentElement("afterend",liNode);
        }
    };
    xhttp.open("POST", "/foldermanager/create/" + folderName);
    xhttp.send();
}

/*Function for button popup and display: none, when click button */
function toggleMe() {
    const text = document.getElementById('popup')
    text.style.display = window.getComputedStyle(text, null).display === 'none' ? 'block' : 'none'
}

/*Loading imgs from http://fabricjs.com/assets/, selecting the id from 30 to 39,then showing in forntend page
Attribute to the shape_list.
Allow the user to choose those imgs to add in their images. */
function loadShapes(){
    const shapeElement = document.getElementById('shape_list');
    for(let i = 30; i < 39; i++){
        let img = document.createElement('img');
        img.setAttribute("src", "http://fabricjs.com/assets/" + i + ".svg");
        img.setAttribute("width", 40);
        img.setAttribute("height", 40);
        let a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("id", "svg_id_" + i);
        a.setAttribute("class", "svg_shape");
        a.appendChild(img);
        shapeElement.appendChild(a);
    }
}