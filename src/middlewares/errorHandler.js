module.exports = (err, req, res, next) => {
  return res.json({ error: err.message   });
};
