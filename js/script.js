const countriesList = document.getElementById('countries-list')
const getInfo  = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3/all')
        if (!response.ok) {
            throw new Error('Ha surgido un error', response.status)
        }
        const data = await response.json()
        console.log(data)
        data.sort((a, b) => {
            const nameA = a.name.common.toUpperCase();
            const nameB = b.name.common.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
        data.forEach(element => {
            const name = document.createElement('h2')
            name.innerHTML = element.name.common
            const flag = document.createElement('img')
            flag.src = element.flags[1]
            const pais = document.createElement('div')
            pais.append(flag, name)
            countriesList.appendChild(pais)
        });
        
    }catch(error){
        console.log('Error', error)
    }
}

getInfo()