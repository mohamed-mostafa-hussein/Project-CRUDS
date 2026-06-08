let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
// get total
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.setProperty("background", "green", "important");
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}

// create product
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product); 
} else {
    dataProduct = [];
}

submit.onclick = function () {
    let newProdect = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != "" && price.value != "" && category.value != "" && newProdect.count < 100) {
        if (mood === "create") {
            if (newProdect.count > 1) {
                for (i=0; i <newProdect.count; i++) {
                    dataProduct.push(newProdect);
                } 
    } else {
        dataProduct.push(newProdect);
    }
    } else {
        dataProduct[tmp] = newProdect;
        mood = "create";
        submit.innerHTML = "Create";
        count.style.display = "block";
        }
        cleraData();
    }
    
    
    localStorage.setItem("product", JSON.stringify(dataProduct));

    showData();
}

// clear inputs
function cleraData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// read data 
function showData() {
    getTotal()
    let table = "";
    for (i=0; i<dataProduct.length; i++) {
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onClick = "updateData(${i})" id="update">Update</button></td>
                <td><button onClick = "deleteData(${i})" id="delete">Delete</button></td>
            </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if(dataProduct.length > 0) {
        btnDelete.innerHTML= `
        <button onClick ="deleteAll()">Delete All (${dataProduct.length})</button>
        `;
    } else {
        btnDelete.innerHTML = "";
    }
}
showData();

// delete data
function deleteData(i) {
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}
function deleteAll () {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}

// update data
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    getTotal();
    count.style.display = "none";
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

// search
let searchMood = "title";
function getSearchMood (id) {
    let search = document.getElementById("search");
    if (id == "searchTitle") {
        searchMood = "title";
        search.placeholder = "Search By Title";
    } else {
        searchMood = "category";
        search.placeholder = "Search By Category";
    }
    search.focus();
    search.value = "";
    showData();
}
function searchData (value) {
    let table = '';
    if (searchMood == "title") {
        for (i=0; i<dataProduct.length; i++) {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                table += `
                            <tr>
                                <td>${i+1}</td>
                                <td>${dataProduct[i].title}</td>
                                <td>${dataProduct[i].price}</td>
                                <td>${dataProduct[i].taxes}</td>
                                <td>${dataProduct[i].ads}</td>
                                <td>${dataProduct[i].discount}</td>
                                <td>${dataProduct[i].total}</td>
                                <td>${dataProduct[i].category}</td>
                                <td><button onClick = "updateData(${i})" id="update">Update</button></td>
                                <td><button onClick = "deleteData(${i})" id="delete">Delete</button></td>
                            </tr>
                        `
            };
        };
    } else {
        for (i=0; i<dataProduct.length; i++) {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                table += `
                            <tr>
                                <td>${i+1}</td>
                                <td>${dataProduct[i].title}</td>
                                <td>${dataProduct[i].price}</td>
                                <td>${dataProduct[i].taxes}</td>
                                <td>${dataProduct[i].ads}</td>
                                <td>${dataProduct[i].discount}</td>
                                <td>${dataProduct[i].total}</td>
                                <td>${dataProduct[i].category}</td>
                                <td><button onClick = "updateData(${i})" id="update">Update</button></td>
                                <td><button onClick = "deleteData(${i})" id="delete">Delete</button></td>
                            </tr>
                        `
            };
        };
    };
    document.getElementById("tbody").innerHTML = table;
};
