async function getGroupPresenceList(){

    // Default options are marked with *
    console.log("Geting GroupPresenceList");
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    //console.log(response.json()); // parses JSON response into native JavaScript objects
    return await response.json();
}


function writeGroupPresenceList(presences){
    console.log(presences)
    const tbl = document.createElement('table');
    presences.forEach(athlete => {
        const tr = tbl.insertRow();
        
        const td1 = tr.insertCell();
        td1.appendChild(document.createTextNode(athlete.athlete_name));
        const td2 = tr.insertCell();
        td2.appendChild(document.createTextNode(athlete.athlete_lastname));
        const td3 = tr.insertCell();
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        td3.appendChild(checkbox);
    });
    document.getElementById('group1').appendChild(tbl)
}

function addpresences(){
    console.log("Adding presence");
}

let url = 'http://localhost:3000/presences'
let data =  {
    group_id: 1
}

async function main(){
    let res = await getGroupPresenceList();
    console.log(res);
    writeGroupPresenceList(res)
}

main();