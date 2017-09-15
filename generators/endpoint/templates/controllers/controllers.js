export async function <%= CONTROLLER %> (req, res) {
    
  const result = await dispatch('<%= ACTION %>', req.body.data)
  
  return res.status(200).json({ result })
    
}
