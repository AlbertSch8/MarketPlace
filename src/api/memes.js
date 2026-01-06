const CATEGORIES = ["animals", "celebrities", "gaming", "school", "random"];

export async function getMemes() {
    const res = await fetch("https://api.imgflip.com/get_memes");
    if (!res.ok) throw new Error("API error");
    const json = await res.json();

    return json.data.memes.map((m) => ({
        ...m,
        rating: Math.floor(Math.random() * 5) + 1,
        category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
    }));
}
