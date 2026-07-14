const token = localStorage.getItem("token");

if(!token){

    window.location.href="login.html";

}

const payload = JSON.parse(atob(token.split(".")[1]));

if(payload.role!=="admin"){

    window.location.href="dashboard.html";

}

const table=document.getElementById("userTable");

async function loadUsers(){

    const response=await fetch(

        "http://localhost:8080/api/admin/users",

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    const users=await response.json();

    table.innerHTML="";

    users.forEach(user=>{

        const joined=new Date(user.createdAt).toLocaleDateString();

        table.innerHTML+=`

        <tr>

        <td>${user.name}</td>

        <td>${user.email}</td>

        <td>

        <span class="${user.role}">

        ${user.role}

        </span>

        </td>

        <td>${joined}</td>

        </tr>

        `;

    });

}

loadUsers();