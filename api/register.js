import { supabase } from './_supabase'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, password } = req.body

  const hash = await bcrypt.hash(password, 10)

  const { error } = await supabase
    .from('uzytkownicy')
    .insert([{ nazwa: name, email, haslo: hash }])

  if (error) return res.json({ error: error.message })

  res.json({ Status: "OK" })
}