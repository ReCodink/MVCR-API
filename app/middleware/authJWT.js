const { users } = require('../models');
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Cek apakah ada header authorization dengan token
  if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    // Dapatkan token dari header
    const token = req.headers.authorization.split(' ')[1];

    // Verifikasi token
    jwt.verify(token, process.env.API_SECRET, (err, decode) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: "Token telah kedaluwarsa" });
        } else {
          return res.status(401).json({ message: "Token tidak sah" });
        }
      }

      // Token valid, cek jika ada pengguna dengan ID yang sesuai
      users.findOne({
        where: { id: decode.id }
      }).then((user) => {
        if (!user) {
          return res.status(401).json({ message: "Pengguna tidak ditemukan" });
        }

        // Pengguna valid, tambahkan pengguna ke objek req
        req.user = user;
        next();
      }).catch((err) => {
        // Tangani kesalahan lainnya
        next(err);
      });
    });
  } else {
    // Tidak ada header authorization atau format token salah
    return res.status(401).json({ message: "Format token salah" });
  }
};

module.exports = verifyToken;
