// Variables liées au DOM
const sectionRecipes = document.querySelector("#affichage-recette");
const dropDownAppareils = document.querySelector("#dropdown-appareils");
const dropDownUstensiles = document.querySelector("#dropdown-ustensils");
const dropDownIngredients = document.querySelector("#dropdown-ingredients");
const searchBar = document.getElementById("searchbar");

// Déclaration variables en scope global
let arrayRecipes = [];

//////////////// AFFICHAGE TOUTES RECETTES //////////////////

function allRecipes() {
  recipes.forEach((recipe) => {
    arrayRecipes.push(recipe);
    recipesCard(recipe);
  });
}

//////////////// AFFICHAGE LIEN NAVIGATION/TRI //////////////

let applianceArray = [];
let ustensilArray = [];
let ingredientArray = [];

let applianceArrayFiltered = [];
let ingredientArrayFiltered = [];
let ustensilArrayFiltered = [];

function loadingNav() {
  arrayRecipes.forEach((recipe) => {
    {
      applianceArray.push(recipe.appliance);
    }

    recipe.ustensils.forEach((ustensil) => {
      ustensilArray.push(ustensil);
    });

    recipe.ingredients.forEach((ingredient) => {
      ingredientArray.push(ingredient.ingredient);
    });
  });
}

function navDOM() {
  applianceArrayFiltered = [...new Set(applianceArray)];
  ustensilArrayFiltered = [...new Set(ustensilArray)];
  ingredientArrayFiltered = [...new Set(ingredientArray)];

  console.log(ustensilArray);
  console.log(ustensilArrayFiltered);

  applianceArrayFiltered.forEach((elm) => {
    const link = document.createElement("a");
    link.innerHTML = `<a href="#">${elm}</a>`;
    dropDownAppareils.append(link);
  });

  ustensilArrayFiltered.forEach((elm) => {
    const link = document.createElement("a");
    link.innerHTML = `<a href="#">${elm}</a>`;
    dropDownUstensiles.append(link);
  });

  ingredientArrayFiltered.forEach((elm) => {
    const link = document.createElement("a");
    link.innerHTML = `<a href="#">${elm}</a>`;
    dropDownIngredients.append(link);
  });
}

//////////////// LISTENER SEARCHBAR  ////////////////////////
searchBar.addEventListener("change", () => {
  const enteredValue = searchBar.value.toLowerCase();
  // Reinitialisation du DOM
  sectionRecipes.innerHTML = "";
  dropDownAppareils.innerHTML = "";
  dropDownIngredients.innerHTML = "";
  dropDownUstensiles.innerHTML = "";

  // Reinitialisation des arrays
  arrayRecipes = [];

  applianceArray = [];
  ustensilArray = [];
  ingredientArray = [];

  applianceArrayFiltered = [];
  ingredientArrayFiltered = [];
  ustensilArrayFiltered = [];

  // Si la valeur de la searchbar est supérieur ou égale à 3, tu execute
  if (enteredValue.length >= 3) {
  

    // Variable qui filtre le mot entré dans la barre de recherche
    recipes.filter((recipe) => {
      if (
        recipe.name.toLowerCase().includes(enteredValue) ||
        recipe.description.toLowerCase().includes(enteredValue) ||
        recipe.ingredients.some((i) =>
          i.ingredient.toLowerCase().includes(enteredValue)
        ) ||
        recipe.ustensils.some((u) => u.toLowerCase().includes(enteredValue)) ||
        recipe.appliance.toLowerCase().includes(enteredValue)
      ) {
        // Push + affichage des recettes contenant le mot entré dans la barrde de recherche;

        arrayRecipes.push(recipe);
        recipesCard(recipe);
        loadingNav(recipe);
      }
    });
  } else if (enteredValue.length == 0) {
    arrayRecipes = [];
    allRecipes();
    loadingNav();
  }
  navDOM();
});

//////////////// START FUNCTION ////////////////////////

allRecipes();
loadingNav();
navDOM();
