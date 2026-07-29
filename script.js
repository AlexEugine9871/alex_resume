const adm = document.getElementById("admin");

function show() {
  adm.style.display = "block";
}

const ed = document.getElementById("ed");

ed.addEventListener("click", function () {
  ed.innerHTML = "Education was Clicked!";
});

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxGE5NPp7Fu0IGl2W3oPYnsxy16ddenNBBQC6bP2Uh53ddUL2eyL-Ih61d4zs5xnqCKpA/exec";

const adf = document.getElementById("adf");
const msg = document.getElementById("msg");

// admin login
adf.addEventListener("submit", async function (event) {
  event.preventDefault();

  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "login",
        username: user,
        password: pass
      })
    });

    const result = await response.json();

    if (result.success) {
      alert("Access granted!");
      adm.display = "none";
      msg.style.display = "block";
      get_messages();
    } else {
      alert("Access Denied!");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong while logging in.");
  }
});

// adf.addEventListener('submit', function(){
//     const un = document.getElementById("user").value;
//     const pass = document.getElementById("pass").value;
//     const user = "alex";
//     const passu = 123;

//     if (un==user && pass==passu){
//         alert("acess granted");
//         adm.style.display="none";
//         msg.style.display="block";
//         getmsg();
//     }
//     else{
//         alert("acess denied");
//     }
// })

// toggle theme
const tbt = document.getElementById("TT");

tbt.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
});

const ccm = document.getElementById("cm");

ccm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("nm").value;
  const email = document.getElementById("ml").value;
  const msg = document.getElementById("mg").value;

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "save_message",
        name: name,
        email: email,
        msg: msg
      })
    });

    const result = await response.json();

    if (result.success) {
      alert("Message Submitted");
      ccm.reset();
    } else {
      alert("Message could not be saved.");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong while submitting the message.");
  }
});

async function get_messages() {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);

    const result = await response.json();

    if (!result.success) {
      alert("Could not fetch messages.");

      return;
    }

    let control_of_user_responses_div = document.getElementById("usm");

    control_of_user_responses_div.innerHTML = "";

    result.messages.forEach((responses) => {
      let control_of_new_div = document.createElement("div");

      let nameParagraph = document.createElement("p");

      nameParagraph.textContent = "Name: " + responses.name;

      let emailParagraph = document.createElement("p");

      emailParagraph.textContent = "Email: " + responses.email;

      let messageParagraph = document.createElement("p");

      messageParagraph.textContent = "Message: " + responses.msg;

      let dateParagraph = document.createElement("p");

      dateParagraph.textContent = "Date: " + responses.date;

      let separator = document.createElement("hr");

      control_of_new_div.appendChild(nameParagraph);

      control_of_new_div.appendChild(emailParagraph);

      control_of_new_div.appendChild(messageParagraph);

      control_of_new_div.appendChild(dateParagraph);

      control_of_new_div.appendChild(separator);

      control_of_user_responses_div.appendChild(control_of_new_div);
    });
  } catch (error) {
    console.error(error);

    alert("Something went wrong while fetching messages.");
  }
}

// const cf = document.getElementById("cf")
// cf.addEventListener("submit",function(){
//     const n = document.getElementById("nm").value;
//     const em = document.getElementById("ml").value;
//     const mg = document.getElementById("mg").value;
//     const date = new Date().toLocaleString();

//     const response={
//         n,em,mg,date
//     }

//     const dummy_database = JSON.parse(localStorage.getItem("tempDB")) || [];

//     dummy_database.push(response);
//     localStorage.setItem("tempDB",JSON.stringify(dummy_database));

//     alert("Message Sent")
// })

// function getmsg(){
//     const dummy_database = JSON.parse(localStorage.getItem("tempDB")) || [];

//     const cusm = document.getElementById("usm");

//     dummy_database.forEach(responses => {
//         let ndv = document.createElement('div');

//         ndv.innerHTML = `
//         <p>Name: ${responses.n}</p>
//         <p>Email: ${responses.em}</p>
//         <p>Message: ${responses.mg}</p>
//         <p>Date: ${responses.date}</p>
//         <hr>
//         `;

//         cusm.appendChild(ndv);
//     });
// }
