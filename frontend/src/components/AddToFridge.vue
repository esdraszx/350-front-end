<template>
  <div class="f-modal-backdrop">
    <div class="f-modal">
      <br/>
      <h5>Add to Fridge</h5>
      <div class="f-modal-body">
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
        <label>Meat</label>
        <input type="radio" id="true-m" value="1" v-model="isMeats">
        <br/>
        <label>Fruit or Veggie</label>
        <input type="radio" id="false-m" value="0" v-model="isMeats">
        <br/>
      </div>
      <div class="f-modal-buttons">
        <button type="button" class="btn-close" @click="close">Cancel</button>
        <button type="button" class="btn-add" @click="addItem">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from "../api"

  export default {
    name: 'FridgeModal',
    props: ['id'],
    data(){
      return {
        name: '',
        type: '',
        date: '',
        weight: 0,
        isMeats: 0,
        //if meats is 1 then add to meat. Else, add to fruits
      }
    },
    methods: {
      close() {
        this.name = ''
        this.type = ''
        this.date = ''
        this.weight= 0
        this.isMeats = 0
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
        let item = {
          "name": this.name,
          "type": this.type,
          "weight": this.weight,
          "date": this.formatDate(this.date),
          "fridgeid": this.id,
          "pantryid": null
        }

        if(this.isMeats === 1){
          //add Meat
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
  .f-modal-backdrop {
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

  .f-modal {
    background-color: white;
    position: relative;
    width: 30%;
    height: 50%;
  }

  h5 {
    width: 100%;
    text-align: center;
  }

  .f-modal-header,
  .f-modal-footer {
    padding: 15px;
    display: flex;
  }

  .f-modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .f-modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .f-modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .f-modal-buttons {
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