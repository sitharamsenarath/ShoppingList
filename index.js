import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-e4279-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addButtonEl = document.getElementById("add-button")
const inputFieldEl = document.getElementById("input-field")
const listEl = document.getElementById("list-field")

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)
    clearInputField()
})

onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let shoppingListArr = Object.entries(snapshot.val())

        clearListEl()

        for (let i=0; i<shoppingListArr.length; i++){
            let currentItem = shoppingListArr[i]
            let currentItemId = shoppingListArr[i][0]
            let currentItemValue = shoppingListArr[i][1]
            appendItemToShoppingList(currentItem)
        }
    }
    else{
        listEl.textContent = "No items..."
    }
    
})

function clearListEl(){
    listEl.innerHTML=""
}

function clearInputField() {
    inputFieldEl.value = ""
}

function appendItemToShoppingList(item) {
    let itemId = item[0]
    let itemName = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemName
    newEl.addEventListener("dblclick", function(){
        let exactLocation = ref(database, `shoppingList/${itemId}`)
        remove(exactLocation)
    })
    listEl.append(newEl)
}