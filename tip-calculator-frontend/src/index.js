Category.displayAll(Meal.displayAll)

//when the page loads, displaying all the catgories
// Category.displayAll(
//     function() {
//         Meal.displayAll)();
//     }
// )


document.getElementById("calculate").addEventListener(
    "submit", (e) => {
        e.preventDefault();
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
        Meal.save({
            amount: parseFloat(document.getElementById("perperson").innerHTML),
            category_id: document.getElementById("category").value
        },
        () => {
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
//added for dropdown
document.getElementById("dropdown").addEventListener(
    "change", (e) => {
        var elements = document.getElementsByClassName("meal");
        //iterating through backwards due to a live array (changes when deleting from it)
        for (var i = elements.length - 1; i >= 0; i--) {
            elements[i].remove()
        }
        elements = document.getElementsByClassName("js-subtotal")
        for (var i = elements.length - 1; i >= 0; i--) {
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
            filterFunction = meal => meal.date.getMonth() == targetMonth
        }
        Meal.displayAll(filterFunction)
    }
)



