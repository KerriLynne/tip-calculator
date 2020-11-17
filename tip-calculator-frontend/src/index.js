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
        var subtotal = document.createElement("span");
        subtotal.id = "subtotal-" + category.id;
        subtotal.innerHTML = 0
        div.id = "category-" + category.id;
        var h1 = document.createElement("h1");
        h1.innerHTML = "Your " + category.name + " Total: $";
        div.append(h1);
        totals.append(div);
        h1.append(subtotal)
    })
}

const displayMeals = () => {
    fetch("http://localhost:3000/meals")
    .then(resp => resp.json())
    .then(meals => {
        var subtotals = {};
        meals.forEach(meal => {
            subtotals[meal.category_id] = subtotals[meal.category_id] || 0;
            subtotals[meal.category_id] += meal.amount;
            appendMeal(meal);
        })
        for (const [category_id, subtotal] of Object.entries(subtotals)) {
            document.getElementById("subtotal-" + category_id).innerHTML = subtotal.toFixed(2);
        }
    })
    .catch(error => console.log(error.message))
}

const appendMeal = meal => {

        var categoryTotals = document.getElementById("category-" + meal.category_id);
                    
        var h2 = document.createElement("h2");

        h2.innerHTML = "$" + meal.amount.toFixed(2);
        categoryTotals.append(h2);
}

// load the categories from rails 
fetch("http://localhost:3000/categories")
.then(resp => resp.json())
.then(categories => {
    displayCategories(categories);
    setTimeout(displayMeals, 1000);
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
        const data = {
            amount: parseFloat(document.getElementById("perperson").innerHTML),
            category_id: document.getElementById("category").value
        }
        fetch("http://localhost:3000/meals", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(resp => {
            if (resp.ok) {
                appendMeal(data);
                var span = document.getElementById("subtotal-" + data.category_id);
                span.innerHTML = (parseFloat(span.innerHTML) + data.amount).toFixed(2);
            } else {
                alert("unable to save")
            }

        })
        .catch(error => console.log(error.message))
    }
    
)


