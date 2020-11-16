const displayCategories = categories => {
    var select = document.getElementById("category");
    var totals = document.getElementById("totals");

    categories.forEach(category => {
        // create options in categories dropdown
        var option = document.createElement("option");
        option.text = category.name;
        option.value = category.id;
        select.add(option);
        // create category headers
        var div = document.createElement("div");
        div.id = "category-" + category.id;
        var h1 = document.createElement("h1");
        h1.innerHTML = category.name + " Total";
        div.append(h1);
        totals.append(div);
    })
}

const displayMeals = () => {
    fetch("http://localhost:3000/meals")
    .then(resp => resp.json())
    .then(meals => {
        var totals = document.getElementById("totals");

        meals.forEach(meal => {

            // 
            var h2 = document.createElement("h2");
            h2.innerHTML = "$" + meal.amount;
            totals.append(h2);
        })
    })
    .catch(error => console.log(error.message))
}

// load the categories from rails 
fetch("http://localhost:3000/categories")
.then(resp => resp.json())
.then(categories => {
    displayCategories(categories);
    displayMeals();
    })
    .catch(error => console.log(error.message))


document.getElementById("calculate").addEventListener(
    "click", () => {
        // (bill * tip / 100) / people
        const bill = document.getElementById("bill").value;
        const tip = document.getElementById("tip").value;
        const people = document.getElementById("people").value;
        const total = bill * (1 + tip/ 100);
        document.getElementById("total").innerHTML = total.toFixed(2);
        document.getElementById("perperson").innerHTML = (total/people).toFixed(2);
        document.getElementById("results").classList.remove("hidden");

    }
    
)

document.getElementById("save_meal").addEventListener(
    "click", () => {
        fetch("http://localhost:3000/meals", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify({
                amount: document.getElementById("perperson").innerHTML,
                category_id: document.getElementById("category").value
            })
        })

    }
    
)


