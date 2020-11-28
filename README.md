# NesibeProje1

auth.config    =>  gizli anahtar 
db.config.js   =>  mysql baglantisi

role.model.js  =>  mysql veritabanindaki roller
user.model.js  =>  mysql veritabanindaki kullanicilar
index.js       =>  roller ve kullanicilar arasındaki baglantiyi 

verifySignUp.js => Kayıt doğrulama
auth.jwt.js     => kimlik doğrulama ve yetkilendirme
middleware-index.js  => authJwt ile verifySignUp baglantiyi 

auth.controller.js   => kimlik doğrulama
user.controller.js   => yetkilendirmeyi test etme