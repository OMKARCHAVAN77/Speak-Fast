
// student registration validation

export const validateStudentRegistration = (studentData) => {
  const {
    firstName,
    lastName,
    contactNumber,
    email,
    password,
    confirmPassword,
    district,
    qualification,
    occupation,
  } = studentData;

  // Required Fields
  if (
    !firstName ||
    !lastName ||
    !contactNumber ||
    !email ||
    !password ||
    !confirmPassword ||
    !district ||
    !qualification ||
    !occupation
  ) {
    return {
      isValid: false,
      message: "All fields are required.",
    };
  }

  // First Name
  if (firstName.trim().length < 3) {
    return {
      isValid: false,
      message: "First Name must be at least 3 characters.",
    };
  }

  // Last Name
  if (lastName.trim().length < 2) {
    return {
      isValid: false,
      message: "Last Name must be at least 2 characters.",
    };
  }

  // Contact Number
  const mobileRegex = /^[6-9]\d{9}$/;

  if (!mobileRegex.test(contactNumber)) {
    return {
      isValid: false,
      message: "Invalid Contact Number.",
    };
  }

  // Email
  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: "Invalid Email Address.",
    };
  }

  // Password Length
  if (password.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters.",
    };
  }

  // Strong Password
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      message:
        "Password must contain uppercase, lowercase, number and special character.",
    };
  }

  // Confirm Password
  if (password !== confirmPassword) {
    return {
      isValid: false,
      message: "Password and Confirm Password do not match.",
    };
  }

  return {
    isValid: true,
    message: "Validation Successful",
  };
};




// student login validation 
export const validateStudentLogin = (loginData) => {

    const { email, password } = loginData;

    if (!email || !password) {

        return {
            isValid: false,
            message: "Email and Password are required."
        };

    }

    const emailRegex =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {

        return {
            isValid: false,
            message: "Invalid Email Address."
        };

    }

    return {
        isValid: true,
        message: "Validation Successful"
    };

};