


    document.querySelector(".button-get-menu").addEventListener("click", getRecipe);
    
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`;
    const inputIngredient = document.getElementById("ingridient");
    const titleMeal = document.querySelector(".title-meal");
    const image = document.getElementById("image");
    const instructionsMeal = document.querySelector(".instructions");
    const body = document.getElementsByTagName('body'); 
    console.log(body[0].children[3]);       // Access the hidden div that'll show the meal to get the number of children.
    const showMeal = document.getElementById('show-meal');
    const showInstructions = document.getElementById('show-instructions') 


    
    
    
    async function getRecipe(){

        const response = await fetch(url);      
        const ingredientValue = inputIngredient.value; 
        const hiddenElements = document.querySelectorAll(".hidden");        //Select all the hidden elements.
        let toggleElement = true;       // Toggle to show/hide hiddenElements.

        try {
            if(!response.ok){
                throw new Error("Error whilst fetching recipes");       //Throw error if the resonse is NOT ok.
            }


            if(hiddenElements){     
                for(let hiddenElement of hiddenElements){       //If hiddenElements is true, show them.
                    hiddenElement.style.display = "inline";
                }
            }
            
            if(ingredientValue.trim().toLowerCase() === "arrabiata"){       //Input must be "arrabiata".
                const data = await response.json();     //Await response and convert it to json.
                console.log(data.meals[0])
                //Array that shows the ingridients and how I accessed them.
                const arrayIngr = [
                    data.meals[0].strIngredient1 + ", " + data.meals[0].strMeasure1, 
                    data.meals[0].strIngredient2 + ", " + data.meals[0].strMeasure2,
                    data.meals[0].strIngredient3 + ", " + data.meals[0].strMeasure3,
                    data.meals[0].strIngredient4 + ", " + data.meals[0].strMeasure4,
                    data.meals[0].strIngredient5 + ", " + data.meals[0].strMeasure5,
                    data.meals[0].strIngredient6 + ", " + data.meals[0].strMeasure6, 
                    data.meals[0].strIngredient7 + ", " + data.meals[0].strMeasure7,
                    data.meals[0].strIngredient8 + ", " + data.meals[0].strMeasure8
                ];

                console.log(arrayIngr);
                
                image.src = "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
                const ingredientList = document.createElement("div");       //Create a div element.
                const ingredientTitle = document.createElement("h4");       //Create an h4 element.
                const ingridientUl = document.createElement("ul");          //Create an ul element.
                ingredientList.id = "ingridients";      //Assign the id of "ingridients" to the div element.
                ingredientTitle.id = "ingridient-title";        //Assign the id of "ingridient-title" to the h4 element.

                showMeal.insertBefore(ingredientList, showInstructions);        //Insert the div before the instructions, within the showMeal element.
                ingredientList.appendChild(ingridientUl);       //Append the ul list. 
                showMeal.insertBefore(ingredientTitle, ingredientList);     //Insert the title before the list.

                ingredientTitle.innerHTML = "Ingredients";      //Define the value of the h4 element.
                
                for(let i = 0; i < arrayIngr.length; i += 1){       //Loop through the ingridients array, create a li element for every item.
                    console.log(arrayIngr[i]);
                    const listedIngridients = document.createElement("li");
                    listedIngridients.id = "ingredient"
                    listedIngridients.innerHTML = arrayIngr[i];
                    ingridientUl.appendChild(listedIngridients);
                }

                const titleValue = data.meals[0].strMeal;       //Access the name of the dish.
                const instructionsValue = data.meals[0].strInstructions;        //Access the instructions.
                titleMeal.textContent = titleValue;     //Assign the name of the dish to the title of the meal.
                instructionsMeal.textContent = instructionsValue;       //Same for the instructions.
                inputIngredient.value = "";     //Reset the value of the input.
            
                    } else {
                         toggleElement = false;     //Assign toggle to false, and loop through the array of hiddenElements.
                        if(!toggleElement){
                            for(let hiddenElement of hiddenElements){       
                                 hiddenElement.style.display = "none";      //Don't display them.
                                }

                //Hide or reset all the meal description.    

                titleMeal.textContent = "";
                instructionsMeal.textContent = "";
                inputIngredient.value = "";
                alert("No recipe found. Try again.");       //Alert message.
            }
        }
        
    }
    catch(error){
        console.log(error);
    }
 }
