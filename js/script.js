let arrayRecipes = []

recipes.forEach(recipe => {
  arrayRecipes.push(recipe)
})

console.log(arrayRecipes)



const searchBar = document.getElementById('searchbar')

/*searchBar.addEventListener("change", (e) => {
  console.log("ok")
  if (arrayRecipes.includes(searchBar.value) ){
    console.log("ok2")}
    }
  
  )
    /*arrayRecipes =[];
    arrayRecipes.push(recipe)*/
  

recipesCard()
