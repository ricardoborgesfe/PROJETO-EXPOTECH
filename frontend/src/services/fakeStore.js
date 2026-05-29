import axios from 'axios'

function rng(seed) {
  let s = seed
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
}

function shuffle(arr, rand) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Fetch the 20 base products from FakeStore once and cache them
let _baseCache = null
async function getBaseProducts() {
  if (_baseCache) return _baseCache
  const res = await axios.get('https://fakestoreapi.com/products')
  _baseCache = res.data
  return _baseCache
}

/**
 * Build a fresh inventory of `count` product types from the 20 available.
 * Each gets:
 *   - weight   : unit weight  1-10 kg  (random)
 *   - priority : unit value   1-10     (random)
 *   - qty      : stock units  1-3      (random)
 */
export async function buildInventory(count = 20) {
  const base = await getBaseProducts()
  const rand = rng(Date.now())

  // Pick `count` products at random (without replacement)
  const shuffled = shuffle(base, rand)
  const chosen   = shuffled.slice(0, Math.min(count, shuffled.length))

  return chosen.map(p => ({
    id:       p.id,
    title:    p.title,
    image:    p.image,
    category: p.category,
    weight:   Math.floor(rand() * 10) + 1,   // 1-10 kg per unit
    priority: Math.floor(rand() * 10) + 1,   // 1-10 priority per unit
    qty:      Math.floor(rand() * 3)  + 1,   // 1-3 units in stock
  }))
}

/**
 * Called when "Chamar Próxima Leva" is pressed.
 * Keeps `keepCount` items from the current inventory (the ones with remaining qty)
 * and fills the rest with new product types not currently visible.
 */
export async function refreshInventory(currentItems, keepCount = 10) {
  const base = await getBaseProducts()
  const rand = rng(Date.now())

  // Keep a random subset of current items that still have qty > 0
  const available = currentItems.filter(i => i.qty > 0)
  const kept = shuffle(available, rng(Date.now() + 1)).slice(0, keepCount)
  const keptIds = new Set(kept.map(i => i.id))

  // Fill remaining slots with products not already visible
  const newProducts = shuffle(
    base.filter(p => !keptIds.has(p.id)),
    rng(Date.now() + 2)
  ).slice(0, 20 - kept.length)

  const newItems = newProducts.map(p => ({
    id:       p.id,
    title:    p.title,
    image:    p.image,
    category: p.category,
    weight:   Math.floor(rand() * 10) + 1,
    priority: Math.floor(rand() * 10) + 1,
    qty:      Math.floor(rand() * 3)  + 1,
  }))

  return shuffle([...kept, ...newItems], rng(Date.now() + 3))
}