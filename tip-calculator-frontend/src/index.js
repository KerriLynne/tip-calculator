
fetch("http://localhost:3000/categories")
.then(resp => resp.json())
.then(categories => {
    categories.forEach(category => {
        console.log(category.name)
    })
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
    }
    
)

