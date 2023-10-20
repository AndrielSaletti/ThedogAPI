const apiKey = 'live_pA7T5K6Gh7I3upc4s86EXcRL1tSjeC1c9krvzaDJdb0MktNlsZzZ3v8ty9E5UtmN'; // Substitua 'SUA_CHAVE_API' pela sua chave de API real
 
const apiUrl = 'https://api.thecatapi.com/v1/images/search';


let breedImages = [];
let displayedImages = new Set(); 

// Função para buscar e exibir uma imagem de gato
function fetchRandomCatImage() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
            console.error('Ocorreu um erro ao buscar a imagem do gato:', error);
        });
}

var btnaa = document.querySelector('.btnx')


// Função para buscar e exibir uma imagem de gato por raça
function fetchCatImageByBreed(raçaId) {

    
    if (raçaId.trim() === '') {
        function fetchRandomCatImage() {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    var btnx = document.querySelector('.btnx')
                    btnx.style.display = 'block'
                    const catImageURL = data[0].url;
                    const imagemGato = document.getElementById('imagem-gato'
                      );
                    imagemGato.innerHTML = '';
                    const catImage = document.createElement('img');
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
                    imagemGato.appendChild(catImage);
                    
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao buscar a imagem do gato:', error);
                });
        }
    }

    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${raçaId}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                // Adicione a URL da imagem à matriz de imagens da raça
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

// Função para exibir a próxima imagem da raça na matriz
function displayNextBreedImage() {
    
    const imagemGato = document.getElementById('imagem-gato');
    imagemGato.innerHTML = '';
    const catImage = document.createElement('img');

    // Verifique se há imagens na matriz breedImages
    if (breedImages.length > 0) {
        let nextImageURL;
        do {
            // Pegue a próxima URL da imagem
            nextImageURL = breedImages.shift();
        } while (displayedImages.has(nextImageURL) && breedImages.length > 0);

        // Exiba a imagem
        catImage.src = nextImageURL;
        var btnx = document.querySelector('.btnx')
        btnx.style.display = 'block'
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
        imagemGato.appendChild(catImage);
        displayedImages.add(nextImageURL);
    } else {
        alert('Nenhuma imagem encontrada para esta raça.');
    }
}

// Função para buscar as raças disponíveis ao carregar a página
function fetchCatBreeds() {
    fetch('https://api.thecatapi.com/v1/breeds')
        .then(response => response.json())
        .then(data => {
            const selectRaca = document.getElementById('selecionar-raça');
            selectRaca.innerHTML = '';

            const optionDefault = document.createElement('option');
            optionDefault.value = '';
            optionDefault.textContent = 'Especie aleatoria';
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

// Adicione um ouvinte de evento para o botão "Gerar Imagem"
const botaoGerarImagem = document.getElementById('pesquisar-por-raça');
botaoGerarImagem.addEventListener('click', fetchRandomCatImage);

// Adicione um ouvinte de evento para a caixa de seleção de raças
const selectRaca = document.getElementById('selecionar-raça');
selectRaca.addEventListener('change', function () {
    const raçaId = selectRaca.value;
    displayedImages.clear(); // Limpe o conjunto de imagens exibidas ao selecionar uma nova raça
});

// Adicione um ouvinte de evento para o botão "Pesquisar por Raça"
const botaoPesquisarPorRaça = document.getElementById('pesquisar-por-raça');
botaoPesquisarPorRaça.addEventListener('click', function () {
    const raçaId = selectRaca.value;
    fetchCatImageByBreed(raçaId);
});

// Chame a função para buscar as raças disponíveis ao carregar a página
fetchCatBreeds();

// Função para buscar e exibir uma imagem de gato ao carregar a página
function fetchRandomCatImageOnLoad() {
    fetchRandomCatImage();
}

// Adicione um ouvinte de evento para quando a página estiver totalmente carregada
window.addEventListener('load', fetchRandomCatImageOnLoad);


