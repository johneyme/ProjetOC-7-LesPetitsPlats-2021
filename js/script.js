// Variables liées au DOM
const sectionRecipes = document.querySelector("#affichage-recette");
const dropDownAppareils = document.querySelector("#dropdown-appareils");
const dropDownUstensiles = document.querySelector("#dropdown-ustensils");
const dropDownIngredients = document.querySelector("#dropdown-ingredients");
const selectorContain = document.querySelector(".selector-contain");
const searchBar = document.getElementById("searchbar");
const tagSelector = document.querySelectorAll(".add-selector");

// Déclaration variables/Array en scope global
let arrayRecipes = [];
let tagList = [];

let applianceArray = [];
let ustensilArray = [];
let ingredientArray = [];

let applianceArrayFiltered = [];
let ingredientArrayFiltered = [];
let ustensilArrayFiltered = [];


//////////////// AFFICHAGE TOUTES RECETTES //////////////////

function allRecipes() {
  recipes.forEach((recipe) => {
    arrayRecipes.push(recipe);
    recipesCard(recipe);
  });
}

//////////////// AFFICHAGE LIEN NAVIGATION/TRI //////////////



function loadingNav() {
  arrayRecipes.forEach((recipe) => {
    {
      applianceArray.push(recipe.appliance.toLowerCase());
    }

    recipe.ustensils.forEach((ustensil) => {
      ustensilArray.push(ustensil.toLowerCase());
    });

    recipe.ingredients.forEach((ingredient) => {
      ingredientArray.push(ingredient.ingredient.toLowerCase());
    });
  });

  //Tri des arrays qui enlève les doublons
  applianceArrayFiltered = [...new Set(applianceArray)];
  ustensilArrayFiltered = [...new Set(ustensilArray)];
  ingredientArrayFiltered = [...new Set(ingredientArray)];
}


function navDOM() {

  applianceArrayFiltered = applianceArrayFiltered.sort();
  ustensilArrayFiltered = ustensilArrayFiltered.sort();
  ingredientArrayFiltered = ingredientArrayFiltered.sort();
  // fonction qui affiche dans les liens de navigations les éléments des recettes présente dans arrayRecipes

  applianceArrayFiltered.forEach((elm) => {
    const link = document.createElement("a");
    link.classList.add("link-nav", "appareils");
    let string = elm[0].toUpperCase() + elm.slice(1);
    link.innerHTML = `${string}`;
    dropDownAppareils.append(link);
  });

  ustensilArrayFiltered.forEach((elm) => {
    const link = document.createElement("a");
    link.classList.add("link-nav", "ustensiles");
    let string = elm[0].toUpperCase() + elm.slice(1);
    link.innerHTML = `${string}`;
    dropDownUstensiles.append(link);
  });

  ingredientArrayFiltered.forEach((elm) => {
    const link = document.createElement("a");
    link.classList.add("link-nav", "ingredients");
    let string = elm[0].toUpperCase() + elm.slice(1);
    link.innerHTML = `${string}`;
    dropDownIngredients.append(link);
  });

  // Affichage d'un tag lorsque l'on clique sur un des liens

  const linkNavIngredient = document.querySelectorAll("a.link-nav.ingredients");
  const linkNavUstensiles = document.querySelectorAll("a.link-nav.ustensiles");
  const linkNavAppareils = document.querySelectorAll("a.link-nav.appareils");

  linkNavUstensiles.forEach((link) => {
    link.addEventListener("click", () => {
      // Manipulation DOM
      const tag = document.createElement("div");
      const divCross = document.createElement("div");
      const closeCross = document.createElement("i");
      tag.classList.add("add-selector");
      tag.classList.add("ustensiles");
      divCross.classList.add("close-selector");
      closeCross.classList.add("bi");
      closeCross.classList.add("bi-x-circle");
      tag.innerHTML = `${link.innerHTML}`;
      tag.appendChild(divCross);
      divCross.appendChild(closeCross);
      selectorContain.appendChild(tag);
      // Manipulation Array
      tagList.push(link.innerHTML.toLowerCase());
      ustensilArrayFiltered = ustensilArrayFiltered.filter(
        (tag) => tag != link.innerHTML.toLowerCase()
      );

      link.remove();
      closeTag(closeCross, tag);
    });

  });

  linkNavAppareils.forEach((link) => {
    link.addEventListener("click", () => {
      // Manipulation DOM
      const tag = document.createElement("div");
      const divCross = document.createElement("div");
      const closeCross = document.createElement("i");
      tag.classList.add("add-selector");
      tag.classList.add("appareils");
      divCross.classList.add("close-selector");
      closeCross.classList.add("bi");
      closeCross.classList.add("bi-x-circle");
      tag.innerHTML = `${link.innerHTML}`;
      tag.appendChild(divCross);
      divCross.appendChild(closeCross);
      selectorContain.appendChild(tag);
      // Manipulation Array
      tagList.push(link.innerHTML.toLowerCase());
      applianceArrayFiltered = applianceArrayFiltered.filter(
        (tag) => tag != link.innerHTML.toLowerCase()
      );

      link.remove();
      closeTag(closeCross, tag);
    });
  });

  linkNavIngredient.forEach((link) => {
    link.addEventListener("click", () => {
      // Manipulation DOM
      const tag = document.createElement("div");
      const divCross = document.createElement("div");
      const closeCross = document.createElement("i");
      tag.classList.add("add-selector");
      tag.classList.add("ingredient");
      divCross.classList.add("close-selector");
      closeCross.classList.add("bi");
      closeCross.classList.add("bi-x-circle");
      tag.innerHTML = `${link.innerHTML}`;
      tag.appendChild(divCross);
      divCross.appendChild(closeCross);
      selectorContain.appendChild(tag);
      // Manipulation Array
      tagList.push(link.innerHTML.toLowerCase());
      ingredientArrayFiltered = ingredientArrayFiltered.filter(
        (tag) => tag != link.innerHTML.toLowerCase()
      );

      link.remove();
      closeTag(closeCross, tag);
    });
  });
}

