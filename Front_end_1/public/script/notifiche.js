document.addEventListener('DOMContentLoaded', () => {
    const utente = JSON.parse(localStorage.getItem('utente'));

    const tableBody = document.querySelector('tbody');

    if (utente) {
        const id_utente = +utente.id_utente;
        console.log(id_utente);

        findNotifiche();
        
        async function findNotifiche(){
            // const notificheUtente = [];
            const res = await fetch('http://localhost:8000/notifiche', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_utente
                }),
            });

            if (res.status == 201){
                console.log('successo');
                const notifiche = await res.json();

                notifiche.forEach(notifica => {
                    const row = document.createElement('tr');
        
                    const idCell = document.createElement('td');
                    idCell.textContent = notifica.id_notifica;
        
                    const piantagioneCell = document.createElement('td');
                    piantagioneCell.textContent = notifica.piantagione;
        
                    const testoCell = document.createElement('td');
                    testoCell.textContent = notifica.testo;
        
                    row.appendChild(idCell);
                    row.appendChild(piantagioneCell);
                    row.appendChild(testoCell);
        
                    tableBody.appendChild(row);
                });
                
            } else if (res.status == 404){

                const tabella = document.getElementById('tabella');
                tabella.classList.add('hidden');

                const divEmpty = document.getElementById('divEmpty');

                const textNotNotification = document.createElement('div');
                textNotNotification.id = 'textNotNotification';
                textNotNotification.classList.add('flex', 'justify-center', 'items-center', 'm-10');
                divEmpty.appendChild(textNotNotification)

                const body = document.getElementById('textNotNotification');
                const h1 = document.createElement('h1');
                h1.textContent = 'Nessuna Notifica';
                h1.classList.add('text-black', 'text-3xl', 'font-bold',)

                body.appendChild(h1);
            }
            

        }
    } else {
        console.error('Utente non trovato nel localStorage');
    }
});
