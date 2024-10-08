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

export async function addListing(listing) {
    const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/real-estates", {
        method: "POST",
        body: listing,
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data'
        }
    })

    const resData = await response.json();

    if (!response.ok) {
        console.log(resData)
        throw new Error(`Failed to add data ${resData}`)
    }
}

export async function addAgent(agent) {
    const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/agents", {
        method: "POST",
        body: agent,
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data'
        }
    })

    const resData = await response.json();

    if (!response.ok) {
        console.log(resData)
        throw new Error(`Failed to add data ${resData}`)
    }
}

export async function fetchListing(id) {
    const response = await fetch(`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const listing = response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    return listing;
}

export async function deleteListing(id) {
    const response = await fetch(`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`, {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to delete listing")
    }
}
