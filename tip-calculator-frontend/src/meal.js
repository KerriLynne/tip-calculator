

class Meal {
    constructor(obj) {
        this.id = obj.id
        this.amount = obj.amount
        this.category_id = obj.category_id
    }
        // created a subtotals object
        static subtotals = {};

    static displayAll = () => {
        fetch("http://localhost:3000/meals")
        .then(resp => resp.json())
        .then(meals => {

            //iterating through the meals and adding them to subtotal object
            meals.forEach(meal => {
                this.subtotals[meal.category_id] = this.subtotals[meal.category_id] || 0;
                this.subtotals[meal.category_id] += meal.amount;
                this.append(meal);
            })
            // for loop displaying the subtotals
            for (const [category_id, subtotal] of Object.entries(this.subtotals)) {
                document.getElementById("subtotal-" + category_id).innerHTML = subtotal.toFixed(2);
            }
        })
        .catch(error => console.log(error.message))
    }

    static append = meal => {
        //finding each category & creating an h2
            var categoryTotals = document.getElementById("category-" + meal.category_id);       
            var h2 = document.createElement("h2");
            h2.id = "meal-" + meal.id;

        //telling h2 what it will hold
            var date = new Date(Date.parse(meal.created_at));
            h2.innerHTML = `${date.getMonth() + 1}/${date.getDate()} - $${meal.amount.toFixed(2)}`;
        //appending h2 to category totals
            categoryTotals.append(h2);

            meal = new Meal(meal)

            var button = document.createElement("button")
            button.innerHTML = "x"
            h2.append(button)
            button.addEventListener("click", meal.delete)
    }

    delete = () => {
        const meal = this
        fetch("http://localhost:3000/meals/" + meal.id, {
            //posting info to rails and if successful updating the page
            method: 'DELETE',
            // headers: {
            //     'Content-Type': 'application/json'},
        })
        .then(resp => {
            if (resp.ok) {
                //removing the H2
                document.getElementById("meal-" + meal.id).remove()
            
                //finding the subtotal of that category and subtracting from it.
                Meal.subtotals[meal.category_id] = Meal.subtotals[meal.category_id] - meal.amount
                document.getElementById("subtotal-" + meal.category_id).innerHTML = Meal.subtotals[meal.category_id].toFixed(2)
            } else {
                alert("unable to delete")
            }

        })
        .catch(error => console.log(error.message))

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
                this.subtotals[data.category_id] = data.amount + this.subtotals[data.category_id]
                document.getElementById("subtotal-" + data.category_id).innerHTML = this.subtotals[data.category_id].toFixed(2)
                callback()
            } else {
                alert("unable to save")
            }

        })
        .catch(error => console.log(error.message))
    }
}
