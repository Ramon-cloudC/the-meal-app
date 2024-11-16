
    document.querySelector(".button-get-menu").addEventListener("click", getRecipe);
    
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`;
    const inputIngredient = document.getElementById("ingridient");
    const titleMeal = document.querySelector(".title-meal");
    const image = document.getElementById("image");
    const instructionsMeal = document.querySelector(".instructions");
    const body = document.getElementsByTagName('body');
    
    // Access the hidden div that'll show the meal to get the number of children.
    console.log(body[0].children[3]);       

    const showMeal = document.getElementById('show-meal');
    const showInstructions = document.getElementById('show-instructions') 

    async function getRecipe(){

        //Must await the fetch and save it to a variable.
        const response = await fetch(url);      
        const ingredientValue = inputIngredient.value;
        //Select all the hidden elements.
        const hiddenElements = document.querySelectorAll(".hidden");
        // Toggle to show/hide hiddenElements.        
        let toggleElement = true;       

        try {
            if(!response.ok){
                //Throw error if the resonse is NOT ok.
                throw new Error("Error whilst fetching recipes");       
            }


            if(hiddenElements){     
                //If hiddenElements is true, show them.
                for(let hiddenElement of hiddenElements){       
                    hiddenElement.style.display = "inline";
                }
            }
            
            //Input must be "arrabiata".
            if(ingredientValue.trim().toLowerCase() === "arrabiata"){
                //Await response and convert it to json.       
                const data = await response.json();     
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
                //Assign the id of "ingridients" to the div element.
                ingredientList.id = "ingredients";      
                //Assign the id of "ingridient-title" to the h4 element.
                ingredientTitle.id = "ingridient-title";        
                
                //Insert the div before the instructions, within the showMeal element.
                showMeal.insertBefore(ingredientList, showInstructions);
                //Append the ul list.         
                ingredientList.appendChild(ingridientUl);       
                //Insert the title before the list.
                showMeal.insertBefore(ingredientTitle, ingredientList);     

                //Define the value of the h4 element.
                ingredientTitle.innerHTML = "Ingredients";      
                
                //Loop through the ingridients array, create a li element for every item.
                for(let i = 0; i < arrayIngr.length; i++){       
                    console.log(arrayIngr[i]);
                    const listedIngridients = document.createElement("li");
                    listedIngridients.classList.add("ingredient");
                    listedIngridients.innerHTML = arrayIngr[i];
                    ingridientUl.appendChild(listedIngridients);
                }

                //Access the name of the dish.
                const titleValue = data.meals[0].strMeal;       
                //Access the instructions.
                const instructionsValue = data.meals[0].strInstructions;
                //Assign the name of the dish to the title of the meal.        
                titleMeal.textContent = titleValue;     
                 //Same for the instructions.
                instructionsMeal.textContent = instructionsValue;
                //Reset the value of the input.      
                inputIngredient.value = "";     
            
                    } else {
                        //Assign toggle to false, and loop through the array of hiddenElements.
                         toggleElement = false;     
                        if(!toggleElement){
                            for(let hiddenElement of hiddenElements){       
                                //Don't display them.
                                 hiddenElement.style.display = "none";      
                                }

                //Hide or reset all the meal description.    
                titleMeal.textContent = "";
                instructionsMeal.textContent = "";
                inputIngredient.value = "";
                //Alert message.
                alert("No recipe found. Try again.");       
            }
        }
        
    }
    catch(error){
        console.log(error);
    }
 }
