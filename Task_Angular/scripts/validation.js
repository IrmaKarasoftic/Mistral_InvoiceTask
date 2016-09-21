function validateName(val) {
    var text = document.getElementById("inputDefault").value;
    var reg = /^[A-Z][a-z]+$/gm;
    if (!(reg.test(text))) {
        return false;
    }
    else {
        return false;
    }
}