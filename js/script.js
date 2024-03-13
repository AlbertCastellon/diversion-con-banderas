const countriesList = document.getElementById('countries-list')
const arr = []

const promiseFlags = new Promise((resolve) => {
  setTimeout(() => {
    const flags = document.querySelectorAll('img')
    resolve(flags)
  }, 1000)
})

const getInfo = (data) => {
  
  data.forEach(element => {
    const obj = {}
    obj.id = data.indexOf(element)
    obj.name = element.name.common
    obj.capital = element.capital
    obj.population = element.population
    obj.carSide = element.car.side
    arr.push(obj)
  })
  console.log(arr)
  return arr
}

const getList  = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3/all')
        if (!response.ok) {
            throw new Error('Ha surgido un error', response.status)
        }
        const data = await response.json()
        
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
            flag.id = data.indexOf(element)
            const pais = document.createElement('div')
            pais.append(flag, name)
            countriesList.appendChild(pais)
        });
        getInfo(data)
        promiseFlags.then((flags) => {
          const div = document.querySelector('.no-visibility')
          flags.forEach(element => {
            element.addEventListener('click', () => {
              console.log(arr[element.id])
              div.innerHTML = ''
              const div2 = document.createElement('div')
              const img = document.createElement('img')
              const name = document.createElement('h2')
              const capital = document.createElement('h3')
              const population = document.createElement('h3')
              const sideDrive = document.createElement('h3')
              const btn = document.createElement('button')
              img.src = element.src
              name.innerHTML = arr[element.id].name
              capital.innerHTML = `Capital: ${arr[element.id].capital}`
              population.innerHTML = `Población: ${arr[element.id].population}`
              sideDrive.innerHTML = `Lado de la carretera: ${arr[element.id].carSide}`
              btn.innerHTML = 'Cerrar'
              div2.append(name, capital, population, sideDrive)
              div.append(img, div2, btn)
              div.classList.add('visibility')
              div.classList.remove('no-visibility')
              btn.addEventListener('click', () => {
                div.classList.add('no-visibility')
                div.classList.remove('visibility')
              })
            }
            )

          })
        })
    }catch(error){
        console.log('Error', error)
    }
}

getList()
