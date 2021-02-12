const months = [
    { id: "January", data: [] },
    { id: "February", data: [] },
    { id: "March", data: [] },
    { id: "April", data: [] },
    { id: "May", data: [] },
    { id: "June", data: [] },
    { id: "July", data: [] },
    { id: "August", data: [] },
    { id: "September", data: [] },
    { id: "October", data: [] },
    { id: "November", data: [] },
    { id: "December", data: [] }
]
const fields = ['name', 'birthday']
const container = document.getElementById("container")
for (const month of months) {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    const div = document.createElement("div")
    div.className = "month"
    div.id = month.id
    div.style.backgroundColor = "rgb(" + x + "," + y + "," + z + ")"
    const h1 = document.createElement('h1')
    h1.innerText = month.id
    div.appendChild(h1)
    const table = document.createElement("table")
    const tHead = document.createElement("tr")
    for (const field of fields) {
        const th = document.createElement("th")
        th.innerText = field.toUpperCase()
        th.style.textAlign = "center"
        tHead.appendChild(th)
    }
    table.appendChild(tHead)
    div.appendChild(table)
    container.appendChild(div)
}

document.getElementById("addButton").addEventListener('click', function (e) {
    e.preventDefault()
    const form = document.getElementById("myForm")
    const formData = new FormData(form)
    const indexOfMonth = new Date(formData.get("birthday")).getMonth()
    const data = {
        name: formData.get("name"),
        birthday: formData.get("birthday")
    }
    months[indexOfMonth].data.push(data)
    updateAddElementDom(months[indexOfMonth].id, data)
    form.reset();
})

function updateAddElementDom(id, data) {
    const div = document.getElementById(id)
    const table = div.childNodes[1]
    const tr = document.createElement('tr')
    Object.values(data).forEach(x => {
        const td = document.createElement("td")
        td.innerText = x
        tr.appendChild(td)
    })
    table.appendChild(tr)
}


document.getElementById("filterButton").addEventListener("click", function (e) {
    e.preventDefault()
    const searchText = document.getElementById('searchText').value
    const todaysDate = Number(new Date().getFullYear())
    const requiredData = months
        .map(x => {
            return x.data
        })
        .flat()
        .filter(x => {
            const filterDate = Number(new Date(x.birthday).getFullYear())
            const difference = todaysDate - filterDate
            return difference > 5 && x.name.charAt(0).toLocaleLowerCase() === searchText.charAt(0).toLocaleLowerCase()
        })

    updateFilterDom(requiredData)
})

function updateFilterDom(data) {
    const filterDiv = document.getElementById("filter")
    const ulTag = document.getElementById("listItem")
    if (data.length > 0) {
        const ul = document.createElement("ul")
        ul.id = "listItem"
        if (filterDiv.contains(ulTag)) {
            updateData()
            filterDiv.replaceChild(ul, ulTag)
        } else {
            updateData()
            filterDiv.appendChild(ul)
        }

        function updateData() {
            for (const da of data) {
                const li = document.createElement("li")
                li.innerText = da.name
                ul.appendChild(li)
            }
        }
    } else {
        filterDiv.removeChild(ulTag)
    }
}