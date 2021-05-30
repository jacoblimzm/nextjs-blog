// https://nextjs.org/learn/basics/api-routes/api-routes-details

// The API Route code will not be part of your client bundle, so you can safely write server-side code here.
// Good use case: handling Form Input

export default function handler(req, res) {
    res.status(200).json({ text: 'Hello' })
  }
