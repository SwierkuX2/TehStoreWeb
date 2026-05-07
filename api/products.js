import { supabase } from './_supabase'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data } = await supabase
      .from('products')
      .select('*')

    return res.json(data)
  }

  if (req.method === 'POST') {
    const { name, price, img, category } = req.body

    await supabase
      .from('products')
      .insert([{ name, price, img, category }])

    return res.json({ Status: "Added" })
  }
}