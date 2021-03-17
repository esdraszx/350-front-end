<template>
	<div>
		<Header></Header>
		<div class="content">
			<div v-if="username !== ''">
				<br/><br/>
				<div id="ingredients">
					<p><b>Recipe ingredients: </b>
						<span v-for="(i, index) in selectedFoods" :key="i + 1">&nbsp;{{ index === selectedFoods.length - 1 ? (`${i}&nbsp;`) : (`${i}&nbsp;-`)}} </span>
					</p>
					<router-link id="search" :to="`/recipes/${JSON.stringify(selectedFoods)}`"><img src="../assets/search.svg" width="20"/>Search</router-link>
				</div>
				<br/>
				<div id="inventory-container">
					<div id="fridge">
						<h4>Fridge <span v-if="fridgeData.length > 0" class="clear-button" @click="clearAllFridge(fridgeid)">&nbsp;Clear All</span> <img src="../assets/add.svg" class="add-button" @click="isFridgeModal = true"/></h4>
						<table>
							<thead>
								<tr>
									<th width="5%">&nbsp;</th>
									<th>Name &nbsp;<img src="../assets/sort.svg" height="10" width="10" @click="sortBy('name', 'f')"/></th>
									<th>Type</th>
									<th>Date &nbsp;<img src="../assets/sort.svg" height="10" width="10" @click="sortBy('date', 'f')"/></th>
									<th>Weight</th>
									<th width="5%">&nbsp;</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in fridgeData" :key="index">
									<td><input type="checkbox" :value="item.name" @change="selected($event)"></td>
									<td>{{ item.name }}</td>
									<td>{{ item.type !== null ? (item.type) : ('-')}}</td>
									<td>{{ item.date }}</td>
									<td>{{ item.weight }} lbs</td>
									<td><img class="button-img" @click="deleteItem(item)" src="../assets/trash-red.svg" height="20" width="20"/></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="pantry">
						<h4>Pantry <span v-if="pantryData.length > 0" class="clear-button" @click="clearAllPantry(pantryid)">&nbsp;Clear All</span> <img src="../assets/add.svg" class="add-button" @click="isPantryModal = true"/></h4>
						<table>
							<thead>
								<tr>
									<th width="5%">&nbsp;</th>
									<th>Name &nbsp;<img src="../assets/sort.svg" height="10" width="10" @click="sortBy('name', 'p')"/></th>
									<th>Type</th>
									<th>Date &nbsp;<img src="../assets/sort.svg" height="10" width="10" @click="sortBy('date', 'p')"/></th>
									<th>Weight</th>
									<th width="5%">&nbsp;</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in pantryData" :key="index">
									<td><input type="checkbox" :value="item.name" @change="selected($event)"></td>
									<td>{{ item.name }}</td>
									<td>{{ item.type !== null ? (item.type) : ('-')}}</td>
									<td>{{ item.date }}</td>
									<td>{{ item.weight }} lbs</td>
									<td><img class="button-img" @click="deleteItem(item)" src="../assets/trash-red.svg" height="20" width="20"/></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<PantryModal v-show="isPantryModal" @close="closeModal" v-bind:id="pantryid"></PantryModal>
				<FridgeModal v-show="isFridgeModal" @close="closeModal" v-bind:id="fridgeid"></FridgeModal>
			</div>
			<div v-else>This page cannot be accessed without authentication</div>
		</div>
	</div>
</template>

<script>
import Api from "../api";
import { getJwtToken, getUserIdFromToken } from "../auth";
import Header from "../components/Header"
import PantryModal from "../components/AddToPantry"
import FridgeModal from "../components/AddToFridge"

