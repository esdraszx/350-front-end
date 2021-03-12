<template>
  <div class="p-modal-backdrop">
    <div class="p-modal">
      <br/>
      <h5>Add to Pantry</h5>
      <div class="p-modal-body">
        <label>Name</label>
        <input v-model="name" placeholder="Item name"/>
        <br/>
        <label>Type</label>
        <input v-model="type" placeholder="Item name"/>
        <br/>
        <label>Date</label>
        <input type="date" v-model="date" placeholder="Item date"/>
        <br/>
        <label>Weight</label>
        <input type="number" v-model="weight" placeholder="1 lb"/>lb
        <br/>
        <label>Grains or Other</label>
        <input type="radio" id="true-m" value="1" v-model="isGrain">
        <br/>
        <label>Fruit or Veggie</label>
        <input type="radio" id="false-m" value="0" v-model="isGrain">
        <br/>
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
      addItem(){
        //console.log(this.id)
        //find if we are adding a GO or FV
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
         
          Api.addGO(item)
        }
        else {
          //add FV
          Api.addFV(item)
        }
        this.close()
      }
    },
  };
</script>

<style scoped>
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
    width: 30%;
    height: 50%;
  }

  h5 {
    width: 100%;
    text-align: center;
  }

  .p-modal-header,
  .p-modal-footer {
    padding: 15px;
    display: flex;
  }

  .p-modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .p-modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
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
    border: 1px solid black;
    width: 6rem;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
    margin: 20px;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  /* * {
    border: 1px solid red;
  } */
</style>