////////////////// FONCTION CROIX FERMETURE TAG ////////////////////////

function closeTag(closeCross, tag) {
  closeCross.addEventListener("click", (link) => {
    const tagToClose = link.path[2].textContent;
    const typeOfTag = link.path[2].className;
    tagList = tagList.filter((tag) => tag != tagToClose);
    if (typeOfTag.includes("appareils")) {
      applianceArrayFiltered.push(tagToClose.toLowerCase());
    }
    if (typeOfTag.includes("ingredient")) {
      ingredientArrayFiltered.push(tagToClose.toLowerCase());
    }
    if (typeOfTag.includes("ustensiles")) {
      ustensilArrayFiltered.push(tagToClose.toLowerCase());
    }
    tag.remove();
    dropDownAppareils.innerHTML = "";
    dropDownIngredients.innerHTML = "";
    dropDownUstensiles.innerHTML = "";
    navDOM();
  });

}


//////////////// FONCTION TRI DES RECETTES EN FONCTION DE ENTEREDVALUE  ////////////////////////


function sortRecipes(enteredValue){
  
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

  tagList = [];

  tagSelector.forEach((link) => {
    link.remove();
  });

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
        // Push + affichage des recettes contenant le mot entré dans la barre de recherche;

        arrayRecipes.push(recipe);
        recipesCard(recipe);
        loadingNav(recipe);
      }
    });
  } else if (enteredValue.length <= 2) {
    arrayRecipes = [];
    allRecipes();
    loadingNav();
  }
  navDOM();
};

//////////////// FONCTION TRI DES RECETTES SELON TAG ////////////////////////
/*
function listenerTag() {
  arrayRecipes.filter((recipe) => {
    if (
      recipe.name.toLowerCase().includes(//) ||
      recipe.description.toLowerCase().includes(//) ||
      recipe.ingredients.some((i) =>
        i.ingredient.toLowerCase().includes(//)
      ) ||
      recipe.ustensils.some((u) => u.toLowerCase().includes(//)) ||
      recipe.appliance.toLowerCase().includes(//)
    ) {
      // Push + affichage des recettes contenant le mot entré dans la barre de recherche;

      arrayRecipes.push(recipe);
      recipesCard(recipe);
      loadingNav(recipe);
    }
  });

}*/


//////////////// LISTENER  /////////////////////////////

searchBar.addEventListener("change", () => {
  const enteredValue = searchBar.value.toLowerCase();
  sortRecipes(enteredValue)
})





//////////////// START FUNCTION ////////////////////////

allRecipes();
loadingNav();
navDOM();
