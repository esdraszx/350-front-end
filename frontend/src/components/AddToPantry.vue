<template>
  <div class="p-modal-backdrop">
    <div class="p-modal">
      <h5>ADD TO PANTRY</h5>
      <div class="p-modal-body">
        <div class="form-item">
          <label>Name</label>
          <input v-model="name" placeholder="Item name"/>
        </div>
        <br/>
        <div class="form-item">
          <label>Type</label>
          <input v-model="type" placeholder="Item name"/>
        </div>
        <br/>
        <div class="form-item">
          <label>Date</label>
          <input type="date" v-model="date" placeholder="Item date"/>
        </div>
        <br/>
        <div class="form-item">
          <label>Weight (lbs)</label>
          <input type="number" v-model="weight" placeholder="1 lb"/>
        </div>
        <br/>
        <div class="form-item long">
          <label>Grains or Other</label>
          <input type="radio" id="true-m" value="1" v-model="isGrain">
        </div>
        <br/>
        <div class="form-item long">
          <label>Fruit or Veggie</label>
          <input type="radio" id="false-m" value="0" v-model="isGrain">
        </div>
        <p id="message">{{ message }}</p>
      </div>
      <div class="p-modal-buttons">
        <button type="button" class="btn-close" @click="close">Cancel</button>
        <button type="button" class="btn-add" @click="addItem">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from "../api"

  export default {
    name: 'PantryModal',
    props: ['id'],
    data(){
      return {
        name: '',
        type: '',
        date: '',
        weight: 0,
        isGrain: 0,
        message: '',
        //if grain is 1 then add to grains. Else, add to fruits
      }
    },
    methods: {
      close(){
        this.name = ''
        this.type = ''
        this.date = ''
        this.weight= 0
        this.isGrain = 0
        this.message = ''
        this.$emit('close');
      },
      formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
      },
      async addItem(){
        //console.log(this.id)
        //find if we are adding a GO or FV
        let response = ''

        let item = {
          "name": this.name,
          "type": this.type,
          "weight": this.weight,
          "date": this.formatDate(this.date),
          "fridgeid": null,
          "pantryid": this.id
        }

        if(this.isGrain === 1){
          //add grain
        
          response = await Api.addGO(item)
        }
        else {
          //add FV
          response = await Api.addFV(item)
        }

        if(response !== ''){
          this.message = response
          return;
        }

        this.close()
      }
    },
  };
</script>

<style scoped>
  h5 {
    padding: 10px;
    width: 100%;
    background-color: var(--lightP);
    color: var(--darkP);
    font-weight: bold;
    font-size: 17px;
  }

  .p-modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .p-modal {
    background-color: white;
    position: relative;
    width: 350px;
    height: 55%;
    border: 2px solid var(--darkP);
    border-radius: 4px;
  }

  h5 {
    width: 100%;
    text-align: center;
  }

  .p-modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .p-modal-buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20px;
  }

  button {
    border: 1px solid var(--darkP);
    border-radius: 4px;
    width: 6rem;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    color: var(--lightP);
    background-color: var(--darkP);
    margin: 20px;
  }

  /* * {
    border: 1px solid red;
  } */

  .form-item {
    display: flex;
    justify-content: center;
    align-items: baseline;
    width: 100%;
  }

  .form-item label {
    width: 40%;
    text-align: right;
    padding-right: 15px;
  }

  .form-item input {
    width: 45%;
    margin-right: auto;
    border: none;
    border-bottom: 2px solid var(--darkP);
    outline: none;
  }

  .long label {
    width: 60%;
  }

  .long input {
    width: 30%;
    margin-right: auto;
  }

  #message {
    color: rgb(156, 31, 31);
    font-size: 15px;
    margin-top: -10px;
  }
</style>