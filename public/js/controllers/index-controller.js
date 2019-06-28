import { orderService } from '../services/order-service.js'

const btnNewPizza = document.querySelector("#createPizza");
const inputPizza = document.querySelector("#pizzaName");
const ordersContainer = document.querySelector("#ordersContainer");

const ordersRenderer = Handlebars.compile(document.querySelector("#orders-template").innerHTML);

btnNewPizza.addEventListener("click", async event => {
    event.preventDefault();
    await orderService.createPizza(inputPizza.value);

    renderOrders();
    inputPizza.value = "";
});

async function renderOrders() {
    ordersContainer.innerHTML = ordersRenderer({orders: await orderService.getOrders()});
}

ordersContainer.addEventListener("click", async function (event) {
    if(event.target.classList.contains("js-delete")){

        await orderService.deleteOrder(event.target.dataset.id);
        await renderOrders()
    }
});

function updateStatus() {
    // Array.from(document.querySelectorAll(".js-non-user")).forEach(x=>x.classList.toggle("hidden", authService.isLoggedIn()))
    // Array.from(document.querySelectorAll(".js-user")).forEach(x=>x.classList.toggle("hidden", !authService.isLoggedIn()))
    renderOrders();
}

updateStatus();