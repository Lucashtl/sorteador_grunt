document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('form-sorteador').addEventListener('submit', function (evento) {
        evento.preventDefault();
        let numeromaximo = document.getElementById('numeromaximo').value;
        numeromaximo = parseInt(numeromaximo);
        let numeroaleatorio = Math.random() * numeromaximo;
        numeroaleatorio = Math.floor(numeroaleatorio + 1)


        document.getElementById('valor-obtido').innerText = numeroaleatorio;

        document.querySelector('.resultado').style.display = 'block'
    })
})  