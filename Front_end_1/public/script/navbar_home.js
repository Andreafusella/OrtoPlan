document.addEventListener('DOMContentLoaded', () => {
    const divImage = document.getElementById('imageNotifica');
    const divImage2 = document.getElementById('imageNotifica2');
    
    imageSign();
    async function imageSign() {
        try {

            const res = await fetch('http://localhost:8000/notificaImage', {
                method: 'GET',
            });
            
            if (res.status == 201) {
                const img = document.createElement('img');
                const img2 = document.createElement('img');
                img.src = '/assets/campanella2.png';
                img2.src = '/assets/campanella2.png';
                img.classList.add('h-10');
                img2.classList.add('h-10');
                divImage.appendChild(img);
                divImage2.appendChild(img2);
            } else if (res.status == 404) {
                const img = document.createElement('img');
                const img2 = document.createElement('img');
                img.src = '/assets/campanella.png';
                img2.src = '/assets/campanella.png';
                img.classList.add('h-10');
                img2.classList.add('h-10');
                divImage.appendChild(img);
                divImage2.appendChild(img2);
            }

        } catch (error) {
            console.log(error);
            console.log('errore ricerca immagine notifica');
        }
    }
});