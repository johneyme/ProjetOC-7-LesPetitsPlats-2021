// Variables liées au DOM
const sectionRecipes = document.querySelector("#affichage-recette");
const dropDownAppareils = document.querySelector("#dropdown-appareils");
const dropDownUstensiles = document.querySelector("#dropdown-ustensils");
const dropDownIngredients = document.querySelector("#dropdown-ingredients");
const selectorContain = document.querySelector(".selector-contain");
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

  //Tri des arrays qui enlève les doublons
  applianceArrayFiltered = [...new Set(applianceArray)];
  ustensilArrayFiltered = [...new Set(ustensilArray)];
  ingredientArrayFiltered = [...new Set(ingredientArray)];

  // fonction qui affiche dans les liens de navigaytions les éléments des recettes présente dans arrayRecipes

  applianceArrayFiltered.forEach((elm) => {
    const link = document.createElement("a");
    link.classList.add('link-nav', 'appareils')
    let string = elm[0].toUpperCase() + elm.slice(1); 
    link.innerHTML = `${string}`;
    dropDownAppareils.append(link);
    
  });

  ustensilArrayFiltered.forEach((elm) => {
    const link = document.createElement("a");
    link.classList.add('link-nav', 'ustensiles')
    let string = elm[0].toUpperCase() + elm.slice(1); 
    link.innerHTML = `${string}`;
    dropDownUstensiles.append(link);
  });

  ingredientArrayFiltered.forEach((elm) => {
    const link = document.createElement("a");
    link.classList.add('link-nav', 'ingredients')
    let string = elm[0].toUpperCase() + elm.slice(1); 
    link.innerHTML = `${string}`;
    dropDownIngredients.append(link);

  });

  // fonction qui va afficher un tag lorsque l'on clique sur un des liens

  const linkNavIngredient = document.querySelectorAll("a.link-nav.ingredients")
  const linkNavUstensiles = document.querySelectorAll("a.link-nav.ustensiles")
  const linkNavAppareils = document.querySelectorAll("a.link-nav.appareils")

  linkNavUstensiles.forEach((link) => {
    link.addEventListener('click', () => {
      const tag = document.createElement("div");
      tag.classList.add('add-selector');
      tag.classList.add('ustensiles');
      tag.innerHTML = `${link.innerHTML}<div class="close-selector"><i class="bi bi-x-circle"></i></div>`;
      selectorContain.appendChild(tag)
      closeTag()

    })
  })

  linkNavAppareils.forEach((link) => {
    link.addEventListener('click', () => {
      const tag = document.createElement("div");
      tag.classList.add('add-selector');
      tag.classList.add('appareils');
      tag.innerHTML = `${link.innerHTML}<div class="close-selector"><i class="bi bi-x-circle"></i></div>`;
      selectorContain.appendChild(tag)
      closeTag()

    })
  })
  

  linkNavIngredient.forEach((link) => {
    link.addEventListener('click', () => {
      const tag = document.createElement("div");
      tag.classList.add('add-selector');
      tag.classList.add('ingredient');
      tag.innerHTML = `${link.innerHTML}<div class="close-selector"><i class="bi bi-x-circle"></i></div>`;
      selectorContain.appendChild(tag)
      closeTag()

    })
    
  })

}

function closeTag(){
  const closeSelector = document.querySelectorAll(".close-selector")
  closeSelector.forEach((link) =>{
    link.addEventListener('click',()=> {
      link.parentElement.remove()
    })
  })}



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
closeTag()

