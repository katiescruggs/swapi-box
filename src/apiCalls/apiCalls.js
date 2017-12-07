const fetchAndJson = async(apiUrl) => {
  const initialFetch = await fetch(apiUrl);
  return initialFetch.json();
}

export const getVehicles = async() => {
  const vehiclesData = await fetchAndJson('https://swapi.co/api/vehicles');
  return formatVehicles(vehiclesData.results);
}

const formatVehicles = (vehiclesArray) => {
  return vehiclesArray.map(vehicle => {
    const { name, model, vehicle_class, passengers } = vehicle;
    return {
      name,
      stats: {
        model,
        class: vehicle_class,
        passengers
      },
      fav: false,
      cardCat: 'vehicles'
    }
  });
}

export const getFilm = async() => {
  const { digit, numeral } = getRandomFilmNumber();
  const fetchFilm = await fetch(`https://swapi.co/api/films/${digit}`);
  const filmData = await fetchFilm.json();
  return formatFilm(filmData, numeral);
}

const getRandomFilmNumber = () => {
  const digitToNumeral = {
    1: 'I',
    2: 'II', 
    3: 'III', 
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII'
  };

  const digit = Math.floor(Math.random() * 6) + 1;
  const numeral = digitToNumeral[digit];

  return {digit, numeral};
}

const formatFilm = (filmData, numeral) => {
  const regEx = new RegExp(/\s{3,}/, 'g');
  let crawl = filmData.opening_crawl.replace(regEx, '###');
  crawl = filmData.opening_crawl.split('###');

  return {
    episode: `Episode ${numeral}`,
    title: filmData.title.toUpperCase(), 
    crawl
  };
}

export const getPlanets = async() => {
  const planetsData = await fetchAndJson('https://swapi.co/api/planets');
  return formatPlanets(planetsData.results);
}

const formatPlanets = (planetsArray) => {
  const unresolvedPromises = planetsArray.map(async (planet) => {
    const {name, terrain, population, climate, residents} = planet;
      //separate 2nd map into its own function
      const unresolvedResidents = residents.map(async (resident) => {
        const residentData = await fetchAndJson(resident);
        return residentData.name;
      });
      const residentPromises = await Promise.all(unresolvedResidents);

      return {
        name, 
        stats: {
          terrain, 
          population, 
          climate, 
          residents: residentPromises.join(', ') || 'none'
        },
        fav: false,
        cardCat: 'planets'
      }
  });
  return Promise.all(unresolvedPromises);
}

export const getPeople = async() => {
  const peopleData = await fetchAndJson('https://swapi.co/api/people');
  return formatPeople(peopleData.results);
}

const formatPeople = (peopleArray) => {
  const unresolvedPromises = peopleArray.map(async (person) => {
    const {name, homeworld, species} = person;

    let homeworldData = await fetchAndJson(person.homeworld);
    let speciesData = await fetchAndJson(person.species);

    return {
      name: person.name, 
      stats: {
        homeworld: homeworldData.name,
        species: speciesData.name,
        population: homeworldData.population,
        language: speciesData.language 
      },
      fav: false,
      cardCat: 'people'
    }
  });

  return Promise.all(unresolvedPromises);
}

