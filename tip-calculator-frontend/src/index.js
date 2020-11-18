Category.displayAll(Meal.displayAll)

// Category.displayAll(
//     function() {
//         Meal.displayAll)();
//     }
// )


document.getElementById("calculate").addEventListener(
    "click", () => {
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


