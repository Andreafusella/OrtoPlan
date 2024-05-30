document.addEventListener('DOMContentLoaded', () => {
    const utente = JSON.parse(localStorage.getItem('utente'));
    
    const button_delete = document.getElementById('deleteSelected');
    const tableBody = document.querySelector('tbody');

    if (utente) {
        const id_utente = +utente.id_utente;

        findNotifiche();
        
        async function findNotifiche() {
            const res = await fetch('http://localhost:8000/notifiche', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_utente
                }),
            });

            if (res.status == 201) {
                console.log('successo');
                const notifiche = await res.json();

                const tabella = document.getElementById('tabella');
                tabella.classList.remove('hidden');

                notifiche.forEach(notifica => {
                    const row = document.createElement('tr');
                    
                    const idCell = document.createElement('td');
                    idCell.textContent = notifica.id_notifica;
                    idCell.classList.add('px-4', 'py-2');

                    const piantagioneCell = document.createElement('td');
                    piantagioneCell.textContent = notifica.nome_piantagione;
                    piantagioneCell.classList.add('px-4', 'py-2');

                    const testoCell = document.createElement('td');
                    testoCell.classList.add('px-4', 'py-2');

                    const p = document.createElement('p');
                    const p2 = document.createElement('p');
                    if (notifica.aperta){
                        p.textContent = '📧';
                        row.classList.add('bg-gray-400');
                        p.classList.add('h-10')
                    } else {
                        p.textContent = '✉️';
                    }
                    p.classList.add('cursor-pointer', 'text-4xl');
                    p.addEventListener('click', () => {

                        changeColor(p, row);
                        function changeColor(){
                            p.textContent = '📧';
                            row.classList.add('bg-gray-400');
                            p.classList.add('h-10')

                            const divImgNotifica = document.getElementById('imageNotifica');
                            const imgNotifica = divImgNotifica.firstElementChild;
                            const divImgNotifica2 = document.getElementById('imageNotifica2');
                            const imgNotifica2 = divImgNotifica2.firstElementChild;

                            imgNotifica.src = '/assets/campanella.png';
                            imgNotifica2.src = '/assets/campanella.png';

                        }
                        const modalText = document.getElementById('modal-text');

                        while (modalText.firstChild) {
                            modalText.removeChild(modalText.firstChild);
                        }
                        
                        const titolo = document.createElement('h1');
                        titolo.textContent = 'Annaffiare';
                        titolo.classList.add('text-3xl', 'text-black', 'font-bold', 'mb-3', 'text-center');

                        const testo = document.createElement('h1');
                        testo.classList.add('text-xl', 'text-black', 'font-bold', 'text-center');
                        testo.textContent = notifica.testo;

                        modalText.appendChild(titolo);
                        modalText.appendChild(testo);
                        
                        document.getElementById('modal').classList.remove('hidden');

                        notificaSign()
                        async function notificaSign(){
                            const id_notifica = notifica.id_notifica;
                            try {
                                const res = await fetch('http://localhost:8000/notificheSign', {
                                    method: 'PUT',
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        id_notifica
                                    }),
                                });

                                if (res.status == 201) {
                                    console.log('successo notifica');
                                } else {
                                    console.log('errore notifica');
                                }
                            } catch (error) {
                                console.log(error);
                                console.log('Errore sign notifica');
                            }
                        }
                    });

                    testoCell.appendChild(p);

                    

                    row.appendChild(idCell);
                    row.appendChild(piantagioneCell);
                    row.appendChild(testoCell);
                    

                    tableBody.appendChild(row);
                });

                document.getElementById('close-modal').addEventListener('click', () => {
                    document.getElementById('modal').classList.add('hidden');
                });

                document.getElementById('deleteSelected').addEventListener('click', async () => {
                    const selectedCheckboxes = document.querySelectorAll('.checkbox:checked');
                    for (const checkbox of selectedCheckboxes) {
                        const row = checkbox.closest('tr');
                        const notificaId = row.querySelector('td:first-child').textContent;
                        try {
                            const res = await fetch(`http://localhost:8000/notifiche/${notificaId}`, {
                                method: 'DELETE',
                            });
                            if (res.ok) {
                                row.remove();
                            } else {
                                console.error('Errore nella cancellazione della notifica');
                            }
                        } catch (error) {
                            console.error('Errore nella cancellazione della notifica', error);
                        }
                    }
                });

            } else if (res.status == 404) {
                const tabella = document.getElementById('tabella');
                tabella.classList.add('hidden');

                const divEmpty = document.getElementById('divEmpty');

                const textNotNotification = document.createElement('div');
                textNotNotification.id = 'textNotNotification';
                textNotNotification.classList.add('flex', 'justify-center', 'items-center', 'm-10');
                divEmpty.appendChild(textNotNotification);

                const body = document.getElementById('textNotNotification');
                const h1 = document.createElement('h1');
                h1.textContent = 'Nessuna Notifica';
                h1.classList.add('text-black', 'text-3xl', 'font-bold');

                body.appendChild(h1);
            }
        }
    } else {
        console.error('Utente non trovato nel localStorage');
    }
});



function closeModal() {
    const modal = document.getElementById('modal');
    const backdrop = document.getElementById('modal-backdrop');
    modal.classList.add('hidden');
    backdrop.classList.add('hidden');
    location.reload();
}

