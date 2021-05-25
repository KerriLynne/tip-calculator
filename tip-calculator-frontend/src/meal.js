

class Meal {
    //setting the date to a date object, parsing the date string and pushing into meals array
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
        // created a subtotals object as a way to reference how much we spent in each category
        // one variable to store info for us to reference easily
        static subtotals = {};
        static meals = [];

        

    static displayAll = (filterFunction) => {
        fetch("http://localhost:3000/meals") //get string back
        //parsing to json- becomes an array of objects
        .then(resp => resp.json()) //after fetch has been returned it will call the function
        .then(meals => {
            //changing the js objects into meal objects
            meals = meals.map(meal => new Meal(meal))
            //when you are displaying things, filter it with this fucntion that im giving you
            //need if bc the first the pg loads- we don't want any filtering
            if (filterFunction) {
                meals = meals.filter(filterFunction)
            }

            //iterating through the meals and adding them to subtotal object
            //taking meals array, filtering it by filterFunction and then looping through with forEach
            meals.forEach(meal => {
                //if this is undefined (will be first time through) set to 0
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

    //create html of yourself and put it on the page
    append = () => {
        //finding each category & creating an h2
            var categoryTotals = document.getElementById("category-" + this.category_id);       
            var h2 = document.createElement("h2");
            h2.id = "meal-" + this.id;
            h2.className = "meal";

        //telling h2 what it will hold
            //physially want this displayed in my H2
            h2.innerHTML = `${this.date.getMonth() + 1}/${this.date.getDate()} - $${this.amount.toFixed(2)} `;
        //appending h2 to category totals
        //created the h2 but now floating- now attach the h2 we just created to categoryTotals 
            categoryTotals.append(h2);


            var button = document.createElement("button")
            button.innerHTML = "x"
            h2.append(button)
            //calling the function WHEN the button is clicked
            button.addEventListener("click", this.delete)
    }

    delete = () => {
        //created this due to scope- need to keep the meal in scope
        //pizza joe
        const meal = this
        //request to server and passing the method (delete) BUT for this specific meal.id
        fetch("http://localhost:3000/meals/" + meal.id, {
            //posting info to rails and if successful updating the page
            method: 'DELETE',
            // headers: {
            //     'Content-Type': 'application/json'},
        })
        //uber job
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
        //if error it catches it and will log the error message
        .catch(error => console.log(error.message))

    }

    static save = (data, callback) => { 
        fetch("http://localhost:3000/meals", {
            //posting info to rails and if successful updating the page
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
                //returning js object into a string
            body: JSON.stringify(data)
        })
        .then(resp => {
            if (resp.ok) {
                //parse the data into a js object
                resp.json() //parsing json and returning a promise
                .then(meal => {
                    //from js object to a MEAL object
                    meal = new Meal(meal)
                    meal.append()
                    this.subtotals[meal.category_id] = meal.amount + this.subtotals[meal.category_id]
                    document.getElementById("subtotal-" + meal.category_id).innerHTML = this.subtotals[meal.category_id].toFixed(2)
                    //callback from the save function- will clear the form
                    callback()
                })
            } else {
                alert("unable to save")
            }

        })
        .catch(error => console.log(error.message))
    }
}
