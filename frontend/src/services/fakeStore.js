import axios from 'axios'

const API_URL = 'https://fakestoreapi.com/products'

export async function getProducts() {

  try {

    const response = await axios.get(API_URL)

    return response.data.map((product) => ({
      ...product,

      weight: Math.floor(Math.random() * 10) + 1,

      priority: Math.floor(Math.random() * 10) + 1
    }))

  } catch (error) {

    console.error(error)

    return []
  }
}