export default {
	name: "Home",
	data() {
		return {
				username: '',
				loading: false,
				fridgeid: null,
				pantryid: null,
				fridgeData: [],
				pantryData: [],
				shouldUpdate: false,
				isPantryModal: false,
				isFridgeModal: false,
				selectedFoods: []
		};
	},
	components: {
		Header,
		PantryModal,
		FridgeModal
	},
	methods: {
		async getFridgeData(){
			// this.fridgeData = null
			// this.pantryData = null
			// console.log('getting new data')
			//get fridge fv and meats
			let fridgeFvData = await Api.getFridgeFV(this.fridgeid)
			let fridgeMData = await Api.getFridgeMeats(this.fridgeid)
			// console.log(fridgeFvData)
			this.fridgeData = [...fridgeFvData.data, ...fridgeMData.data]
		},
		async getPantryData(){
			let pantryFvData = await Api.getPantryFV(this.pantryid)
			let pantryGoData = await Api.getPantryGO(this.pantryid)
			
			this.pantryData = [...pantryFvData.data, ...pantryGoData.data]
		},
		closeModal(){
			this.isPantryModal = false
			this.isFridgeModal = false
			
			setTimeout(() => {
				this.getFridgeData()
				this.getPantryData()
			}, 500);
		},
		async deleteItem(item){
			//get FV and GO and M
			//find the item in one of those three. Word case scenario is going to make 3 calls and then a delete call
			let response = await Api.getFVById(item.id)
			if(response.data[0] !== undefined && response.data[0].name === item.name){
				//I found it
				console.log(response.data[0], 'belongs to FV')
				await Api.deleteFV(item.id)
				this.closeModal()
				return;
			}
			
			response = await Api.getGOById(item.id)
			if(response.data[0] !== undefined && response.data[0].name === item.name){
				console.log(response.data[0], 'belongs to GO')
				await Api.deleteGO(item.id)
				this.getPantryData()
				return;
			}
			
			response = await Api.getMById(item.id)
			if(response.data[0] !== undefined && response.data[0].name === item.name){
				console.log(response.data[0], 'belongs to M')
				await Api.deleteMeats(item.id)
				this.getFrdigeData()
				return;
			}
		},
		sortBy(value, param){
			if(param === 'f'){
				if(value === "name"){
					this.fridgeData.sort((a, b) => (a.name > b.name) ? 1 : -1)
				}
				else {
					this.fridgeData.sort((a, b) => (a.date > b.date) ? 1 : -1)
				}
			}
			else {
				if(value === "name"){
					this.pantryData.sort((a, b) => (a.name > b.name) ? 1 : -1)
				}
				else {
					this.pantryData.sort((a, b) => (a.date > b.date) ? 1 : -1)
				}
			}
		},
		selected(event){
			let index = this.selectedFoods.indexOf(event.target.value)

			if(index === -1){
				//did not find it
				this.selectedFoods = [...this.selectedFoods, event.target.value]
			}
			else {
				//found it
				this.selectedFoods.splice(index, 1)
			}
			console.log(this.selectedFoods)
		},
		async clearAllFridge(id){
			if(confirm('Are you sure you want to delete all the food in your fridge?')){
				await Api.deleteAllFV('fridgeid',id)
				await Api.deleteAllMeats(id)
				this.getFrdigeData()
			}
			//clear all fruits and veg
		},
		async clearAllPantry(id){
			if(confirm('Are you sure you want to delete all the food in your pantry?')){
				await Api.deleteAllFV('pantryid',id)
				await Api.deleteAllGO(id)
				this.getPantryData()
			}
			//clear all fruits and grains
		},
	},
	created: async function(){
			let token = getJwtToken()
			if(token === null){
					return;
			}

			this.username = getUserIdFromToken(token)
			while(this.username == ''){
					this.loading = true
			}

			let response = await Api.getUserFridgeAndPantry(this.username)
			// console.log(response)
			this.fridgeid = response.data[0].fridge_id
			this.pantryid = response.data[0].pantry_id

			this.getFridgeData()
			this.getPantryData()
	},
};
</script>

<style scoped>

div {
		width: 100%;
}

#fridge {
	border-right: 2px solid var(--darkP);
	padding-right: 10px;
}

#pantry {
	padding-left: 10px;
}

#inventory-container {
	display: flex;
}

h4 {
	display: flex;
	position: relative;
	align-items: center;
	color: var(--darkP);
	border-bottom: 2px solid var(--darkP);
	padding: 2px;
}

.add-button {
	position: absolute;
	right: 2%;
	cursor: pointer;
}

table {
	width: 100%;
}

tr {
  height: 30px !important;
}

thead {
	border-bottom: 2px solid var(--shadeP);
}

td {
	vertical-align: center;
	border-bottom: 1px solid rgba(115, 139, 245, .3);
}

/* * {
		border: black 1px solid;
} */

.clear-button {
	font-size: 12px !important;
	border: 1.5px solid #ff837a;
	border-radius: 4px;
	width: 4rem;
	color: #ff837a;
	padding: 3px;
	margin-left: 5px;
	text-align: center;
	cursor: pointer;
}

.clear-button:hover {
	transition: .5s ease;
	color: white;
	font-weight: bold;
	background-color: #ff837a;
}

#ingredients {
	display: flex;
	align-items: center;
	background-color: rgba(90, 95, 117, .9);
	height: 45px;
	border-radius: 40px;
}

#search {
	height: 30px;
	width: auto;
	position: absolute;
	right: 10px;
	display: flex;
	align-items: center;
	border: 2px solid var(--lightP);
	color: var(--darkP);
	background-color: var(--lightP);
	border-radius: 20px;
}

a:hover {
	text-decoration: none !important;
}

#ingredients p {
	color: var(--lightP);
	margin-left: 15px !important;
	margin: auto 0px auto 0px;
}

@media only screen and (max-width: 1000px) {
	#inventory-container {
		flex-direction: column;
	}

	#pantry {
		padding: 0px;
		margin-top: 20px;
	}

	#fridge {
		border: none;
		padding: 0px;
	}

	#ingredients {
		height: 100px;
		align-items: baseline !important;
		text-align: center;
		justify-content: center;
		border-radius: 10px;
	}

	#ingredients p {
		margin: 10px 0px 0px 0px;
		text-align: center;
	}

	#search {
		right: inherit;
		top: 115px;
	}
}
</style>