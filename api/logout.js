import cookie from 'cookie'

export default function handler(req, res) {
  res.setHeader("Set-Cookie", cookie.serialize("Token", "", {
    path: "/",
    expires: new Date(0),
  }))

  res.json({ Status: "Logout" })
}