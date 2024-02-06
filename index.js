

// Fetch items used in the project
let btn = document.getElementById("btn")
let Country = document.getElementById("Country")
let City = document.getElementById("City")
let date = document.getElementById("date")
let prayers = document.getElementById("prayer")
let dateShowe = document.querySelector(".dateShowe")
let h4 = document.querySelector(".h4")
let h3 = document.querySelector(".h3")


btn.onclick = (e)=>{
    e.preventDefault()
    // collect input value
    let cityvalue = City.value
    let countryvalue = Country.value
    let Date = date.value
    // edite in input value 
    let rightdate = Date.split("-").reverse().join("-")
    let yearandmanth = Date.split("-")
    let month = parseInt(Date.split("-").reverse().splice(0,2).pop())
    let year = parseInt(yearandmanth.shift())
    
    // Api request
    if (cityvalue != "" && countryvalue != "" && Date != "") {
        axios.get(`https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${cityvalue}&country=${countryvalue}`)
    .then((respons)=>{

        // loop on respons
        let responsData = respons.data.data
        for(prayer of responsData){

            if (prayer.date.gregorian.date === rightdate ) {
                // get date
                let datehijri = prayer.date.hijri.weekday.ar
                let dategregorian = prayer.date.gregorian.weekday.en

                // Fill in the field with date and time
                h3.innerHTML = `${cityvalue} (${countryvalue})`
                h4.innerHTML = `( ${rightdate} ) - ( ${prayer.date.hijri.date} ) - (${datehijri}) - (${dategregorian})`
                h4.classList.add("p-2")

                // Fill dom with time prayer
                dateShowe.innerHTML = `
                <div class="d-flex prayer ">
                    <div class="d-flex flex-column fajr p-3 px-4 text-center ms-3">
                    <h4>Fajr</h4>
                    <h5> ${prayer.timings.Fajr}</h5>
                    </div>
                    <div class="d-flex flex-column fajr p-3 px-4 text-center ms-3">
                    <h4>Sunrise</h4>
                    <h5> ${prayer.timings.Sunrise}</h5>
                    </div>
                    <div class="d-flex flex-column fajr p-3 px-4 text-center ms-3">
                    <h4>Dhuhr</h4>
                    <h5> ${prayer.timings.Dhuhr}</h5>
                    </div>
                    <div class="d-flex flex-column fajr p-3 px-4 text-center ms-3">
                    <h4>Asr</h4>
                    <h5> ${prayer.timings.Asr}</h5>
                    </div>
                    <div class="d-flex flex-column fajr p-3 px-4 text-center ms-3">
                    <h4>Sunset</h4>
                    <h5> ${prayer.timings.Sunset}</h5>
                    </div>
                    <div class="d-flex flex-column fajr p-3 px-4 text-center ms-3">
                    <h4>Maghrib</h4>
                    <h5> ${prayer.timings.Maghrib}</h5>
                    </div>
                    <div class="d-flex flex-column fajr p-3 px-4 text-center ms-3">
                    <h4>Isha</h4>
                    <h5> ${prayer.timings.Isha}</h5>
                    </div>
                    <div class="d-flex flex-column fajr p-3 px-4 text-center ms-3">
                    <h4>Imsak</h4>
                    <h5> ${prayer.timings.Imsak}</h5>
                    </div>
                    </div>
                    
                `
            }
        }
    })

    }else{alert('You must fill in the fields first') }
    
    
}
