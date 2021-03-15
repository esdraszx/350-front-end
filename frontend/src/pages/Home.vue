<template>
	<div>
		<Header></Header>
		<div class="content">
			<div v-if="username !== ''">
				<br/><br/>
				<div id="inventory-container">
					<div id="fridge">
						<h4>Fridge<img src="../assets/add.svg" class="add-button" @click="isFridgeModal = true"/></h4>
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
									<td><img @click="deleteItem(item)" src="../assets/trash.svg" height="20" width="20"/></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="pantry">
						<h4>Pantry<img src="../assets/add.svg" class="add-button" @click="isPantryModal = true"/></h4>
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
									<td><img @click="deleteItem(item)" src="../assets/trash.svg" height="20" width="20"/></td>
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
		async getKitchenData(){
			// this.fridgeData = null
			// this.pantryData = null
			console.log('getting new data')
			//get fridge fv and meats
			let fridgeFvData = await Api.getFridgeFV(this.fridgeid)
			let fridgeMData = await Api.getFridgeMeats(this.fridgeid)
			// console.log(fridgeFvData)
			this.fridgeData = [...fridgeFvData.data, ...fridgeMData.data]

			let pantryFvData = await Api.getPantryFV(this.pantryid)
			let pantryGoData = await Api.getPantryGO(this.pantryid)
			
			this.pantryData = [...pantryFvData.data, ...pantryGoData.data]
		},
		closeModal(){
			this.isPantryModal = false
			this.isFridgeModal = false
			
			setTimeout(() => {
				this.getKitchenData()
			}, 750);
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
				this.closeModal()
				return;
			}
			
			response = await Api.getMById(item.id)
			if(response.data[0] !== undefined && response.data[0].name === item.name){
				console.log(response.data[0], 'belongs to M')
				await Api.deleteMeats(item.id)
				this.closeModal()
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
		}
	},
	mounted: async function(){
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

			this.getKitchenData()
	},
};
</script>

<style scoped>

div {
		width: 100%;
}

#fridge {
	border-right: 1px solid black;
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

td {
	vertical-align: center;
	border-bottom: 1px solid red;
}

/* * {
		border: black 1px solid;
} */

</style>