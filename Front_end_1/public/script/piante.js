document.addEventListener('DOMContentLoaded', () => {
    async function fetchPiante() {
        try {
            const res = await fetch('http://localhost:8000/piante', {
                method: 'GET',
            });

            if (res.status === 201) {
                const arr_img = [
                    '/plants/pomodoro.png',
                    '/plants/basilico.png',
                    '/plants/mais.png',
                    '/plants/lattuga.png',
                    '/plants/carota.png',
                    '/plants/melanzana.png',
                    '/plants/peperone.png',
                    '/plants/fagiolo.png',
                    '/plants/limone.png',
                    '/plants/arancia.png',
                ];
                const arr_desc = [
                    "Il pomodoro (Solanum lycopersicum) è una pianta della famiglia delle Solanaceae,originaria dell'America centrale e meridionale. Coltivato in tutto il mondo, è noto per i suoi frutti rossi, succosi e nutrienti, ricchi di vitamine A e C. Utilizzato in una vasta gamma di piatti, il pomodoro è un ingrediente fondamentale nella cucina mediterranea. La sua coltivazione richiede un clima caldo e soleggiato, con un terreno ben drenato e ricco di sostanze nutritive.",
                    "Il basilico è una pianta aromatica dal profumo intenso e fresco, ampiamente utilizzata in cucina mediterranea. Apprezzato per il suo sapore unico, il basilico è un ingrediente fondamentale in piatti come il pesto e la caprese. Oltre alle sue qualità culinarie, il basilico offre anche benefici per la salute grazie alle sue proprietà antiossidanti e antibatteriche.",
                    "Il mais è un cereale originario dell'America centrale e meridionale, noto per le sue spighe gialle caratteristiche. È una fonte importante di carboidrati, fibre, vitamine e minerali, ed è utilizzato in molte cucine del mondo per preparare piatti come tortillas, polenta, popcorn e insalate. Grazie alla sua versatilità e al suo valore nutrizionale, il mais è un alimento ampiamente coltivato e consumato in tutto il mondo.",
                    "La lattuga è una verdura a foglia verde, croccante e dal sapore delicato, comunemente utilizzata nelle insalate e come guarnizione in molti piatti. È ricca di acqua, vitamine, minerali e fibre, rendendola un'opzione salutare per arricchire la dieta quotidiana. Grazie alla sua consistenza fresca e leggera, la lattuga è un ingrediente versatile che si presta a molte preparazioni culinarie, aggiungendo colore e freschezza ai piatti.",
                    "Le carote sono radici commestibili di colore arancione brillante, ricche di beta-carotene, vitamine e antiossidanti. Spesso consumate crude come snack o in insalate, le carote possono anche essere cotte, grigliate o usate come ingrediente in una varietà di piatti, dai sughi alle zuppe. La loro dolcezza naturale le rende popolari sia tra adulti che bambini, mentre il loro contenuto di fibre e nutrienti le rende un'aggiunta nutriente a una dieta equilibrata.",
                    "Le melanzane sono ortaggi apprezzati per la loro versatilità in cucina, essendo protagoniste di ricette come la parmigiana o le melanzane ripiene. Di colore viola scuro, sono ricche di fibre e antiossidanti, contribuendo così a una dieta equilibrata e salutare.",
                    "I peperoni, ortaggi dal gusto succulento e versatile, crescono meglio in climi caldi e terreni ben drenati. Disponibili in una varietà di colori e sapori, dalla dolcezza del rosso al pizzico del verde, arricchiscono piatti e insalate con il loro vibrante aroma e colore. Coltivare peperoni può essere gratificante, offrendo una varietà di opzioni culinarie in cucina.",
                    "I fagioli, preziosi legumi ricchi di proteine e fibre, prosperano in terreni ben drenati e soleggiati. Con una vasta gamma di varietà, dai fagioli neri ai cannellini, offrono versatilità in cucina, arricchendo zuppe, insalate e piatti principali. La coltivazione dei fagioli può essere gratificante, offrendo un'abbondante raccolta di legumi nutrienti per una cucina sana e deliziosa.",
                    "I limoni, dai loro alberi sempreverdi e rigogliosi, regalano un'esplosione di freschezza e vitalità. Le loro brillanti sfumature gialle illuminano gli orti e i giardini, mentre i loro frutti succosi e profumati aggiungono un tocco di acidità e vivacità a piatti dolci e salati. Coltivare limoni richiede cure amorevoli e pazienza, ma le ricompense sono frutti deliziosi e una fragranza che pervade l'aria, donando gioia e gusto alla vita quotidiana.",
                    "Le arance, frutti iconici degli agrumeti, si distinguono per il loro colore brillante e il sapore succoso e dolce. Le piante di arancio, con le loro foglie verde scuro e i fiori profumati, aggiungono bellezza e vitalità al paesaggio. Coltivarle richiede un clima caldo e ben drenato, ma la ricompensa è un raccolto di frutti deliziosi, ricchi di vitamina C e perfetti per spremute fresche o gustosi dessert.",
                ]

                const data = await res.json();
                const container = document.getElementById('pianteContainer');
                const modal = document.getElementById('modal');
                const modalTitle = document.getElementById('modalTitle');
                const modalImage = document.getElementById('modalImage');
                const modalDescrizione = document.getElementById('modalDescrizione');
                const modalRaccolta = document.getElementById('modalRaccolta');
                const modalAcqua = document.getElementById('modalAcqua');
                const closeModal = document.getElementById('closeModal');

                let row;
                let i = 0;
                data.forEach((pianta, index) => {
                    // Crea una nuova riga ogni 4 piante
                    if (index % 4 === 0) {
                        row = document.createElement('div');
                        row.className = 'flex flex-wrap justify-center gap-10 mb-10';
                        container.appendChild(row);
                    }

                    
                    const piantaDiv = document.createElement('div');
                    piantaDiv.className = 'pianta-container bg-gray-300 p-8 rounded-2xl md:flex md:flex-col flex-col items-center shadow-2xl cursor-pointer';
                    piantaDiv.addEventListener('click', () => {
                        modalTitle.textContent = pianta.nome;
                        modalImage.src = arr_img[index];
                        modalDescrizione.textContent = arr_desc[index]
                        modalRaccolta.textContent = `Tempo di raccolta: ${pianta.t_raccolta} Giorni`;
                        modalAcqua.textContent = `Tempo di annaffiatura: Ogni ${pianta.t_acqua} Giorni`;
                        modal.showModal();
                    });

                    const titleDiv = document.createElement('div');
                    const title = document.createElement('h1');
                    title.id = `pianta${index}`;
                    title.className = 'text-center text-white text-xl font-bold';
                    title.textContent = pianta.nome;
                    titleDiv.appendChild(title);
                    piantaDiv.appendChild(titleDiv);

                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'img-container flex justify-center items-center h-44';
                    const img = document.createElement('img');
                    img.src = arr_img[i];
                    i += 1;
                    img.alt = '';
                    img.className = 'max-h-full max-w-full';
                    imgContainer.appendChild(img);
                    piantaDiv.appendChild(imgContainer);

                    const raccoltaDiv = document.createElement('div');
                    raccoltaDiv.className = 'flex gap-3 justify-center mt-4';
                    const raccoltaImg = document.createElement('img');
                    raccoltaImg.src = '/assets/raccolta.png';
                    raccoltaImg.alt = '';
                    raccoltaImg.className = 'h-10';
                    const raccoltaP = document.createElement('p');
                    raccoltaP.id = `t_raccolta_pianta${index}`;
                    raccoltaP.className = 'flex items-center justify-center text-xl text-white font-bold';
                    raccoltaP.textContent = pianta.t_raccolta;
                    raccoltaDiv.appendChild(raccoltaImg);
                    raccoltaDiv.appendChild(raccoltaP);
                    piantaDiv.appendChild(raccoltaDiv);

                    const acquaDiv = document.createElement('div');
                    acquaDiv.className = 'flex gap-3 justify-center mt-4';
                    const acquaImg = document.createElement('img');
                    acquaImg.src = '/assets/annaffiatoio.png';
                    acquaImg.alt = '';
                    acquaImg.className = 'h-10';
                    const acquaP = document.createElement('p');
                    acquaP.id = `t_acqua_pianta${index}`;
                    acquaP.className = 'flex items-center justify-center text-xl text-white font-bold';
                    acquaP.textContent = pianta.t_acqua;
                    acquaDiv.appendChild(acquaImg);
                    acquaDiv.appendChild(acquaP);
                    piantaDiv.appendChild(acquaDiv);

                    row.appendChild(piantaDiv);
                });

                closeModal.addEventListener('click', () => {
                    modal.close();
                });

                console.log('Piante trovate:', data);
            } else {
                console.error('Errore ricerca piante');
                document.getElementById('pianteContainer').textContent = 'Errore ricerca piante';
            }
        } catch (error) {
            console.error('Errore nella fetch:', error);
            document.getElementById('pianteContainer').textContent = 'Errore nella fetch';
        }
    }

    fetchPiante();
});
