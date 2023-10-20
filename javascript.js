const apiKey = 'live_pA7T5K6Gh7I3upc4s86EXcRL1tSjeC1c9krvzaDJdb0MktNlsZzZ3v8ty9E5UtmN'; 
const apiUrl = 'https://api.thecatapi.com/v1/images/search';

let breedImages = [];
let displayedImages = new Set(); 

function fetchRandomCatImage() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const catImageURL = data[0].url;
            const imagemGato = document.getElementById('imagem-gato');
            imagemGato.innerHTML = '';
            const catImage = document.createElement('img');
            const btnaa = document.querySelector('.btnx');
            btnaa.style.display = 'block';
            btnaa.addEventListener('click', function() {
                if (!document.fullscreenElement) {
                    catImage.requestFullscreen();
                } 
            });
            catImage.addEventListener('click', function() {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } 
            });
            catImage.src = catImageURL;
            catImage.style.maxWidth = '500px';
            catImage.style.maxHeight = '302px';
            catImage.style.borderRadius = '3px';
            imagemGato.appendChild(catImage);
        })
        .catch(error => {
            console.error('Ocorreu um erro ao buscar a imagem do gato:', error);
        });
}

function fetchCatImageByBreed(raçaId) {
    if (raçaId.trim() === '') {
        fetchRandomCatImage();
        return;
    }

    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${raçaId}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                breedImages = breedImages.concat(data.map(imageData => imageData.url));
                displayNextBreedImage();
            } else {
                console.log('Nenhuma imagem encontrada para esta raça.');
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro ao buscar a imagem do gato por raça:', error);
        });
}

function displayNextBreedImage() {
    const imagemGato = document.getElementById('imagem-gato');
    imagemGato.innerHTML = '';
    const catImage = document.createElement('img');

    if (breedImages.length > 0) {
        let nextImageURL;
        do {
            nextImageURL = breedImages.shift();
        } while (displayedImages.has(nextImageURL) && breedImages.length > 0);

        catImage.src = nextImageURL;
        const btnx = document.querySelector('.btnx');
        btnx.style.display = 'block';
        const btnaa = document.querySelector('.btnx');
        btnaa.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                catImage.requestFullscreen();
            } 
        });
        catImage.addEventListener('click', function() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } 
        });
        catImage.style.maxWidth = '500px';
        catImage.style.maxHeight = '302px';
        catImage.style.borderRadius = '3px';
        imagemGato.appendChild(catImage);
        displayedImages.add(nextImageURL);
    } else {
        alert('Nenhuma imagem encontrada para esta raça.');
    }
}

function fetchCatBreeds() {
    fetch('https://api.thecatapi.com/v1/breeds')
        .then(response => response.json())
        .then(data => {
            const selectRaca = document.getElementById('selecionar-raça');
            selectRaca.innerHTML = '';

            const optionDefault = document.createElement('option');
            optionDefault.value = '';
            optionDefault.textContent = 'Espécie aleatoria';
            selectRaca.appendChild(optionDefault);

            data.forEach(raça => {
                const option = document.createElement('option');
                option.value = raça.id;
                option.textContent = raça.name;
                selectRaca.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Ocorreu um erro ao buscar as raças de gato:', error);
        });
}

const botaoGerarImagem = document.getElementById('pesquisar-por-raça');
botaoGerarImagem.addEventListener('click', fetchRandomCatImage);

const selectRaca = document.getElementById('selecionar-raça');
selectRaca.addEventListener('change', function () {
    const raçaId = selectRaca.value;
    displayedImages.clear(); 
});

const botaoPesquisarPorRaça = document.getElementById('pesquisar-por-raça');
botaoPesquisarPorRaça.addEventListener('click', function () {
    const raçaId = selectRaca.value;
    fetchCatImageByBreed(raçaId);
});

fetchCatBreeds();

function fetchRandomCatImageOnLoad() {
    fetchRandomCatImage();
}

window.addEventListener('load', fetchRandomCatImageOnLoad);
