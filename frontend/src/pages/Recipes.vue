<template>
  <div>
    <Header/>
    <br/>
    <div class="content">
        <div v-if="ingredients.length > 0">
            <button v-if="hideSearch === false" class="hide-search" type="button" @click="hide">Hide Results</button>
            <button v-else class="hide-search" type="button" @click="hide">Show Results</button>
            <div v-if="hideSearch !== true" >
                <h3>Search Results</h3>
                <p> <b>Recipes containing:</b>
                    <span v-for="(i, index) in ingredients" :key="i + 'a'">&nbsp;{{ index === ingredients.length - 1 ? (`${i}&nbsp;`) : (`${i}&nbsp;-`)}} </span>
                </p>
                <div id="recipe-container">
                    <h4 v-if="recipes.length === 0">{{ loading === true ? ('Loading') : ('There are no results') }}</h4>
                    <div v-else class="item" v-for="(r, index) in recipes" :key="index">
                        <img :src="r.recipe.image" width="220" height="215"/>
                        <ul id="properties">
                            <li class="title">{{ r.recipe.label }}</li>
                            <li><b>Calories:</b> {{ Math.round(r.recipe.calories, 0) }}</li>
                            <!-- <li><b>Dish type:</b> {{ r.recipe.dishType !== undefined ? (r.recipe.dishType[0]) : ('-') }}</li> -->
                            <li><b>Meal type:</b> {{ r.recipe.mealType !== undefined ? (r.recipe.mealType[0]) : ('-') }}</li>
                            <li><b>Cuisine type:</b> {{ r.recipe.cuisineType !== undefined ? (r.recipe.cuisineType[0]) : ('-') }}</li>
                            <li><b>Ingredients:</b> {{ r.recipe.ingredients.length }} </li>
                            <li><b>Feeds:</b> {{ r.recipe.yield }}</li>
                            <li class="recipe-link"><a :href="r.recipe.shareAs" target="_blank">Access recipe</a></li>
                        </ul>
                        <div class="save-link"><button type="button" @click="saveRecipe(index)">Save</button></div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3>My Recipes</h3>
            <div id="recipe-container">
                <h4 v-if="savedRecipes.length === 0">{{ loading === true ? ('Loading') : ('There are no saved recipes') }}</h4>
                <div class="item" v-for="(r, index) in savedRecipes" :key="index">
                    <img :src="r.recipe.image" width="200" height="200"/>
                    <ul id="properties">
                        <li class="title">{{ r.recipe.label }}</li>
                        <li><b>Calories:</b> {{ Math.round(r.recipe.calories, 0)}}</li>
                        <!-- <li><b>Dish type:</b> {{ r.recipe.dishType !== undefined ? (r.recipe.dishType[0]) : ('-') }}</li> -->
                        <li><b>Ingredients:</b> {{ r.recipe.ingredients }} </li>
                        <li><b>Feeds:</b> {{ r.recipe.yield }}</li>
                        <li class="recipe-link"><a :href="r.recipe.link" target="_blank">Access recipe</a></li>
                    </ul>
                    <div class="save-link"><button type="button" @click="deleteRecipe(r.id)">Delete</button></div>
                </div>
            </div>
            <br/>
        </div>
    </div>
  </div>
</template>

<script>
import Api from "../api";
import { getUserIdFromToken, getJwtToken } from '../auth'
import Header from '../components/Header'

export default {
  name: "Recipes",
  data: function () {
    return {
        loading: false,
    //   article: null,
        ingredients: [],
        APIKEY: "1b8e31e18f081be2116d1404d88b595a",
        app_id: "71350fe4",
        recipes: [],
        savedRecipes: [],
        hideSearch: false,
        token: null,
    };
  },
  components: {
    Header,
  },
  methods: {
    hide(){
        this.hideSearch = !this.hideSearch
    },
    async saveRecipe(index){
        let username = getUserIdFromToken(this.token)
        let recipeInfo = {
        'calories': this.recipes[index].recipe.calories,
        'ingredients': this.recipes[index].recipe.ingredients.length,
        'yield': this.recipes[index].recipe.yield,
        'image': this.recipes[index].recipe.image,
        'link': this.recipes[index].recipe.shareAs,
        'label': this.recipes[index].recipe.label,
        }
        let item = {
        'username': username,
        'recipe': JSON.stringify(recipeInfo)
        }
        await Api.saveRecipe(item)
        this.getMyRecipes();
    },
    async deleteRecipe(id){
        let response = await Api.deleteRecipe(id)
        console.log(response)
        this.getMyRecipes()
    },
    async searchResults(){
        this.ingredients = JSON.parse(this.$route.params.ing)
        this.loading = true
        if(this.ingredients.length > 0){
            let str = ''
            for(let i = 0; i < this.ingredients.length; i++){
                str += this.ingredients[i] + ','
            }
            const url = "https://api.edamam.com/search?q=" + str + "&app_id=" + this.app_id + "&app_key=" + this.APIKEY;
            this.recipes = await fetch(url, {mode: 'cors'}).then(async function(response) {
                let json = await response.json()
                console.log(json)
                return json.hits
            })
        }

        this.loading = false
    },
    async getMyRecipes(){
        this.loading = true
        let response = await Api.getRecipes(getUserIdFromToken(this.token));
        this.savedRecipes = response.data
        this.savedRecipes.forEach((item, index) => {
        this.savedRecipes[index].recipe = JSON.parse(item.recipe)
        
        setTimeout(() => {
            this.loading = false
        }, 1000);
    })
    }
  },
  created: async function () {
    this.token = getJwtToken();
    this.searchResults()
    this.getMyRecipes()
  },
};
</script>

<style scoped>

h3 {
    width: 100%;
    text-align: center !important;
}

#recipe-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.item {
    position: relative;
    width: 100%;
    margin: 2px;
    display: flex;
    height: 220px;
    border: 2px dashed rgba(0, 0, 0, 0.2);
}

.item ul {
    width: 100%;
    padding-left: 20px;
}

#properties {
    font-size: 12px;
}

.title {
    width: inherit;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    padding: 3px;
}

.recipe-link a {
    color: rgb(43, 167, 209) !important;
    font-weight: bold;
}

.hide-search {
    position: absolute;
    right: 0px;
    top: -10px;
}

button {
  width: 140px;
  margin: 10px;
  border: 2px solid var(--shadeP);
  border-radius: 4px;
  color: var(--darkP);
  transition: .5s ease;
  cursor: pointer;
  font-weight: 600;
  height: 35px;
  background-color: transparent;
}

.save-link button {
    font-size: 13px !important;
    height: auto !important;
    width: auto !important;
    position: absolute;
    right: 5px;
    bottom: 5px;
    margin: 5px;
}

button:hover {
  background-color: var(--lightP);
}

@media only screen and (max-width: 1000px){
    h3 {
        text-align: left !important;
    }

    #recipe-container {
        display: grid;
        grid-template-columns: 1fr;
    }

    .item {
        justify-content: center;
        align-items: center;
        height: 300px;
    }

    button:hover {
        background-color: transparent;
    }
}

</style>