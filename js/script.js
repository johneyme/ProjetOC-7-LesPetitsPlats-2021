// Variables liées au DOM
const sectionRecipes = document.querySelector("#affichage-recette");
const dropDownAppareils = document.querySelector("#dropdown-appareils");
const dropDownUstensiles = document.querySelector("#dropdown-ustensils");
const dropDownIngredients = document.querySelector("#dropdown-ingredients");
const selectorContain = document.querySelector(".selector-contain");
const searchBar = document.getElementById("searchbar");
const tagSelector = document.querySelectorAll(".add-selector");
const inputIngredientSelect = document.querySelector("#ingredient-select");
const inputAppareilsSelect = document.querySelector("#appareils-select");
const inputUstensilesSelect = document.querySelector("#ustensiles-select");

// Déclaration variables/Array en scope global
let arrayRecipes = [];
let tagList = [];
let arraySortTagRecipes = [];

let applianceArray = [];
let ustensilArray = [];
let ingredientArray = [];

let applianceArrayFiltered = [];
let ingredientArrayFiltered = [];
let ustensilArrayFiltered = [];

////////////////////////////////////////////// AFFICHAGE TOUTES RECETTES ////////////////////////////////////////////////////

function allRecipes() {
  sectionRecipes.innerHTML = "";
  dropDownAppareils.innerHTML = "";
  dropDownIngredients.innerHTML = "";
  dropDownUstensiles.innerHTML = "";
  selectorContain.innerHTML = "";
  recipes.forEach((recipe) => {
    arrayRecipes.push(recipe);
    recipesCard(recipe);
  });
}

//////////////////////////////////////////// AFFICHAGE LIEN NAVIGATION/TRI ////////////////////////////////////////////////

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

  const allLinkNav = document.querySelectorAll("a.link-nav");
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

  allLinkNav.forEach((link) => {
    link.addEventListener("click", () => {
      let array = arrayRecipes;
      tagList.forEach((tag) => {
        array = sortTagRecipes(array, tag);
      });
      console.log(tagList);
    });
  });
}

//////////////////////////////////////// FONCTION CROIX FERMETURE TAG //////////////////////////////////////////////////

function closeTag(closeCross, tag) {
  closeCross.addEventListener("click", (link) => {
    const tagToClose = link.path[2].textContent.toLowerCase();
    const typeOfTag = link.path[2].className.toLowerCase();
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
    if (tagList.length >= 1) {
      let array = arrayRecipes;
      tagList.forEach((tag) => {
        array = sortTagRecipes(array, tag);
      });
    } else if (tagList.length === 0) {
      sectionRecipes.innerHTML = "";
      arrayRecipes.forEach(recipe => {
        recipesCard(recipe)
      })
    }
  });
}

/////////////////////////////////// FONCTION TRI DES RECETTES EN FONCTION DE ENTEREDVALUE  ////////////////////////////////

function sortRecipes(enteredValue) {
  // Reinitialisation du DOM
  sectionRecipes.innerHTML = "";
  dropDownAppareils.innerHTML = "";
  dropDownIngredients.innerHTML = "";
  dropDownUstensiles.innerHTML = "";
  selectorContain.innerHTML = "";

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
}

//////////////////////////////////////// FONCTION TRI DES RECETTES SELON TAG //////////////////////////////////////////

function sortTagRecipes(array, tag) {
  // Reinitialisation du DOM
  sectionRecipes.innerHTML = "";
  arraySortTagRecipes = [];

  if (tagList.length >= 1) {
    array.filter((recipe) => {
      if (
        recipe.name.toLowerCase().includes(tag) ||
        recipe.description.toLowerCase().includes(tag) ||
        recipe.ingredients.some((i) =>
          i.ingredient.toLowerCase().includes(tag)
        ) ||
        recipe.ustensils.some((u) => u.toLowerCase().includes(tag)) ||
        recipe.appliance.toLowerCase().includes(tag)
      ) {
        arraySortTagRecipes.push(recipe);
      }
    });
    arraySortTagRecipes = [...new Set(arraySortTagRecipes)];
    arraySortTagRecipes.forEach((recipe) => {
      recipesCard(recipe);
    });
  } else if (tagList.length === 0) {
    arrayRecipes.forEach((recipe) => {
      recipesCard(recipe);
    });
  }
  
  return arraySortTagRecipes;
}

/////////////////////////////////////////////// LISTENER  ////////////////////////////////////////////////////////////

searchBar.addEventListener("keyup", () => {
  if (searchBar.value.length >= 1) {
    const enteredValue = searchBar.value.toLowerCase();
    sortRecipes(enteredValue);
  } else if (searchBar.value.length === 0) {
    allRecipes()
    loadingNav();
    navDOM();
  }
});

inputAppareilsSelect.addEventListener("keyup", () => {
  const linkNavAppareils = document.querySelectorAll("a.link-nav.appareils");
  if (inputAppareilsSelect.value.length > 0) {
    linkNavAppareils.forEach(elm => {
      if(elm.innerText.toLowerCase().includes(inputAppareilsSelect.value.toLowerCase())) {
        elm.style.display = "block"
      }
        else {
        elm.style.display = "none"
      }
    } )
  } else if (inputAppareilsSelect.value.length === 0) {
    linkNavAppareils.forEach(elm => {
        elm.style.display = "block"
      
    } )
  }
  
});

inputUstensilesSelect.addEventListener("keyup", () => {
  const linkNavUstensiles = document.querySelectorAll("a.link-nav.ustensiles");
  if (inputUstensilesSelect.value.length > 0) {
    linkNavUstensiles.forEach(elm => {
      if(elm.innerText.toLowerCase().includes(inputUstensilesSelect.value.toLowerCase())) {
        elm.style.display = "block"
      }
        else {
        elm.style.display = "none"
      }
    } )
  } else if (inputUstensilesSelect.value.length === 0) {
    linkNavUstensiles.forEach(elm => {
        elm.style.display = "block"
      
    } )
  }
});

inputIngredientSelect.addEventListener("keyup", () => {
  const linkNavIngredient = document.querySelectorAll("a.link-nav.ingredients");
  if (inputIngredientSelect.value.length > 0) {
    linkNavIngredient.forEach(elm => {
      if(elm.innerText.toLowerCase().includes(inputIngredientSelect.value.toLowerCase())) {
        elm.style.display = "block"
      }
        else {
        elm.style.display = "none"
      }
    } )
  } else if (inputIngredientSelect.value.length === 0) {
    linkNavIngredient.forEach(elm => {
        elm.style.display = "block"
      
    } )
  }
});

//////////////// START FUNCTION ////////////////////////

allRecipes();
loadingNav();
navDOM();
