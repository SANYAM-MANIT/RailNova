function showToast(message,type="info"){

    let toast=document.getElementById("toast");

    if(!toast){

        toast=document.createElement("div");

        toast.id="toast";

        document.body.appendChild(toast);

    }

    toast.className="";

    toast.classList.add(type);

    toast.textContent=message;

    setTimeout(()=>{

        toast.classList.add("show");

    },10);

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}