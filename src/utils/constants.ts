
export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

const settings = {
  
};
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      
      const cardTitle = document.createElement('h2');
      cardTitle.innerText = item.title;
      cardElement.appendChild(cardTitle);
      
      const cardImage = document.createElement('img');
      cardImage.src = `${CDN_URL}/${item.image}`;
      cardElement.appendChild(cardImage);
      
      document.getElementById('card-container').appendChild(cardElement);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
