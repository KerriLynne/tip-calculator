Category.displayAll(Meal.displayAll) //passing in a reference of Meal.display all - once function is successfull, it will call the callback
//which is (Meal.diplayAll)

//when the page loads, displaying all the catgories
// Category.displayAll(
//     function() {
//         Meal.displayAll)();
//     }
// )

//runs the calculation for the tip
document.getElementById("calculate").addEventListener(
    "submit", (e) => {
        e.preventDefault();
        const bill = document.getElementById("bill").value;
        const tip = document.getElementById("tip").value;
        const people = document.getElementById("people").value;
        const total = bill * (1 + tip/ 100);
        //populate the total, perperson
        document.getElementById("total").innerHTML = total.toFixed(2);
        document.getElementById("perperson").innerHTML = (total/people).toFixed(2);
        //display results (removing the hidden class saying ok to display the result)
        document.getElementById("results").classList.remove("hidden");

    }
    
)
//saving the meal
document.getElementById("save_meal").addEventListener(
    "click", () => {
        Meal.save({ //data and a callback
            amount: parseFloat(document.getElementById("perperson").innerHTML),
            category_id: document.getElementById("category").value
        },
        () => {
            //this is a callback function
            //if save successful in meal- callback function
            var obj = document.getElementsByClassName("setToDefault");
            for (var i = 0; i < obj.length; i++) {
                obj[i].value = obj[i].defaultValue;
                if (obj[i].selectedIndex) {
                    obj[i].selectedIndex = 0
                }
            }
        })
    }
    
)
//added for dropdown for filtring by month
document.getElementById("dropdown").addEventListener(
    "change", (e) => {
        var elements = document.getElementsByClassName("meal");
        //iterating through backwards due to a live array (changes when deleting from it)
        for (var i = elements.length - 1; i >= 0; i--) {
            //removing everything (all meals)
            elements[i].remove()
        }
        elements = document.getElementsByClassName("js-subtotal")
        for (var i = elements.length - 1; i >= 0; i--) {
            //clearing subtotals by category
            elements[i].innerHTML = ""
        }
        Meal.subtotals = {}
        // Meal.displayAll(meal => {
        //     var targetMonth = document.getElementById("dropdown").value
        //     if (targetMonth == "") {
        //         return true
        //     } else {
        //         return meal.date.getMonth() == targetMonth
        //     }
        // })
        var targetMonth = document.getElementById("dropdown").value
        var filterFunction
        if (targetMonth != "") {
            //if blank, not filtered- if do filter, check to see if the meal date month matches the dropdown
            //if returns true, keep in list- if false not in list
            filterFunction = meal => meal.date.getMonth() == targetMonth
        }
        Meal.displayAll(filterFunction)
    }
)
//ordered the meals by amount
document.getElementById("order").addEventListener(
    "click", () => {
        Meal.meals.sort(function (a, b) {
            return a.amount - b.amount;
        });

        elements = document.querySelectorAll("h2")
        for (var i = elements.length - 1; i >= 0; i--) {
            elements[i].innerHTML = "" 
        }
        Meal.meals.forEach(meal => {
            meal.append();
        })
    })



