const Participant = require("../../api/v1/participant/model");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../../errors");

const { createTokenParticipant, createJWT } = require("../../utils");

const signupParticipant = async (req) => {
    const { name, departemen, username, password, role } = req.body;
  
    // jika email dan status tidak aktif
    let result = await Participant.findOne({
      username,
      status: "tidak aktif",
    });
  
    // Jika email sudah ada, tetapi status tidak aktif maka akan dikirin kode otp ulang
    if (result) {
      result.name = name;
      result.departemen = departemen;
      result.role = role;
      result.username = username;
      result.password = password;
      await result.save();
    } else {
      // Jika signup false, maka akan disuruh buat ulang dan dikirim kode otp setelah signup ulang
      result = await Participant.create({
        name,
        departemen,
        username,
        password,
        role,
      });
    }
    delete result._doc.password;
  
    return result;
  };

  const signinParticipant = async (req) => {
    // Membuat request body untuk username dan password
    const { username, password } = req.body;
  
    // melakukan check, jika email dan password tidak ada maka akan memberikan message BadRequestError
    if (!username || !password) {
      throw new BadRequestError("Please provide email and password");
    }
    
    // melakukan check participant berdasarkan username
    const result = await Participant.findOne({ username: username });
  
    // Jika participant tidak ada, maka akan memberikan message UnauthorizedError
    if (!result) {
      throw new UnauthorizedError("Invalid Credentials");
    }
  
    // Jika password benar, maka akan di compare
    const isPasswordCorrect = await result.comparePassword(password);
  
    // Jika password salah, maka akan diberikan message pada UnauthorizedError
    if (!isPasswordCorrect) {
      throw new UnauthorizedError("Invalid Credentials");
    }
  
    // setelah password di compare, maka akan dibuatkan token
    const token = createJWT({ payload: createTokenParticipant(result) });
  
    return token;
  };

  module.exports = {
    signupParticipant,
    signinParticipant
  };