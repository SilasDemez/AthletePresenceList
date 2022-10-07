async function getGroupPresenceList(){

    let url = 'https://athletepresencelist.herokuapp.com/presences'
    let data =  {
        group_id: 1
    }

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
    const tbl = document.getElementById('table1');
    presences.forEach((athlete, i) => {
        const tr = tbl.insertRow();

        const td1 = tr.insertCell();
        td1.setAttribute('class', 'checkboxCell');
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', 'checkbox');
        checkbox.setAttribute('id', i.toString() + '0');
        td1.appendChild(checkbox);
        
        const td2 = tr.insertCell();
        let lastname = document.createElement('div');
        lastname.innerHTML = athlete.athlete_lastname;
        lastname.setAttribute('id', i.toString() + '1');
        td2.appendChild(lastname);
        
        const td3 = tr.insertCell();
        let firstname = document.createElement('div');
        firstname.innerHTML = athlete.athlete_name
        firstname.setAttribute('id', i.toString() + '2');
        td3.appendChild(firstname);

        const td4 = tr.insertCell();
        let presences = document.createElement('div');
        presences.innerHTML = athlete.presences;
        presences.setAttribute('id', i.toString() + '3');
        td4.appendChild(presences);
    });

    let tr = tbl.insertRow();
    const td5 = tr.insertCell();
    const td13 = tr.insertCell();
    td13.appendChild(document.createTextNode(" "));
    
    let tr1 = tbl.insertRow();

    //

    let td6 = tr1.insertCell();
    td6.appendChild(document.createTextNode(""));


    let td7 = tr1.insertCell();
    let datepicker = document.createElement('input');
    datepicker.setAttribute('type', 'date');
    datepicker.setAttribute('id', 'datepicker');
    td7.appendChild(datepicker);

    let td8 = tr1.insertCell();
    let button = document.createElement('button');
    button.setAttribute('onclick', 'javascript: addpresences()');
    button.setAttribute('id', 'btn1');
    button.innerHTML = 'Submit';
    td8.appendChild(button);

    document.getElementById('group1').appendChild(tbl)
}

async function addquerypresence(firstname, lastname, date){

    console.log("Adding presence");
    let url = 'https://athletepresencelist.herokuapp.com/addpresence'
    
    let data =  {
        athlete_name: firstname,
        athlete_lastname: lastname,
        date: date
    }

    console.log("This data will be sent:");
    console.log(data);

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
    let a = await response;
    return "";
}


async function addpresences(){

    let date = document.getElementById('datepicker').value;
    console.log("Date picked: " + date)

    let table = document.getElementById("table1");
    console.log("Table.rows: " + table.rows.length);

    for (let i = 0; i< table.rows.length; i++) {
        let checkbox = document.getElementById(`${i}0`);
        console.log(checkbox);
        if(checkbox.checked){
            console.log("Checked");
            let firstname = document.getElementById(`${i}2`).innerHTML;
            let lastname = document.getElementById(`${i}1`).innerHTML;
            console.log(await addquerypresence(firstname, lastname, date));
        }
    }

    document.getElementById('table1').innerHTML = null;
    let res = await getGroupPresenceList();
    console.log(res);
    writeGroupPresenceList(res)
}


async function main(){
    let res = await getGroupPresenceList();
    console.log(res);
    writeGroupPresenceList(res)
}

main();