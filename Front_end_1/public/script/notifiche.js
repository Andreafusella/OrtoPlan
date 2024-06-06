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
                    const imgCell = document.createElement('img');
                    
                    if (notifica.tipo == 0) {
                        imgCell.src = '/assets/annaffiatoio.png';
                        imgCell.classList.add('h-10');
                    } else if (notifica.tipo == 1) {
                        imgCell.src = '/assets/raccolta.png';
                        imgCell.classList.add('h-10');
                    } else if (notifica.tipo == 2) {
                        imgCell.src = '/assets/pioggia.png';
                        imgCell.classList.add('h-12')
                    } else if (notifica.tipo == 3) {
                        imgCell.src = '/assets/caldo.png';
                        imgCell.classList.add('h-12')
                    }else if (notifica.tipo == 4) {
                        imgCell.src = '/assets/pioggia.png';
                        imgCell.classList.add('h-12')
                    }

                    idCell.appendChild(imgCell);
                    idCell.classList.add('px-4', 'py-2');

                    const piantagioneCell = document.createElement('td');
                    piantagioneCell.textContent = notifica.nome_piantagione;
                    piantagioneCell.classList.add('px-4', 'py-2');

                    const testoCell = document.createElement('td');
                    testoCell.classList.add('px-4', 'py-2');

                    const data_invioCell = document.createElement('td');
                    const data_invio = notifica.data_invio;
                    let data = new Date(data_invio);

                    

                    let anno = data.getFullYear();
                    console.log(anno);
                    let mese = ('0' + (data.getMonth() + 1)).slice(-2); 
                    console.log(mese);
                    let giorno = ('0' + data.getDate()).slice(-2);
                    console.log(giorno);

                    let data_formattata = `${giorno}/${mese}/${anno}`;

                    data_invioCell.textContent = data_formattata;
                    data_invioCell.classList.add('px-4', 'py-2', 'text-black')

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

                        if (notifica.tipo == 0) {
                            titolo.textContent = '💧 Annaffiare 💧';
                        } else if (notifica.tipo == 1) {
                            titolo.textContent = '🍾 Raccolta 🍾';
                        } else if (notifica.tipo == 2) {
                            titolo.textContent = '🌧️ Pioggia 🌧️';
                        } else if (notifica.tipo ==  3) {
                            titolo.textContent = '🔥 Alta temperatura 🔥';
                        } else if (notifica.tipo == 4) {
                            titolo.textContent = '🌧️ Pioggia 🌧️';
                        }
                        titolo.classList.add('text-3xl', 'text-black', 'font-bold', 'mb-3', 'text-center');

                        const testo = document.createElement('h1');
                        testo.classList.add('text-xl', 'text-black', 'font-bold', 'text-center');
                        

                        let testo_notifica = notifica.testo;
                        testo_notifica = testo_notifica.replace(/piantagione:\s*\w+/, "piantagione:");
                        testo.textContent = testo_notifica;

                        const nomePiantagione = document.createElement('h1');
                        nomePiantagione.textContent = notifica.nome_piantagione;
                        nomePiantagione.classList.add('text-3xl', 'text-red-500', 'font-bold', 'text-center', 'mt-10');


                        modalText.appendChild(titolo);
                        modalText.appendChild(testo);
                        modalText.appendChild(nomePiantagione);
                        
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
                    row.appendChild(data_invioCell);
                    row.appendChild(testoCell);
                    

                    tableBody.appendChild(row);
                });

                document.getElementById('close-modal').addEventListener('click', () => {
                    document.getElementById('modal').classList.add('hidden');
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
                h1.classList.add('text-black', 'text-3xl', 'font-bold', 'mb-10');

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

async function deleteNotifiche(){
    try {

        const res = await fetch('http://localhost:8000/deleteNotifiche',{
            method: 'DELETE',
        });

        if (res.status == 201) {
            console.log('notifiche eliminate correttamente');

            const countNotifiche = await res.json();

            //elimina prima di ricrearla
            const oldTextNotNotification = document.getElementById('textNotNotification');
            if (oldTextNotNotification) {
                oldTextNotNotification.remove();
            }

            const h1 = document.createElement('h1');
            if(countNotifiche.count == 1){
                h1.textContent = `E' stata eliminata 1 notifica`
            } else {
                h1.textContent = `Sono state elimiante ${countNotifiche.count} notifiche`
            }
            const tabella = document.getElementById('tabella');
            tabella.classList.add('hidden');
            const divEmpty = document.getElementById('divEmpty');

            const textNotNotification = document.createElement('div');
            textNotNotification.id = 'textNotNotification';
            textNotNotification.classList.add('flex', 'justify-center', 'items-center', 'm-10');
            divEmpty.appendChild(textNotNotification);

            const body = document.getElementById('textNotNotification');
            h1.classList.add('text-black', 'text-3xl', 'font-bold', 'mb-10');

            body.appendChild(h1);


        } else {
            console.log('errore delte notifiche');
        }

    } catch(error) {
        console.log(error);
        console.log('errore cancellazione notifiche');
    }
}