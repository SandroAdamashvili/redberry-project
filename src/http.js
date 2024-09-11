export async function fetchRegions() {
    const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/regions")
    const regions = response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    return regions;
}