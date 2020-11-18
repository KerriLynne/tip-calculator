class Meal {
    static displayAll = () => {
        fetch("http://localhost:3000/meals")
        .then(resp => resp.json())
        .then(meals => {
            // created a subtotals object
            var subtotals = {};
            //iterating through the meals and adding them to subtotal object
            meals.forEach(meal => {
                subtotals[meal.category_id] = subtotals[meal.category_id] || 0;
                subtotals[meal.category_id] += meal.amount;
                this.append(meal);
            })
            // for loop displaying the subtotals
            for (const [category_id, subtotal] of Object.entries(subtotals)) {
                document.getElementById("subtotal-" + category_id).innerHTML = subtotal.toFixed(2);
            }
        })
        .catch(error => console.log(error.message))
    }

    static append = meal => {
        //finding each category & creating an h2
            var categoryTotals = document.getElementById("category-" + meal.category_id);       
            var h2 = document.createElement("h2");
        //telling h2 what it will hold
            var date = new Date(Date.parse(meal.created_at));
            h2.innerHTML = `${date.getMonth() + 1}/${date.getDate()} - $${meal.amount.toFixed(2)}`;
        //appending h2 to category totals
            categoryTotals.append(h2);
    }

    static save = (data, callback) => {
        fetch("http://localhost:3000/meals", {
            //posting info to rails and if successful updating the page
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(resp => {
            if (resp.ok) {
                this.append(data);
                var span = document.getElementById("subtotal-" + data.category_id);
                span.innerHTML = (parseFloat(span.innerHTML) + data.amount).toFixed(2);
                callback()
            } else {
                alert("unable to save")
            }

        })
        .catch(error => console.log(error.message))
    }
}
