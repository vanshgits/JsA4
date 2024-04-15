// All Variables in begining
const studentId = document.getElementById("studentid");
const dishName = document.querySelector(".dishname")
const submitBtn = document.querySelector(".submit");
const section = document.querySelector(".section"); 


// The URL for the recipe search at api 
const url = 'https://food-recipes-with-images.p.rapidapi.com/';

// Submit event listner for search button
submitBtn.addEventListener("click", fetchData);

async function fetchData(event) {
    // Adding student name and id
    studentId.textContent = "200556064 - Vanshit Amin";

    // Use preventDefault() to stop the form submitting
    event.preventDefault();

    // Url for img
    const url = `https://food-recipes-with-images.p.rapidapi.com/?q=${dishName.value}`;
    console.log(url);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f34e176af1mshcc3ef5d51dddaa6p145d96jsn9396208bbe19',
            'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
          }
    };

    try {
        const response = await fetch(url, options);
	    const result = await response.json();
        console.log(result);
	    displayResults(result);
    } catch (error) {
        console.error(error);
    }
}
function displayResults(jsonData){
    console.log(jsonData);
    // Clear Previous Results
    while(section.firstChild){
        section.removeChild(section.firstChild);
    }
    // Create variables to save the dishes from the json object
    let dishes = jsonData.d;
    
    // Display error if results are not found
    if(dishes.length == 0){

        const errortitle = document.createElement('p');
        errortitle.textContent = "No Dishes are Found";
        section.appendChild(errortitle);
    }
    else
    {
        for(let i = 0; i< dishes.length; i++)
        {
            // All variables for dish object
            const presentDish = dishes[i];
            const dish = document.createElement('div');
            // Adding class dish to div
            dish.classList.add('dish');
            const id= document.createElement('h3');
            const title = document.createElement('h2');
            const img = document.createElement('img');
            const ingredients = document.createElement('p');
            const instructions = document.createElement('p');
            
            // adding data to dish
            id.textContent = "id: " + presentDish.id;
            title.textContent = presentDish.Title;
            img.src = "http:" + presentDish.Image;
            instructions.textContent = "Instructions:" + "\n" + "\n"  + presentDish.Instructions;
            // Displaying ingredients
            const Ingredients = presentDish.Ingredients;
            ingredients.textContent = "Ingredients:";
            // Display Ingredients using loop
            for (let j in Ingredients) {
                const ingredientItem = document.createElement('li');
                ingredientItem.textContent = Ingredients[j];
                ingredients.appendChild(ingredientItem);
            }
            

            // append all data to dish
            dish.appendChild(id);
            dish.appendChild(title);
            dish.appendChild(img);
            dish.appendChild(ingredients);
            dish.appendChild(instructions);

            // Append dish to section
            section.appendChild(dish);

        }
    }
    
}
// Call the async function to fetch the data

