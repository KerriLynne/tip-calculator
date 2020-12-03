

class Meal {
    constructor(obj) {
        this.id = obj.id
        this.amount = obj.amount
        this.category_id = obj.category_id
        if (obj.created_at) {
            this.date = new Date(Date.parse(obj.created_at));
        } else {
            this.date = new Date()
        }
        Meal.meals.push(this)
    }
        // created a subtotals object
        static subtotals = {};
        static meals = [];

        

    static displayAll = (filterFunction) => {
        fetch("http://localhost:3000/meals")
        .then(resp => resp.json()) //after fetch has been returned it will call the function
        .then(meals => {
            meals = meals.map(meal => new Meal(meal))
            if (filterFunction) {
                meals = meals.filter(filterFunction)
            }

            //iterating through the meals and adding them to subtotal object
            //taking meals array, filtering it by filterFunction and then looping through with forEach
            meals.forEach(meal => {
                this.subtotals[meal.category_id] = this.subtotals[meal.category_id] || 0;
                this.subtotals[meal.category_id] += meal.amount;
                meal.append();
            })
            // for loop displaying the subtotals
            for (const [category_id, subtotal] of Object.entries(this.subtotals)) {
                document.getElementById("subtotal-" + category_id).innerHTML = subtotal.toFixed(2);
            }
        })
        .catch(error => console.log(error.message))
    }

    append = () => {
        //finding each category & creating an h2
            var categoryTotals = document.getElementById("category-" + this.category_id);       
            var h2 = document.createElement("h2");
            h2.id = "meal-" + this.id;
            h2.className = "meal";

        //telling h2 what it will hold
            
            h2.innerHTML = `${this.date.getMonth() + 1}/${this.date.getDate()} - $${this.amount.toFixed(2)} `;
        //appending h2 to category totals
            categoryTotals.append(h2);


            var button = document.createElement("button")
            button.innerHTML = "x"
            h2.append(button)
            button.addEventListener("click", this.delete)
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
                resp.json() //parsing json and returning a promise
                .then(meal => {
                    meal = new Meal(meal)
                    meal.append()
                    this.subtotals[meal.category_id] = meal.amount + this.subtotals[meal.category_id]
                    document.getElementById("subtotal-" + meal.category_id).innerHTML = this.subtotals[meal.category_id].toFixed(2)
                    callback()
                })
            } else {
                alert("unable to save")
            }

        })
        .catch(error => console.log(error.message))
    }
}
