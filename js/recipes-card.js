function recipesCard(recipe) {
    
   
     
     const sectionRecipes = document.querySelector("#affichage-recette")
     const div = document.createElement("div")

     
     const ulIngredient = document.createElement("ul")
     ulIngredient.classList.add('list_ingredient')

     const ingredients = recipe.ingredients
     ingredients.forEach(ingredient => {
       const li = document.createElement('li');
       li.innerHTML = `<span class="ingredient-recette">${ingredient.ingredient}</span>: ${ingredient.quantity || ""} ${ingredient.unit || ''}`
       ulIngredient.appendChild(li);
     })


     
     div.setAttribute("class", "carte-recette")

      

      div.innerHTML = `
      
      <img class="img-carte" src="/assets/images/pic_200_4263_0_0_100.jpg" />
      <div class="script-carte">
        <div class="header-carte">
          <h2>${recipe.name}</h2>
          <p class="time-recette"><i class="bi bi-clock"></i> ${recipe.time}Mn</p>
        </div>
        <div class="body-carte">
         ${ulIngredient.outerHTML}
          <p class="etape-recette">
            ${recipe.description}
        </div>
      </div>`;

      sectionRecipes.appendChild(div)
     
    
  }