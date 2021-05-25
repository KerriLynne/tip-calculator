class Category {
    static display = categories => {
        //grabbing the elements by id from the acual pg
        var select = document.getElementById("category");
        var totals = document.getElementById("totals");
    
        categories.forEach(category => {
            // create options in categories dropdown
            var option = document.createElement("option");
            option.text = category.name;
            option.value = category.id;
            //actually attaching the option to select
            select.add(option);
            // create category headers
            var div = document.createElement("div");
            var subtotal = document.createElement("span");
            subtotal.id = "subtotal-" + category.id;
            subtotal.className = "js-subtotal"
            subtotal.innerHTML = 0
            div.id = "category-" + category.id;
            var h1 = document.createElement("h1");
            h1.innerHTML = "Your " + category.name + " Total: $";
            div.append(h1);
            totals.append(div);
            h1.append(subtotal)
        })
    }
    // load the categories from rails 
    static displayAll = (callback) => {
        fetch("http://localhost:3000/categories")
        .then(resp => resp.json())
        .then(categories => {
            Category.display(categories);
            callback();
        })
        .catch(error => console.log(error.message))
    }
}