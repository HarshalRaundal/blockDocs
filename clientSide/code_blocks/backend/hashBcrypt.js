const bcrypt = require('bcrypt');

exports.hashCertificate = (certificate) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(JSON.stringify(certificate), 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }