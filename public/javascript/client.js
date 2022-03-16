function validatePassword(checkEmpty=true){
    let pwd = document.getElementById("pwd").value;
    let cmpwd = document.getElementById("cmpwd").value;
    let message = document.getElementById("message");
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

function saveFolder(folderName){
    var xhttp = new XMLHttpRequest();
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
            document.getElementById("add_folder_link").insertAdjacentElement("afterend",liNode);
        }
    };
    xhttp.open("POST", "/foldermanager/create/" + folderName);
    xhttp.send();
}