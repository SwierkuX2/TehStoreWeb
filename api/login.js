import { supabase } from './_supabase'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default async function handler(req, res) {
  const { email, password } = req.body

  const { data } = await supabase
    .from('uzytkownicy')
    .select('*')
    .eq('email', email)

  if (!data || data.length === 0) {
    return res.json({ Error: "User not found" })
  }

  const user = data[0]
  const match = await bcrypt.compare(password, user.haslo)

  if (!match) {
    return res.json({ Error: "Wrong password" })
  }

  const token = jwt.sign(
    { nazwa: user.nazwa },
    "secret",
    { expiresIn: "7d" }
  )

  res.setHeader("Set-Cookie", cookie.serialize("Token", token, {
    httpOnly: true,
    path: "/"
  }))

  res.json({ Status: "OK" })
}