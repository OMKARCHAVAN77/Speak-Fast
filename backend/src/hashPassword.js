import bcrypt from "bcryptjs";

const password = "SpeakFast@123";

const hash = await bcrypt.hash(password, 10);

console.log(hash);