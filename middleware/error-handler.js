const { customApiEr } = require("../error");

const errorHandler = (err, req, res, next) => {
  //   console.log(err);
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message,
  };

  if (err.code === 11000) {
    customError.msg = "Email already exists";
    customError.statusCode = 400;
  }

  if (err.name === "ValidatorError") {
    (customError.statusCode = 400),
      (customError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(","));
  }

  if (err.name === "CastError") {
    (customError.statusCode = 404),
      (customError.msg = `no item found with id ${err.value}`);
  }

  // if(err instanceof customApiEr){
  //     return res.status(err.statusCode).json({msg:err.message})
  // }
  // return res.status(500).json({msg:err})
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;
