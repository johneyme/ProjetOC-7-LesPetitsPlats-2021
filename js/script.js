// Variables liées au DOM
const sectionRecipes = document.querySelector("#affichage-recette");
const dropDownAppareils = document.querySelector("#dropdown-appareils");
const dropDownUstensiles = document.querySelector("#dropdown-ustensils");
const dropDownIngredients = document.querySelector("#dropdown-ingredients");
const searchBar = document.getElementById("searchbar");

// Déclaration variables en scope global
let arrayRecipes = []

//////////////// AFFICHAGE TOUTES RECETTES //////////////////

function allRecipes() {
  recipes.forEach((recipe) => {
  arrayRecipes.push(recipe)
  recipesCard(recipe);
});
}



//////////////// AFFICHAGE LIEN NAVIGATION/TRI //////////////
function loadingNav() {
arrayRecipes.forEach((recipe)=> {

  const link = document.createElement('a')
  link.innerHTML = `<a href="#">${recipe.appliance}</a>`
  dropDownAppareils.append(link)


  
  recipe.ustensils.forEach((ustensil)=> {
  const link = document.createElement('a')
  link.innerHTML = `<a href="#">${ustensil}</a>`
  dropDownUstensiles.append(link)
  })

  recipe.ingredients.forEach((ingredient)=> {
    const link = document.createElement('a')
    link.innerHTML = `<a href="#">${ingredient.ingredient}</a>`
    dropDownIngredients.append(link)

  })

})
}


//////////////// LISTENER SEARCHBAR  ////////////////////////
searchBar.addEventListener("change", () => {
  const enteredValue = searchBar.value;
  console.log(enteredValue);
  console.log(enteredValue.length)

  // Si la valeur de la searchbar est supérieur ou égale à 3, tu execute
  if (enteredValue.length >= 3) {
    // Reinitialisation du DOM 
    sectionRecipes.innerHTML = "";
    dropDownAppareils.innerHTML = "";
    dropDownIngredients.innerHTML = "";
    dropDownUstensiles.innerHTML = "";

    
    // Variable qui filtre le mot entré dans la barre de recherche
    recipes.filter((recipe) => {
      if (
        recipe.name.includes(enteredValue) ||
        recipe.description.includes(enteredValue) ||
        recipe.ingredients.some((i) => i.ingredient.includes(enteredValue)) ||
        recipe.ustensils.some((u) => u.includes(enteredValue)) ||
        recipe.appliance.includes(enteredValue)
      ) {
        // Push + affichage des recettes contenant le mot entré dans la barrde de recherche;
        arrayRecipes = []
        arrayRecipes.push(recipe)
        recipesCard(recipe);
        loadingNav(recipe)
      }
    });

  
  }
});

//////////////// START FUNCTION ////////////////////////

allRecipes()
loadingNav()
