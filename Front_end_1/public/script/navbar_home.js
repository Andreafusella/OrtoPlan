document.addEventListener('DOMContentLoaded', () => {
    const divImage = document.getElementById('imageNotifica');
    
    imageSign();
    async function imageSign() {
        try {
               
            const res = await fetch('http://localhost:8000/notificaImage', {
                method: 'GET',
            });
            
            const img = document.createElement('img');
            
            console.log(res);
            if (res.status == 201) {
                img.src = '/assets/campanella2.png';
                img.classList.add('h-10');
            } else if (res.status == 404) {
                img.src = '/assets/campanella.png';
                img.classList.add('h-10');
            }
            divImage.appendChild(img);

        } catch (error) {

            console.log(error);
            console.log('errore ricerca immagine notifica');

        }
    }
}) 