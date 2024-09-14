const token = '9cfd634c-fae0-4247-8176-7ed68486ad53';

export async function fetchRegions() {
    const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/regions")
    const regions = response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    return regions;
}

export async function fetchcities() {
    const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/cities")
    const cities = response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    return cities;
}

export async function fetchAgents() {
    const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/agents", {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const agents = response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    return agents;
}

export async function fetchRealEstates() {
    const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/real-estates", {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const realEstates = response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    return realEstates;
}