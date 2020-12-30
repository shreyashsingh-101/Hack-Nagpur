function openNav() {
    document.getElementById("Sidenav").style.width = "250px";
    setTimeout(() => { document.getElementById("int-sec").style.display = ""; }, 300)
    document.getElementById("nav-button").style.display = "none";
}


function closeNav() {
    document.getElementById("Sidenav").style.width = "10vh";
    document.getElementById("int-sec").style.display = "none";
    document.getElementById("nav-button").style.display = "block";
}